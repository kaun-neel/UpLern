import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipBack, SkipForward } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  title: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  startTime?: number;
}

// ========================================
// 🎥 VIDEO PLAYER CONFIGURATION
// ========================================
// This component handles video playback for your courses.
// To customize the video player:

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  onProgress,
  onComplete,
  startTime = 0
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      if (startTime > 0) {
        video.currentTime = startTime;
      }
    };

    const handleTimeUpdate = () => {
      const current = video.currentTime;
      setCurrentTime(current);
      
      // 📊 PROGRESS TRACKING
      // This reports video progress back to the parent component
      // You can modify this logic to:
      // - Save progress to database
      // - Implement resume functionality
      // - Track engagement analytics
      if (onProgress && duration > 0) {
        const progress = (current / duration) * 100;
        onProgress(progress);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      // 🎯 COMPLETION TRACKING
      // This fires when video ends - you can:
      // - Mark lesson as complete
      // - Unlock next content
      // - Award points/badges
      // - Generate completion certificate
      onComplete?.();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [duration, onProgress, onComplete, startTime]);

  // ========================================
  // 🎮 PLAYER CONTROLS
  // ========================================
  
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const time = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value) / 100;
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isFullscreen) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
  };

  // 🎛️ PLAYBACK SPEED CONTROL
  // You can customize available speeds by modifying this array:
  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettings(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // ========================================
  // 🎨 CUSTOMIZATION OPTIONS
  // ========================================
  // To customize the video player appearance:
  // 1. Modify the CSS classes below
  // 2. Change colors in the gradient backgrounds
  // 3. Adjust control button sizes and positions
  // 4. Add your brand colors to the theme

  return (
    <div 
      className="relative bg-black rounded-xl overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* 🎥 VIDEO ELEMENT */}
      {/* This is where your video content is displayed */}
      <video
        ref={videoRef}
        src={src} // 📹 VIDEO URL COMES FROM CONTENT SERVICE
        className="w-full aspect-video"
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        // 🔧 VIDEO ATTRIBUTES YOU CAN CUSTOMIZE:
        // preload="metadata" // Options: none, metadata, auto
        // poster="thumbnail-url" // Thumbnail image before play
        // crossOrigin="anonymous" // For CORS if needed
        // playsInline // For mobile devices
      />

      {/* Loading Overlay */}
      {!duration && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Controls Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {/* Play/Pause Button (Center) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={togglePlay} className="text-white hover:text-purple-300 transition-colors">
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button onClick={() => skip(-10)} className="text-white hover:text-purple-300 transition-colors">
                <SkipBack size={20} />
              </button>
              
              <button onClick={() => skip(10)} className="text-white hover:text-purple-300 transition-colors">
                <SkipForward size={20} />
              </button>

              <div className="flex items-center gap-2">
                <button onClick={toggleMute} className="text-white hover:text-purple-300 transition-colors">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume * 100}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* 🎛️ PLAYBACK SPEED SETTINGS */}
              {/* You can customize available speeds here */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-purple-300 transition-colors"
                >
                  <Settings size={20} />
                </button>
                
                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-sm rounded-lg p-2 min-w-[120px]">
                    <div className="text-white text-sm font-medium mb-2">Playback Speed</div>
                    {/* 🎛️ CUSTOMIZE AVAILABLE SPEEDS HERE */}
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => changePlaybackRate(rate)}
                        className={`block w-full text-left px-2 py-1 text-sm rounded hover:bg-white/20 transition-colors ${
                          playbackRate === rate ? 'text-purple-300' : 'text-white'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={toggleFullscreen} className="text-white hover:text-purple-300 transition-colors">
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Title Overlay */}
      <div className={`absolute top-4 left-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <h3 className="text-white font-medium text-lg drop-shadow-lg">{title}</h3>
      </div>
    </div>
  );
};

export default VideoPlayer;

// ========================================
// 📋 VIDEO PLAYER CUSTOMIZATION GUIDE
// ========================================
/*
To customize the video player for your needs:

1. 🎨 STYLING:
   - Change colors by modifying Tailwind classes
   - Adjust control sizes (w-16 h-16 for play button, etc.)
   - Modify gradients and backgrounds
   - Add your brand colors

2. 🎛️ CONTROLS:
   - Add/remove control buttons
   - Modify playback speeds array [0.5, 0.75, 1, 1.25, 1.5, 2]
   - Change skip intervals (currently ±10 seconds)
   - Customize volume control behavior

3. 📊 ANALYTICS:
   - Track watch time in handleTimeUpdate
   - Monitor completion rates in handleEnded
   - Add engagement metrics (pause/play frequency)
   - Implement chapter/bookmark tracking

4. 🔒 SECURITY:
   - Add DRM protection for premium content
   - Implement domain restrictions
   - Add watermarking for branded content
   - Use signed URLs for secure access

5. 📱 MOBILE OPTIMIZATION:
   - Add touch controls for mobile
   - Implement gesture controls (swipe to seek)
   - Optimize for different screen sizes
   - Add picture-in-picture support

6. 🎯 FEATURES TO ADD:
   - Subtitle/caption support
   - Chapter navigation
   - Playback speed memory
   - Auto-quality selection
   - Offline download capability
   - Social sharing integration
*/