import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, MapPin, Heart, Clock, Wifi, WifiOff } from 'lucide-react';
import { indianFMStations } from '../utils/stations';

const RadioPlayer = () => {
  const [currentStation, setCurrentStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedCity, setSelectedCity] = useState('all');
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [error, setError] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  
  const audioRef = useRef(null);

  const cities = [...new Set(indianFMStations.map(station => station.city))].sort();

  const filteredStations = selectedCity === 'all' 
    ? indianFMStations 
    : indianFMStations.filter(station => station.city === selectedCity);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const playStation = async (station) => {
    setError('');
    setLoading(true);
    setConnectionStatus('connecting');
    
    try {
      if (currentStation && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }

      setCurrentStation(station);
      
      if (!station.url) {
        setError(`${station.name} is not available due to CORS restrictions. This station would work in a real radio app.`);
        setLoading(false);
        setConnectionStatus('error');
        return;
      }
      
      if (audioRef.current) {
        audioRef.current.crossOrigin = "anonymous";
        audioRef.current.src = station.url;
        
        const handleCanPlay = () => {
          setConnectionStatus('connected');
          setLoading(false);
        };
        
        const handleError = (e) => {
          console.error('Audio error:', e);
          setConnectionStatus('error');
          setError(`Cannot play ${station.name}. This may be due to CORS restrictions or the stream being offline.`);
          setLoading(false);
          setIsPlaying(false);
        };
        
        const handleLoadStart = () => {
          setConnectionStatus('connecting');
        };
        
        audioRef.current.addEventListener('canplay', handleCanPlay, { once: true });
        audioRef.current.addEventListener('error', handleError, { once: true });
        audioRef.current.addEventListener('loadstart', handleLoadStart, { once: true });
        
        audioRef.current.load();
        
        setTimeout(async () => {
          try {
            await audioRef.current.play();
            setIsPlaying(true);
            setConnectionStatus('connected');
            setLoading(false);
            
            setRecentlyPlayed(prev => {
              const filtered = prev.filter(s => s.id !== station.id);
              return [station, ...filtered].slice(0, 5);
            });
            
          } catch (playError) {
            console.error('Play error:', playError);
            setConnectionStatus('error');
            setError(`Unable to play ${station.name}. Try clicking play again or select another station.`);
            setLoading(false);
            setIsPlaying(false);
          }
        }, 1000);
      }
      
    } catch (error) {
      console.error('Station loading error:', error);
      setError(error.message || 'Failed to load station. Please try another station.');
      setLoading(false);
      setIsPlaying(false);
      setConnectionStatus('error');
    }
  };

  const togglePlay = () => {
    if (!currentStation) return;
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setConnectionStatus('connected');
        }).catch((error) => {
          console.error('Play error:', error);
          setError('Unable to play. Please try again or select another station.');
          setIsPlaying(false);
          setConnectionStatus('error');
        });
      }
    } catch (error) {
      console.error('Toggle play error:', error);
      setError('Playback error occurred.');
      setIsPlaying(false);
      setConnectionStatus('error');
    }
  };

  const toggleFavorite = (station) => {
    setFavorites(prev => {
      const isFavorite = prev.some(fav => fav.id === station.id);
      if (isFavorite) {
        return prev.filter(fav => fav.id !== station.id);
      } else {
        return [...prev, station];
      }
    });
  };

  const isFavorite = (station) => favorites.some(fav => fav.id === station.id);

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connecting': return <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-400 border-t-transparent"></div>;
      case 'connected': return <Wifi className="w-4 h-4 text-green-400" />;
      case 'error': return <WifiOff className="w-4 h-4 text-red-400" />;
      default: return <Radio className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <audio ref={audioRef} />
      
      {/* Header */}
      <div className="bg-black bg-opacity-30 backdrop-blur-sm border-b border-white border-opacity-20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Radio className="w-8 h-8 text-yellow-400 mr-3" />
              <div>
                <h1 className="text-3xl font-bold">Indian FM Radio</h1>
                <p className="text-blue-200">Listen to FM stations from across India</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {getConnectionIcon()}
              <span className="text-sm text-gray-300 capitalize">{connectionStatus}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Now Playing */}
        {currentStation && (
          <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-6 mb-6 border border-white border-opacity-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-4xl mr-4">{currentStation.logo}</div>
                <div>
                  <h2 className="text-2xl font-bold">{currentStation.name}</h2>
                  <p className="text-blue-200">
                    {currentStation.frequency} FM • {currentStation.city}, {currentStation.state}
                  </p>
                  <p className="text-sm text-gray-300">{currentStation.genre}</p>
                  {isPlaying && <div className="flex items-center mt-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                    <span className="text-sm text-red-400">Now Playing</span>
                  </div>}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleFavorite(currentStation)}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorite(currentStation) 
                      ? 'text-red-400 hover:text-red-300' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Heart className="w-6 h-6" fill={isFavorite(currentStation) ? 'currentColor' : 'none'} />
                </button>
                
                <button
                  onClick={togglePlay}
                  disabled={loading}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black p-4 rounded-full transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-black border-t-transparent"></div>
                  ) : isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 accent-yellow-500"
                  />
                </div>
              </div>
            </div>
            
            {error && (
              <div className="mt-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-300">
                {error}
              </div>
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* City Filter */}
            <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
                Filter by City
              </h3>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="all">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Recently Played */}
            {recentlyPlayed.length > 0 && (
              <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                  Recently Played
                </h3>
                <div className="space-y-2">
                  {recentlyPlayed.map(station => (
                    <button
                      key={station.id}
                      onClick={() => playStation(station)}
                      className="w-full text-left p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
                    >
                      <div className="text-sm font-medium">{station.name}</div>
                      <div className="text-xs text-gray-400">{station.city}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Favorites */}
            {favorites.length > 0 && (
              <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-400" />
                  Favorites
                </h3>
                <div className="space-y-2">
                  {favorites.map(station => (
                    <button
                      key={station.id}
                      onClick={() => playStation(station)}
                      className="w-full text-left p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
                    >
                      <div className="text-sm font-medium">{station.name}</div>
                      <div className="text-xs text-gray-400">{station.city}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Station List */}
          <div className="lg:col-span-3">
            <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
              <h3 className="text-xl font-semibold mb-4">
                FM Stations {selectedCity !== 'all' && `in ${selectedCity}`}
                <span className="text-sm font-normal text-gray-400 ml-2">({filteredStations.length} stations)</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {filteredStations.map(station => (
                  <div
                    key={station.id}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      currentStation?.id === station.id
                        ? 'bg-yellow-500 bg-opacity-20 border-yellow-500'
                        : 'bg-white bg-opacity-5 border-white border-opacity-20 hover:bg-opacity-10'
                    }`}
                    onClick={() => playStation(station)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">{station.logo}</div>
                        <div>
                          <h4 className="font-semibold">{station.name}</h4>
                          <p className="text-sm text-gray-300">
                            {station.frequency} FM
                          </p>
                          <p className="text-xs text-gray-400">
                            {station.city}, {station.state}
                          </p>
                          <p className="text-xs text-blue-300">
                            {station.genre}
                          </p>
                        </div>
                      </div>
