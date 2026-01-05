import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@mui/material';
import { MotionViewport } from 'src/components/animate';
import PlayIcon from '@mui/icons-material/SmartDisplay';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import LockIcon from '@mui/icons-material/Lock';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import { useAuthContext } from '../../../auth/useAuthContext';

// ----------------------------------------------------------------------

export default function Courses({ onChange }) {
  Courses.propTypes = {
    onChange: PropTypes.func.isRequired,
  };
  const { user } = useAuthContext();
  const checkExpireDate = () => {
    const sec = user.expire_date ? user.expire_date.seconds * 1000 : 0;
    const expireDate = new Date(sec);
    const currentDate = new Date();
    return currentDate.getTime() < expireDate.getTime();
  };

  const isSubscribed = user.membership === '10' && checkExpireDate();

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
  };

  const changeCourseUrl = (url) => {
    if (isSubscribed) {
      setCourseUrl(url);
    }
  };

  const modules = [
    {
      title: 'Module 1 : Introduction',
      videos: [
        {
          name: 'WELCOME VIDEO',
          url: 'https://player.vimeo.com/video/1042772935?badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'MY STORY',
          url: 'https://player.vimeo.com/video/734981672?h=f62369e231&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'THE REASON BEHIND THE SPORTS BETTING COURSE',
          url: 'https://player.vimeo.com/video/733157013?h=65eb89a6e2&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'OVERVIEW COURSE',
          url: 'https://player.vimeo.com/video/733158094?h=3d26bf9744&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'EXPECTATIONS AND IDENTITY',
          url: 'https://player.vimeo.com/video/733171940?h=7fa2cb2392&badge=0&autopause=0&player_id=0&app_id=58479',
        },
      ],
    },
    {
      title: 'Module 2 : Understanding of the sports betting market',
      videos: [
        {
          name: 'WHAT IS SPORTS BETTING?',
          url: 'https://player.vimeo.com/video/733173309?h=acab3b9b93&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'DIFFERENT PLAYERS ON THE SPORTS BETTING MARKET',
          url: 'https://player.vimeo.com/video/733231554?h=95b79f7a88&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'SPORTS BETTING IN NUMBERS',
          url: 'https://player.vimeo.com/video/733269224?h=bfa5ff01ca&badge=0&autopause=0&player_id=0&app_id=58479',
        },
      ],
    },
    {
      title: 'Module 3 : Today’s problem',
      videos: [
        {
          name: 'IDENTIFYING TODAY’S PROBLEM',
          url: 'https://player.vimeo.com/video/735391346?h=120347a440&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'THE SCIENCE BEHIND SPORTSBETTING (DOPAMINE IN SPORTS BETTING AND GAMBLING)',
          url: 'https://player.vimeo.com/video/733579981?h=25ec80830d&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'THE HOOKS OF THE BOOKMAKERS',
          url: 'https://player.vimeo.com/video/733581087?h=9d67915b92&badge=0&autopause=0&player_id=0&app_id=58479',
        },
      ],
    },
    {
      title: 'Module 4 : Sports betting basics',
      videos: [
        {
          name: 'CALCULATING THE ODDS AND IMPLIED PROBABILITY',
          url: 'https://player.vimeo.com/video/734983428?h=c4d590995a&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'WHY DO ODDS MOVE?',
          url: 'https://player.vimeo.com/video/733881443?h=330719ccd9&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'WHAT IS VALUE?',
          url: 'https://player.vimeo.com/video/733630174?h=17f686145a&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'DIFFERENT TYPES OF BETTING',
          url: 'https://player.vimeo.com/video/733614871?h=7ef0ce1973&badge=0&autopause=0&player_id=0&app_id=58479',
        },
      ],
    },
    {
      title: 'Module 5 : The foundation of success',
      videos: [
        {
          name: 'INTRODUCTION TO MINDSET',
          url: 'https://player.vimeo.com/video/733649070?h=7d069c1696&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'LOSSES & GREED',
          url: 'https://player.vimeo.com/video/733887491?h=bbe6573a05&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'LOSS AVERSION',
          url: 'https://player.vimeo.com/video/733897110?h=3ea568f049&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'KEY COMPONENTS OF A WINNER’S MINDSET',
          url: 'https://player.vimeo.com/video/733897829?h=69da0229d2&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'DEVELOPING A BETTING PLAN',
          url: 'https://player.vimeo.com/video/733899981?h=83c9d308f5&badge=0&autopause=0&player_id=0&app_id=58479',
        },
      ],
    },
    {
      title: 'Module 6 : Sports betting models',
      videos: [
        {
          name: 'INTRODUCTION TO A SPORTS BETTING MODEL',
          url: 'https://player.vimeo.com/video/733913863?h=36e6535023&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'ELO MODEL',
          url: 'https://player.vimeo.com/video/733919214?h=6a1641a03b&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'POINT BASED MODEL',
          url: 'https://player.vimeo.com/video/733920507?h=91dc5cc0b3&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'TENNIS BETTING MODEL',
          url: 'https://player.vimeo.com/video/733921783?h=e8c4458d65&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'FOOTBALL BETTING MODEL',
          url: 'https://player.vimeo.com/video/735459112?h=aa306af835&badge=0&autopause=0&player_id=0&app_id=58479',
        },
      ],
    },
    {
      title: 'Module 7 : Tennis',
      videos: [
        {
          name: 'THE BASICS OF TENNIS',
          url: 'https://player.vimeo.com/video/733950187?h=638e7e319c&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'TOUR CALENDAR',
          url: 'https://player.vimeo.com/video/733927566?h=968cf968ca&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'IMPORTANT TENNIS FACTORS',
          url: 'https://player.vimeo.com/video/733988709?h=d90fadb036&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'PRE-MATCH ANALYSIS TENNIS',
          url: 'https://player.vimeo.com/video/733972778?h=b964273633&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'HOW TO READ TENNIS STATISTICS',
          url: 'https://player.vimeo.com/video/734004813?h=e9681a9dd8&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'BEST TENNIS LINES BOOKMAKERS',
          url: 'https://player.vimeo.com/video/734039510?h=7991852e8a&badge=0&autopause=0&player_id=0&app_id=58479',
        },
      ],
    },
    {
      title: 'Module 8 : Football',
      videos: [
        {
          name: 'PRINCIPLES OF EFFECTIVE MATCH ANALYSIS',
          url: 'https://player.vimeo.com/video/735802325?h=5e6210a228&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'PRE-MATCH ANALYSIS FOOTBALL',
          url: 'https://player.vimeo.com/video/735856125?h=f7cb5b924f&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'BEST FOOTBALL LINES BOOKMAKERS',
          url: 'https://player.vimeo.com/video/735474046?h=32a468a801&badge=0&autopause=0&player_id=0&app_id=58479',
        },
      ],
    },
    {
      title: 'Module 9 : Study cases',
      videos: [
        {
          name: 'STUDY CASE GRAND SLAM',
          url: 'https://player.vimeo.com/video/734356237?h=0fe3abe3d5&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'STUDY CASE ATP 250 NEWPORT',
          url: 'https://player.vimeo.com/video/734385041?h=98d819decf&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'STUDY CASE ATP 250 BASTAD',
          url: 'https://player.vimeo.com/video/734656700?h=b6d9a01013&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'STUDY CASE ATP 250 BASTAD',
          url: 'https://player.vimeo.com/video/734412757?h=01766d9368&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'STUDY CASE ATP 500 HAMBURG',
          url: 'https://player.vimeo.com/video/734641211?h=473273b22d&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'STUDY CASE ATP 500 HAMBURG',
          url: 'https://player.vimeo.com/video/734748841?h=54dcdd0988&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'STUDY CASE ATP 500',
          url: 'https://player.vimeo.com/video/734755316?h=0261e0a38b&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'STUDY CASE ATP 250 GSTAAD',
          url: 'https://player.vimeo.com/video/733903778?h=5dfc7f952c&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'EXPLANATION POINT BETTING',
          url: 'https://player.vimeo.com/video/734767076?h=765a4e1545&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'STUDY CASE POINTS BETTING GRAND SLAM',
          url: 'https://player.vimeo.com/video/734466060?h=729ba983d5&badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'STUDY CASE POINTS BETTING',
          url: 'https://player.vimeo.com/video/734984035?h=c7440c5999&badge=0&autopause=0&player_id=0&app_id=58479',
        },
      ],
    },
    {
      title: 'Module 10 : Elite Club',
      videos: [
        {
          name: 'OVERVIEW OF THE ELITE CLUB',
          url: 'https://player.vimeo.com/video/737124387?h=4e08a88403&badge=0&autopause=0&player_id=0&app_id=58479',
        },
      ],
    },
    {
      title: 'Module 11: Updated Sports Betting Model Tutorial',
      videos: [
        {
          name: 'ELO RATINGS',
          url: 'https://player.vimeo.com/video/1034787418?badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'SERVICE RATINGS',
          url: 'https://player.vimeo.com/video/1034787468?badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'RETURN RATINGS',
          url: 'https://player.vimeo.com/video/1034787486?badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'UNDER PRESSURE RATINGS',
          url: 'https://player.vimeo.com/video/1034787522?badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'CENTRAL TENNIS BETTING MODEL',
          url: 'https://player.vimeo.com/video/1034787550?badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'COURT CONDITIONS MODEL COMPONENTS',
          url: 'https://player.vimeo.com/video/958887773?badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'COURT CONDITIONS MODEL USE',
          url: 'https://player.vimeo.com/video/958888135?badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'EXERCISE CLAY',
          url: 'https://player.vimeo.com/video/1034787575?badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'EXERCISE HARD',
          url: 'https://player.vimeo.com/video/1034787599?badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'EXERCISE GRASS',
          url: 'https://player.vimeo.com/video/1034787615?badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'SUMMARY COURSE',
          url: 'https://player.vimeo.com/video/1034787615?badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'UPDATE MODELS',
          url: 'https://player.vimeo.com/video/1042773017?badge=0&autopause=0&player_id=0&app_id=58479',
        },
      ],
    },
    {
      title: 'Module 12 : Extra Content',
      videos: [
        {
          name: 'INDIAN WELLS & MIAMI OPEN',
          url: 'https://player.vimeo.com/video/927058082?badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'COURT CONDITIONS & MY BOOKMAKERS',
          url: 'https://player.vimeo.com/video/930632756?badge=0&autopause=0&player_id=0&app_id=58479',
        },
        {
          name: 'Why Crypto Bookmakers?',
          url: 'https://player.vimeo.com/video/1057120140?badge=0&autopause=0&player_id=0&app_id=58479',
        }
      ],
    },
  ];

  const handleSubscription = () => {
    onChange(user?.membership);
  };

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
                You need to be a Gold Member to unlock the Masterclass Video Content
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
                  onClick={() => handleSubscription()}
                >
                  Upgrade to Gold
                </Button>
              </Box>
            </Box>
          )}
          <script src="https://player.vimeo.com/api/player.js" />
          <Typography
            variant="h4"
            sx={{ color: '#FFF', mt: 2, cursor: 'pointer' }}
            onClick={() =>
              changeCourseUrl(
                'https://player.vimeo.com/video/912613882?h=a837d3916f&badge=0&autopause=0&player_id=0&app_id=58479'
              )
            }
          >
            What I will learn?
          </Typography>
          <Typography variant="h4" sx={{ color: '#FFF', mt: 5 }}>
            Course Curriculum
          </Typography>
          {modules.map((module, moduleIndex) => (
            <Accordion key={moduleIndex}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${moduleIndex}-content`}
                id={`panel${moduleIndex}-header`}
                sx={{ color: '#FFF' }}
              >
                {module.title}
              </AccordionSummary>
              <AccordionDetails>
                {module.videos.map((video, videoIndex) => (
                  <Box
                    key={videoIndex}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      cursor: isSubscribed ? 'pointer' : 'default',
                      mt: videoIndex > 0 ? 2 : 0,
                      color: '#FFF',
                    }}
                    onClick={() => changeCourseUrl(video.url)}
                  >
                    <PlayIcon sx={{ color: '#FFF' }} />
                    <Typography variant="h7" sx={{ ml: 2 }}>
                      {video.name}
                    </Typography>
                    <Box sx={{ flex: 1 }} />
                    {isSubscribed ? (
                      <PlayCircleIcon sx={{ color: '#FFF' }} />
                    ) : (
                      <LockIcon sx={{ color: '#FFF' }} />
                    )}
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
