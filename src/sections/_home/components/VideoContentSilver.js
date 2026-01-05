import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import LockIcon from '@mui/icons-material/Lock';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PlayIcon from '@mui/icons-material/SmartDisplay';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import { Box, Button, Container, Typography } from '@mui/material';
import { MotionViewport } from 'src/components/animate';
import { useAuthContext } from '../../../auth/useAuthContext';

// ----------------------------------------------------------------------

export default function VideoContentSilver({ setCurrentPage }) {
  VideoContentSilver.propTypes = {
    setCurrentPage: PropTypes.func.isRequired,
  };

  const { user } = useAuthContext();

  const [courseUrl, setCourseUrl] = useState(
    'https://player.vimeo.com/video/912613882?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
  );

  const iframeStyle = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    border: 'none',
    width: '100%',
    height: '550px',
    marginTop: '32px',
    // Additional styles
  };

  const checkExpireDate = () => {
    const sec = user.expire_date ? user.expire_date.seconds * 1000 : 0;
    const expireDate = new Date(sec);
    const currentDate = new Date();
    return currentDate.getTime() < expireDate.getTime();
  };

  const isSubscribed = user.membership !== '1' && checkExpireDate();

  const changeCourseUrl = (url) => {
    if (isSubscribed) {
      setCourseUrl(url);
    }
  };

  const modules = [
    {
      name: 'ELO RATINGS',
      url: 'https://player.vimeo.com/video/1034739032?badge=0&autopause=0&player_id=0&app_id=58479',
    },
    {
      name: 'SERVICE RATINGS',
      url: 'https://player.vimeo.com/video/1034739217?badge=0&autopause=0&player_id=0&app_id=58479',
    },
    {
      name: 'RETURN RATINGS',
      url: 'https://player.vimeo.com/video/1034739245?badge=0&autopause=0&player_id=0&app_id=58479',
    },
    {
      name: 'UNDER PRESSURE RATINGS',
      url: 'https://player.vimeo.com/video/1034739270?badge=0&autopause=0&player_id=0&app_id=58479',
    },
    {
      name: 'CENTRAL TENNIS BETTING MODEL',
      url: 'https://player.vimeo.com/video/1034739295?badge=0&autopause=0&player_id=0&app_id=58479',
    },
    {
      name: 'EXERCISE CLAY',
      url: 'https://player.vimeo.com/video/1034739314?badge=0&autopause=0&player_id=0&app_id=58479',
    },
    {
      name: 'EXERCISE HARD',
      url: 'https://player.vimeo.com/video/1034739336?badge=0&autopause=0&player_id=0&app_id=58479',
    },
    {
      name: 'EXERCISE GRASS',
      url: 'https://player.vimeo.com/video/1034739350?badge=0&autopause=0&player_id=0&app_id=58479',
    },
    {
      name: 'UPDATE MODELS',
      url: 'https://player.vimeo.com/video/1042773017?badge=0&autopause=0&player_id=0&app_id=58479',
    },
    {
      name: 'SUMMARY',
      url: 'https://player.vimeo.com/video/1043640297?badge=0&autopause=0&player_id=0&app_id=58479',
    },
  ];

  return (
    <Container
      component={MotionViewport}
      sx={{
        display: 'flex',
        px: 3,
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
          borderRadius: 1,
          padding: '2px',
          transition: 'all .2s',
          position: 'relative',
          transform: 'none',
          boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
          mt: 3,
          mb: 3,
          maxWidth: 1200,
          minWidth: 1024,
        }}
      >
        <Box
          sx={{
            boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
            backgroundColor: '#0d1117',
            border: '1px solid rgba(239, 240, 246, .08)',
            borderRadius: 1,
            px: 2,
            pb: 2,
          }}
        >
          {isSubscribed ? (
            <iframe
              src={courseUrl}
              scrolling="no"
              allowFullScreen
              title="Course Video"
              style={iframeStyle}
            />
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '550px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#FFF',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  width: '77px',
                  height: '77px',
                  border: '2px solid #0866eb',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 2,
                  justifyContent: 'center',
                }}
              >
                <RemoveModeratorIcon />
              </Box>
              <Typography variant="h6" sx={{ mt: 3, fontWeight: 600 }}>
                You need to be a Silver Member to unlock the Silver Video Content
              </Typography>
              <Box
                sx={{
                  background: 'linear-gradient(#047efc, #12488f)',
                  position: 'relative',
                  overflow: 'hidden',
                  width: '240px',
                  height: '48px',
                  borderRadius: '8px',
                  mt: 5,
                  ':hover': {
                    opacity: 0.8,
                  },
                }}
              >
                <Button
                  variant="filled"
                  color="inherit"
                  sx={{
                    position: 'relative',
                    zIndex: 2, // Ensure the button text is above the overlay
                    color: '#FFF',
                    width: '100%',
                    height: '48px',
                    fontSize: 16,
                    fontWeight: 400,
                  }}
                  onClick={() => setCurrentPage('Subscriptions')}
                >
                  Purchase Membership
                </Button>
              </Box>
            </Box>
          )}
          <script src="https://player.vimeo.com/api/player.js" />
          {modules.map((module, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                mt: 2,
                cursor: isSubscribed ? 'pointer' : 'default',
                color: '#FFF',
              }}
              onClick={() => changeCourseUrl(module.url)}
            >
              <PlayIcon sx={{ color: '#FFF' }} />
              <Typography variant="h7" sx={{ ml: 2 }}>
                {module.name}
              </Typography>
              <Box sx={{ flex: 1 }} />
              {!isSubscribed && <LockIcon sx={{ color: '#FFF' }} />}
              {isSubscribed && <PlayCircleIcon sx={{ color: '#FFF' }} />}
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
