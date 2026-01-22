/* eslint-disable */
import PropTypes from 'prop-types';
import Player from '@vimeo/player';
import { useEffect, useRef, useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import { MotionViewport } from 'src/components/animate';
import { useAuthContext } from '../../../auth/useAuthContext';
import './VideoContentSilver.css';

export default function VideoContentSilver({ setCurrentPage }) {
  VideoContentSilver.propTypes = {
    setCurrentPage: PropTypes.func.isRequired,
  };

  const { user } = useAuthContext();

  const [activeIndex, setActiveIndex] = useState(0); 
  const [isPlaying, setIsPlaying] = useState(false);

  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  const hasNotExpired = () => {
    const expiry = user?.expire_date || user?.expiry_date;
    if (!expiry || !expiry.seconds) return true;
    return Date.now() < expiry.seconds * 1000;
  };

  const isSubscribed =
    ['8', '9', '10'].includes(user?.membership) && hasNotExpired();

  const modules = [
    { name: 'ELO RATINGS', id: 1034739032 },
    { name: 'SERVICE RATINGS', id: 1034739217 },
    { name: 'RETURN RATINGS', id: 1034739245 },
    { name: 'UNDER PRESSURE RATINGS', id: 1034739270 },
    { name: 'CENTRAL TENNIS BETTING MODEL', id: 1034739295 },
    { name: 'EXERCISE CLAY', id: 1034739314 },
    { name: 'EXERCISE HARD', id: 1034739336 },
    { name: 'EXERCISE GRASS', id: 1034739350 },
    { name: 'UPDATE MODELS', id: 1042773017 },
    { name: 'SUMMARY', id: 1043640297 },
  ];

  // Initialize player once
  useEffect(() => {
    if (!iframeRef.current) return;

    playerRef.current = new Player(iframeRef.current, {
      id: modules[activeIndex].id,
      autopause: false,
    });

    playerRef.current.on('play', () => setIsPlaying(true));
    playerRef.current.on('pause', () => setIsPlaying(false));

    return () => {
      playerRef.current?.destroy();
    };
  }, []);

  // Load a new video when switching modules
  const changeVideo = async (index) => {
    if (!playerRef.current) return;

    await playerRef.current.loadVideo(modules[index].id);
    setActiveIndex(index);
    setIsPlaying(false);
  };

  // Play/Pause for the specific module
  const togglePlayPause = async (index) => {
    if (!playerRef.current) return;

    if (index !== activeIndex) {
      // Load the new video and start playing
      await playerRef.current.loadVideo(modules[index].id);
      setActiveIndex(index);
      await playerRef.current.play();
      setIsPlaying(true);
      return;
    }

    const paused = await playerRef.current.getPaused();
    if (paused) {
      await playerRef.current.play();
      setIsPlaying(true);
    } else {
      await playerRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <MotionViewport>
      <div className="content-grid">
        <div className="all-content">
          <div className="video-container">
            <div className="video-outer-box">
              <div className="video-inner-box">
                {isSubscribed ? (
                  <iframe
                    ref={iframeRef}
                    src={`https://player.vimeo.com/video/${modules[activeIndex].id}?badge=0&autopause=0&player_id=0&app_id=58479`}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title="Course Video"
                    className="video-iframe"
                  />
                ) : (
                  <div className="video-locked">
                    <img src="/img/locked-premium.svg" alt="Locked" />
                    <h3 className="locked-text">Essential Video Content Locked</h3>
                    <button
                      type="button"
                      className="update-btn"
                      onClick={() => setCurrentPage('Subscriptions')}
                    >
                      Purchase Membership
                    </button>
                  </div>
                )}

                {modules.map((module, index) => (
                  <div
                    key={module.id}
                    className={`module-row ${isSubscribed ? 'clickable' : ''} ${activeIndex === index ? 'active' : ''
                      }`}
                    onClick={() => {
                      if (!isSubscribed) return;
                      togglePlayPause(index);
                    }}
                  >

                    <img
                      src="/img/silvber-content.svg"
                      alt="Play"
                      className="silver-content-icon"
                    />

                    <span className="module-title">{module.name}</span>
                    <span className="module-spacer" />

                    {!isSubscribed && <LockIcon />}

                    {isSubscribed && (
                      <button
                        type="button"
                        className="video-control-btn"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                        }}
                        onClick={(e) => {
                          e.stopPropagation(); // prevent row click
                          togglePlayPause(index);
                        }}
                      >
                        {activeIndex === index && isPlaying ? (
                          <img src="/img/silvde-pause.svg" alt="Pause" />
                        ) : (
                          <img src="/img/silver-play.svg" alt="Play" />
                        )}
                      </button>
                    )}

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionViewport>
  );
}