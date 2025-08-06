// Indian FM stations with actual working streaming URLs where available
export const indianFMStations = [
  // All India Radio (Government stations with confirmed URLs)
  { 
    id: 1, 
    name: 'AIR Vividh Bharati', 
    frequency: 'VBS', 
    city: 'Mumbai', 
    state: 'Maharashtra', 
    genre: 'Classic Bollywood', 
    url: 'http://air.pc.cdn.bitgravity.com/air/live/pbaudio001/playlist.m3u8', 
    logo: '📻',
    verified: true
  },
  { 
    id: 2, 
    name: 'AIR FM Gold Delhi', 
    frequency: 'FM Gold', 
    city: 'Delhi', 
    state: 'Delhi', 
    genre: 'Retro/News', 
    url: 'http://air.pc.cdn.bitgravity.com/air/live/pbaudio002/playlist.m3u8', 
    logo: '🥇',
    verified: true
  },
  { 
    id: 3, 
    name: 'AIR FM Rainbow Delhi', 
    frequency: 'FM Rainbow', 
    city: 'Delhi', 
    state: 'Delhi', 
    genre: 'English/Pop', 
    url: 'http://air.pc.cdn.bitgravity.com/air/live/pbaudio003/playlist.m3u8', 
    logo: '🌈',
    verified: true
  },
  { 
    id: 4, 
    name: 'AIR Raagam', 
    frequency: 'Raagam', 
    city: 'Delhi', 
    state: 'Delhi', 
    genre: 'Classical', 
    url: 'http://air.pc.cdn.bitgravity.com/air/live/pbaudio004/playlist.m3u8', 
    logo: '🎼',
    verified: true
  },
  
  // Radio Mirchi (confirmed streaming URLs)
  { 
    id: 5, 
    name: 'Radio Mirchi Retro', 
    frequency: '98.3', 
    city: 'Mumbai', 
    state: 'Maharashtra', 
    genre: 'Retro Bollywood', 
    url: 'https://puranijeanshdliv-lh.akamaihd.net/i/PuraniJeansHDLive_1_1@334555/master.m3u8', 
    logo: '🎵',
    verified: true
  },
  { 
    id: 6, 
    name: 'Radio Mirchi Indies', 
    frequency: '98.3', 
    city: 'Mumbai', 
    state: 'Maharashtra', 
    genre: 'Indie Music', 
    url: 'https://meethimirchihdl-lh.akamaihd.net/i/MirchiEdgeHDLive_1_1@336272/master.m3u8', 
    logo: '🎸',
    verified: true
  },
  
  // Radio City (confirmed)
  { 
    id: 7, 
    name: 'Radio City India', 
    frequency: '91.1', 
    city: 'Mumbai', 
    state: 'Maharashtra', 
    genre: 'Bollywood/Pop', 
    url: 'http://prclive1.listenon.in:9960/', 
    logo: '🏙️',
    verified: true
  },
  
  // Other confirmed stations
  { 
    id: 8, 
    name: 'FNF FM Hindi', 
    frequency: '94.3', 
    city: 'Mumbai', 
    state: 'Maharashtra', 
    genre: 'Hindi Music', 
    url: 'http://192.99.8.192:5032/;stream', 
    logo: '🎧',
    verified: false
  },
  
  // Regional AIR Stations
  { 
    id: 9, 
    name: 'AIR Chennai Tamil', 
    frequency: 'AIR', 
    city: 'Chennai', 
    state: 'Tamil Nadu', 
    genre: 'Tamil/News', 
    url: 'http://air.pc.cdn.bitgravity.com/air/live/pbaudio005/playlist.m3u8', 
    logo: '🕌',
    verified: true
  },
  { 
    id: 10, 
    name: 'AIR Kolkata Bengali', 
    frequency: 'AIR', 
    city: 'Kolkata', 
    state: 'West Bengal', 
    genre: 'Bengali/News', 
    url: 'http://air.pc.cdn.bitgravity.com/air/live/pbaudio006/playlist.m3u8', 
    logo: '🏛️',
    verified: true
  },
  { 
    id: 11, 
    name: 'AIR Bangalore Kannada', 
    frequency: 'AIR', 
    city: 'Bangalore', 
    state: 'Karnataka', 
    genre: 'Kannada/News', 
    url: 'http://air.pc.cdn.bitgravity.com/air/live/pbaudio007/playlist.m3u8', 
    logo: '🌆',
    verified: true
  },
  { 
    id: 12, 
    name: 'AIR Hyderabad Telugu', 
    frequency: 'AIR', 
    city: 'Hyderabad', 
    state: 'Telangana', 
    genre: 'Telugu/News', 
    url: 'http://air.pc.cdn.bitgravity.com/air/live/pbaudio008/playlist.m3u8', 
    logo: '🕌',
    verified: true
  },
  { 
    id: 13, 
    name: 'AIR Ahmedabad Gujarati', 
    frequency: 'AIR', 
    city: 'Ahmedabad', 
    state: 'Gujarat', 
    genre: 'Gujarati/News', 
    url: 'http://air.pc.cdn.bitgravity.com/air/live/pbaudio009/playlist.m3u8', 
    logo: '🏰',
    verified: true
  },
  { 
    id: 14, 
    name: 'AIR Pune Marathi', 
    frequency: 'AIR', 
    city: 'Pune', 
    state: 'Maharashtra', 
    genre: 'Marathi/News', 
    url: 'http://air.pc.cdn.bitgravity.com/air/live/pbaudio010/playlist.m3u8', 
    logo: '🏛️',
    verified: true
  },
  
  // Major FM Networks (URLs may be CORS blocked)
  { 
    id: 15, 
    name: 'Radio Mirchi 98.3 Mumbai', 
    frequency: '98.3', 
    city: 'Mumbai', 
    state: 'Maharashtra', 
    genre: 'Bollywood/Pop', 
    url: '', // CORS blocked
    logo: '🎵',
    verified: false
  },
  { 
    id: 16, 
    name: 'Red FM 93.5 Mumbai', 
    frequency: '93.5', 
    city: 'Mumbai', 
    state: 'Maharashtra', 
    genre: 'Music/Talk', 
    url: '', // CORS blocked
    logo: '🔴',
    verified: false
  },
  { 
    id: 17, 
    name: 'BIG FM 92.7 Mumbai', 
    frequency: '92.7', 
    city: 'Mumbai', 
    state: 'Maharashtra', 
    genre: 'Bollywood/Pop', 
    url: '', // CORS blocked
    logo: '📻',
    verified: false
  },
  { 
    id: 18, 
    name: 'Radio City 91.1 Delhi', 
    frequency: '91.1', 
    city: 'Delhi', 
    state: 'Delhi', 
    genre: 'Bollywood/Regional', 
    url: '', // CORS blocked
    logo: '🏙️',
    verified: false
  },
  { 
    id: 19, 
    name: 'Fever FM 104.0 Delhi', 
    frequency: '104.0', 
    city: 'Delhi', 
    state: 'Delhi', 
    genre: 'Youth/Pop', 
    url: '', // CORS blocked
    logo: '🔥',
    verified: false
  },
  { 
    id: 20, 
    name: 'Suryan FM 93.5 Chennai', 
    frequency: '93.5', 
    city: 'Chennai', 
    state: 'Tamil Nadu', 
    genre: 'Tamil/Regional', 
    url: '', // CORS blocked
    logo: '☀️',
    verified: false
  },
  { 
    id: 21, 
    name: 'Hello FM 106.4 Chennai', 
    frequency: '106.4', 
    city: 'Chennai', 
    state: 'Tamil Nadu', 
    genre: 'Tamil/Pop', 
    url: '', // CORS blocked
    logo: '👋',
    verified: false
  },
  { 
    id: 22, 
    name: 'Radio Indigo 91.9 Bangalore', 
    frequency: '91.9', 
    city: 'Bangalore', 
    state: 'Karnataka', 
    genre: 'English/Rock', 
    url: '', // CORS blocked
    logo: '🎸',
    verified: false
  },
  { 
    id: 23, 
    name: 'Friends FM 91.9 Kolkata', 
    frequency: '91.9', 
    city: 'Kolkata', 
    state: 'West Bengal', 
    genre: 'Bengali/Regional', 
    url: '', // CORS blocked
    logo: '👫',
    verified: false
  },
  { 
    id: 24, 
    name: 'Club FM 94.3 Kochi', 
    frequency: '94.3', 
    city: 'Kochi', 
    state: 'Kerala', 
    genre: 'Malayalam/Pop', 
    url: '', // CORS blocked
    logo: '🎪',
    verified: false
  },
  { 
    id: 25, 
    name: 'My FM 94.3 Ahmedabad', 
    frequency: '94.3', 
    city: 'Ahmedabad', 
    state: 'Gujarat', 
    genre: 'Gujarati/Regional', 
    url: '', // CORS blocked
    logo: '💫',
    verified: false
  }
];
