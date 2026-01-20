// import PropTypes from 'prop-types';
// import { useState } from 'react';
// // @mui
// import LockIcon from '@mui/icons-material/Lock';
// import PlayCircleIcon from '@mui/icons-material/PlayCircle';
// import PlayIcon from '@mui/icons-material/SmartDisplay';
// import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
// import { Box, Button, Container, Typography } from '@mui/material';
// import { MotionViewport } from 'src/components/animate';
// import { useAuthContext } from '../../../auth/useAuthContext';

// // ----------------------------------------------------------------------

// export default function VideoContentSilver({ setCurrentPage }) {
//   VideoContentSilver.propTypes = {
//     setCurrentPage: PropTypes.func.isRequired,
//   };

//   const { user } = useAuthContext();

//   const [courseUrl, setCourseUrl] = useState(
//     'https://player.vimeo.com/video/912613882?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
//   );

//   const iframeStyle = {
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//     border: 'none',
//     width: '100%',
//     height: '550px',
//     marginTop: '32px',
//     // Additional styles
//   };

//   const checkExpireDate = () => {
//     const sec = user.expire_date ? user.expire_date.seconds * 1000 : 0;
//     const expireDate = new Date(sec);
//     const currentDate = new Date();
//     return currentDate.getTime() < expireDate.getTime();
//   };

//   const isSubscribed = user.membership !== '1' && checkExpireDate();

//   const changeCourseUrl = (url) => {
//     if (isSubscribed) {
//       setCourseUrl(url);
//     }
//   };

//   const modules = [
//     {
//       name: 'ELO RATINGS',
//       url: 'https://player.vimeo.com/video/1034739032?badge=0&autopause=0&player_id=0&app_id=58479',
//     },
//     {
//       name: 'SERVICE RATINGS',
//       url: 'https://player.vimeo.com/video/1034739217?badge=0&autopause=0&player_id=0&app_id=58479',
//     },
//     {
//       name: 'RETURN RATINGS',
//       url: 'https://player.vimeo.com/video/1034739245?badge=0&autopause=0&player_id=0&app_id=58479',
//     },
//     {
//       name: 'UNDER PRESSURE RATINGS',
//       url: 'https://player.vimeo.com/video/1034739270?badge=0&autopause=0&player_id=0&app_id=58479',
//     },
//     {
//       name: 'CENTRAL TENNIS BETTING MODEL',
//       url: 'https://player.vimeo.com/video/1034739295?badge=0&autopause=0&player_id=0&app_id=58479',
//     },
//     {
//       name: 'EXERCISE CLAY',
//       url: 'https://player.vimeo.com/video/1034739314?badge=0&autopause=0&player_id=0&app_id=58479',
//     },
//     {
//       name: 'EXERCISE HARD',
//       url: 'https://player.vimeo.com/video/1034739336?badge=0&autopause=0&player_id=0&app_id=58479',
//     },
//     {
//       name: 'EXERCISE GRASS',
//       url: 'https://player.vimeo.com/video/1034739350?badge=0&autopause=0&player_id=0&app_id=58479',
//     },
//     {
//       name: 'UPDATE MODELS',
//       url: 'https://player.vimeo.com/video/1042773017?badge=0&autopause=0&player_id=0&app_id=58479',
//     },
//     {
//       name: 'SUMMARY',
//       url: 'https://player.vimeo.com/video/1043640297?badge=0&autopause=0&player_id=0&app_id=58479',
//     },
//   ];

//   return (
//     <Container
//       component={MotionViewport}
//       sx={{
//         display: 'flex',
//         px: 3,
//         justifyContent: 'center',
//       }}
//     >
//       <Box
//         sx={{
//           backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
//           borderRadius: 1,
//           padding: '2px',
//           transition: 'all .2s',
//           position: 'relative',
//           transform: 'none',
//           boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
//           mt: 3,
//           mb: 3,
//           maxWidth: 1200,
//           minWidth: 1024,
//         }}
//       >
//         <Box
//           sx={{
//             boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
//             backgroundColor: '#0d1117',
//             border: '1px solid rgba(239, 240, 246, .08)',
//             borderRadius: 1,
//             px: 2,
//             pb: 2,
//           }}
//         >
//           {isSubscribed ? (
//             <iframe
//               src={courseUrl}
//               scrolling="no"
//               allowFullScreen
//               title="Course Video"
//               style={iframeStyle}
//             />
//           ) : (
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: '550px',
//                 backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                 color: '#FFF',
//                 textAlign: 'center',
//               }}
//             >
//               <Box
//                 sx={{
//                   width: '77px',
//                   height: '77px',
//                   border: '2px solid #0866eb',
//                   display: 'flex',
//                   alignItems: 'center',
//                   borderRadius: 2,
//                   justifyContent: 'center',
//                 }}
//               >
//                 <RemoveModeratorIcon />
//               </Box>
//               <Typography variant="h6" sx={{ mt: 3, fontWeight: 600 }}>
//                 You need to be a Silver Member to unlock the Silver Video Content
//               </Typography>
//               <Box
//                 sx={{
//                   background: 'linear-gradient(#047efc, #12488f)',
//                   position: 'relative',
//                   overflow: 'hidden',
//                   width: '240px',
//                   height: '48px',
//                   borderRadius: '8px',
//                   mt: 5,
//                   ':hover': {
//                     opacity: 0.8,
//                   },
//                 }}
//               >
//                 <Button
//                   variant="filled"
//                   color="inherit"
//                   sx={{
//                     position: 'relative',
//                     zIndex: 2, // Ensure the button text is above the overlay
//                     color: '#FFF',
//                     width: '100%',
//                     height: '48px',
//                     fontSize: 16,
//                     fontWeight: 400,
//                   }}
//                   onClick={() => setCurrentPage('Subscriptions')}
//                 >
//                   Purchase Membership
//                 </Button>
//               </Box>
//             </Box>
//           )}
//           <script src="https://player.vimeo.com/api/player.js" />
//           {modules.map((module, index) => (
//             <Box
//               key={index}
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 mt: 2,
//                 cursor: isSubscribed ? 'pointer' : 'default',
//                 color: '#FFF',
//               }}
//               onClick={() => changeCourseUrl(module.url)}
//             >
//               <PlayIcon sx={{ color: '#FFF' }} />
//               <Typography variant="h7" sx={{ ml: 2 }}>
//                 {module.name}
//               </Typography>
//               <Box sx={{ flex: 1 }} />
//               {!isSubscribed && <LockIcon sx={{ color: '#FFF' }} />}
//               {isSubscribed && <PlayCircleIcon sx={{ color: '#FFF' }} />}
//             </Box>
//           ))}
//         </Box>
//       </Box>
//     </Container>
//   );
// }


// import PropTypes from 'prop-types';
// import { useState } from 'react';
// import LockIcon from '@mui/icons-material/Lock';
// import { MotionViewport } from 'src/components/animate';
// import { useAuthContext } from '../../../auth/useAuthContext';
// import './VideoContentSilver.css';

// export default function VideoContentSilver({ setCurrentPage }) {
//   VideoContentSilver.propTypes = {
//     setCurrentPage: PropTypes.func.isRequired,
//   };

//   // const DEV_PREVIEW = true; //  UI work only

//   const { user } = useAuthContext();

//   const [courseUrl, setCourseUrl] = useState(
//     'https://player.vimeo.com/video/912613882?badge=0&autopause=0&player_id=0&app_id=58479'
//   );

//   // const checkExpireDate = () => {
//   //   const sec = user.expire_date ? user.expire_date.seconds * 1000 : 0;
//   //   const expireDate = new Date(sec);
//   //   const currentDate = new Date();
//   //   return currentDate.getTime() < expireDate.getTime();
//   // };

//   const hasNotExpired = () => {
//     const expiry =
//       user?.expire_date ||
//       user?.expiry_date;

//     // No expiry = lifetime access
//     if (!expiry || !expiry.seconds) {
//       return true;
//     }

//     return Date.now() < expiry.seconds * 1000;
//   };

//   const isSubscribed =
//     ['8', '9', '10'].includes(user?.membership) &&
//     hasNotExpired();


//   const [activeIndex, setActiveIndex] = useState(0); // first one active by default


//   const changeCourseUrl = (url) => {
//     if (isSubscribed) {
//       setCourseUrl(url);
//     }
//   };

//   const modules = [
//     { name: 'ELO RATINGS', url: 'https://player.vimeo.com/video/1034739032?badge=0&autopause=0&player_id=0&app_id=58479' },
//     { name: 'SERVICE RATINGS', url: 'https://player.vimeo.com/video/1034739217?badge=0&autopause=0&player_id=0&app_id=58479' },
//     { name: 'RETURN RATINGS', url: 'https://player.vimeo.com/video/1034739245?badge=0&autopause=0&player_id=0&app_id=58479' },
//     { name: 'UNDER PRESSURE RATINGS', url: 'https://player.vimeo.com/video/1034739270?badge=0&autopause=0&player_id=0&app_id=58479' },
//     { name: 'CENTRAL TENNIS BETTING MODEL', url: 'https://player.vimeo.com/video/1034739295?badge=0&autopause=0&player_id=0&app_id=58479' },
//     { name: 'EXERCISE CLAY', url: 'https://player.vimeo.com/video/1034739314?badge=0&autopause=0&player_id=0&app_id=58479' },
//     { name: 'EXERCISE HARD', url: 'https://player.vimeo.com/video/1034739336?badge=0&autopause=0&player_id=0&app_id=58479' },
//     { name: 'EXERCISE GRASS', url: 'https://player.vimeo.com/video/1034739350?badge=0&autopause=0&player_id=0&app_id=58479' },
//     { name: 'UPDATE MODELS', url: 'https://player.vimeo.com/video/1042773017?badge=0&autopause=0&player_id=0&app_id=58479' },
//     { name: 'SUMMARY', url: 'https://player.vimeo.com/video/1043640297?badge=0&autopause=0&player_id=0&app_id=58479' },
//   ];

//   return (
//     <MotionViewport>
//       <div className="content-grid">
//         <div className='all-content'>
//           <div className="video-container ">
//             <div className="video-outer-box">
//               <div className="video-inner-box">
//                 {isSubscribed ? (
//                   <iframe
//                     src={courseUrl}
//                     scrolling="no"
//                     allowFullScreen
//                     title="Course Video"
//                     className="video-iframe"
//                   />
//                 ) : (
//                   <div className="video-locked">
//                     <div >
//                       <img src="/img/locked-premium.svg" alt="Locked" />
//                     </div>
//                     <h3 className='locked-text'>Essential Video Content Locked</h3>


//                     <button type='button'
//                       className="update-btn"
//                       onClick={() => setCurrentPage('Subscriptions')}
//                     >
//                       Purchase Membership
//                     </button>
//                   </div>

//                 )}

//                 <script src="https://player.vimeo.com/api/player.js" />


//                 {modules.map((module, index) => (
//                   /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
//                   <div
//                     key={index}
//                     className={`module-row ${isSubscribed ? 'clickable' : ''
//                       } ${activeIndex === index ? 'active' : ''}`}
//                     onClick={() => {
//                       if (!isSubscribed) return;
//                       setActiveIndex(index);
//                       changeCourseUrl(module.url);
//                     }}
//                   >

//                     <img
//                       src="/img/silvber-content.svg"
//                       alt="Play"
//                       className="silver-content-icon"
//                     />

//                     <span className="module-title">{module.name}</span>
//                     <span className="module-spacer" />

//                     {!isSubscribed && <LockIcon />}

//                   {isSubscribed && (
//   <img
//     src="/img/silver-play.svg"
//     alt="Play"
//   />
// )}



//                   </div>
//                 ))}

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </MotionViewport>

//   );
// }

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

  const [activeIndex, setActiveIndex] = useState(0); // currently loaded video
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