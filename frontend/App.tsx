import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NicheSelectionScreen } from './src/screens/NicheSelectionScreen';
import { FeedScreen } from './src/screens/FeedScreen';
import { VideoPlayerScreen } from './src/screens/VideoPlayerScreen';
import { Video } from './src/types';

type Screen = 'niche-selection' | 'feed' | 'video-player';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('niche-selection');
  const [userId] = useState('demo-user-123'); // Mock user ID for MVP
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleNicheSelectionComplete = (niches: string[]) => {
    console.log('Selected niches:', niches);
    setCurrentScreen('feed');
  };

  const handleVideoPress = (video: Video) => {
    setSelectedVideo(video);
    setCurrentScreen('video-player');
  };

  const handleBackToFeed = () => {
    setSelectedVideo(null);
    setCurrentScreen('feed');
  };

  return (
    <>
      <StatusBar style="light" />
      {currentScreen === 'niche-selection' && (
        <NicheSelectionScreen onComplete={handleNicheSelectionComplete} />
      )}
      {currentScreen === 'feed' && (
        <FeedScreen userId={userId} onVideoPress={handleVideoPress} />
      )}
      {currentScreen === 'video-player' && selectedVideo && (
        <VideoPlayerScreen video={selectedVideo} onBack={handleBackToFeed} />
      )}
    </>
  );
}
