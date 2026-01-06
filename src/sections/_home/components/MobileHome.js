import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
// @mui
import AddIcon from '@mui/icons-material/Add';
import PrevIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import PlayIcon from '@mui/icons-material/SmartDisplay';
import { LoadingButton } from '@mui/lab';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { MotionViewport } from 'src/components/animate';
import Image from 'src/components/image';
import { useAuthContext } from '../../../auth/useAuthContext';
import firebaseApp from '../../../firebase';
import { paths } from '../../../routes/paths';

// ----------------------------------------------------------------------

const stripePromise = loadStripe("pk_live_51NAUESCf4YXq1rsyBMpbCD1Yqi5kocGdjxYqcqknpppNXXnUKKCVxar7NqInLJRCJTCEVkbqQPppP7nvve8E053I00P0pVQI8d");

// Initialize Firestore
const db = getFirestore(firebaseApp);

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MobileHome() {
  const { user, resetPassword, logout } = useAuthContext();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [value, setValue] = useState(0);

  const checkExpireDate = () => {
    const sec = user.expire_date ? user.expire_date.seconds * 1000 : 0;
    const expireDate = new Date(sec);
    const currentDate = new Date();
    return currentDate.getTime() < expireDate.getTime();
  };

  const isSilverSubscribed = user.membership !== '1' && checkExpireDate();
  const isGoldSubscribed = user.membership === '10' && checkExpireDate();

  const [silverCourseUrl, setSilverCourseUrl] = useState(
    'https://player.vimeo.com/video/912613882?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
  );

  const [goldCourseUrl, setGoldCourseUrl] = useState(
    'https://player.vimeo.com/video/912613882?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
  );

  const [openResetPassword, setOpenResetPassword] = useState(false);
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);
  const [masterZoneMessages, setMasterZoneMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [addMessage, setAddMessage] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [attachImage, setAttachImage] = useState();
  const [title, setTitle] = useState('');
  const [analyse, setAnalyse] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deletedMessage, setDeletedMessage] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const silverModules = [
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
  const goldModules = [
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

  const fetchMasterClassZone = useCallback(async () => {
    try {
      // Reference to the masterclass_zone collection
      const collectionRef = collection(db, 'masterclass_zone');
      // Create a query against the collection
      const q = query(
        collectionRef,
        orderBy('date', 'desc') // Sort by date in descending order
      );
      // Get a snapshot of the collection
      const messagesSnapshot = await getDocs(q);
      // Map through documents and set data in state
      const messageList = messagesSnapshot.docs.map((element) => ({
        id: element.id,
        ...element.data(),
      }));
      setMasterZoneMessages(messageList);
    } catch (error) {
      console.error('Error fetching tips: ', error);
    }
  }, []);

  useEffect(() => {
    fetchMasterClassZone();
  }, [fetchMasterClassZone]);

  function formatDate(dateString) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const date = new Date(dateString);
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, '0');

    return `${dayName}, ${day} ${month}, ${year} ${hour}:${minute}`;
  }

  const handleSubscription = () => {
    if (user?.membership === '1') {
      window.location.href = '/check-out';
    } else {
      handleUpgradeSubscription();
    }
  };

  const handleUpgradeSubscription = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your Firebase function
    const response = await fetch(
      'https://us-central1-bspconsult-bcd6e.cloudfunctions.net/createCheckoutSession',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: 'price_1OgVtOCf4YXq1rsy99bw9IHr',
          customerEmail: user?.email,
          platform: 'web',
        }),
      }
    );

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer.
      console.error(result.error.message);
    }
  };

  const handleOpenResetPassword = () => {
    setOpenResetPassword(true);
  };

  const handleCloseResetPassword = () => {
    setOpenResetPassword(false);
  };

  const onConfirmResetPassword = async () => {
    setLoadingResetPassword(true);
    await resetPassword(user?.email);
    setLoadingResetPassword(false);
    handleCloseResetPassword();
  };

  const handleLogout = async () => {
    try {
      logout();
      navigate(paths.login, { replace: true });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const iframeStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    border: 'none',
    // Additional styles
  };
  const iframeContainerStyle = {
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '56.25%',
    marginTop: '16px',
  };

  const changeSilverCourseUrl = (url) => {
    if (isSilverSubscribed) {
      setSilverCourseUrl(url);
    }
  };

  const changeGoldCourseUrl = (url) => {
    if (isGoldSubscribed) {
      setGoldCourseUrl(url);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeMessage = (e) => {
    setAnalyse(e.target.value);
  };

  const handleChangeConclusion = (e) => {
    setConclusion(e.target.value);
  };

  const handleAddMessage = async () => {
    setLoadingMessage(true);

    try {
      const messageData = {
        date: new Date(),
        title,
        analyse,
        conclusion,
        imageUrl: attachImage,
      };
      await addDoc(collection(db, 'masterclass_zone'), messageData);
      setTitle('');
      setAnalyse('');
      setConclusion('');
      setAttachImage();
      setAddMessage(false);
      fetchMasterClassZone();
    } catch (error) {
      console.error('Error adding document: ', error);
    } finally {
      setLoadingMessage(false);
    }
  };

  const handleDeleteMessage = async () => {
    if (!deletedMessage) return;

    setDeleteLoading(true);
    try {
      // Delete the document from Firestore
      await deleteDoc(doc(db, 'masterclass_zone', deletedMessage.id));

      // Refresh the messages list
      await fetchMasterClassZone();

      // Close the delete confirmation dialog
      setDeleteConfirm(false);
      setDeletedMessage(null);
    } catch (error) {
      console.error('Error deleting message:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  function createTypographyWithLineBreaks(text) {
    // Split the text by new line characters
    const lines = text.split('\n');

    // Map the lines to Typography components, adding <br /> elements in between
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index !== lines.length - 1 && <br />} {/* Don't add <br /> after the last line */}
      </React.Fragment>
    ));
  }

  return (
    <Container
      component={MotionViewport}
      sx={{
        background: '#0d1117',
        height: value === 0 ? '100%' : 'max-content',
      }}
    >
      <Dialog
        open={addMessage}
        onClose={() => setAddMessage(false)}
        PaperProps={{
          style: {
            px: 2,
            width: '100%',
            background: '#0d1117',
            border: '2px solid #076af478',
          },
        }}
      >
        <DialogTitle sx={{ color: '#FFF' }}>Add Message</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            label="Title"
            name="title"
            onChange={(e) => handleChangeTitle(e)}
            sx={{
              input: {
                color: '#FFF',
              },
              label: {
                color: '#FFF !important',
              },
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              my: 1,
            }}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 400 }}>
              Image
            </Typography>
            {attachImage && (
              <Image
                visibleByDefault
                disabledEffect
                alt="Image"
                src={attachImage}
                sx={{ width: 50, height: 50, borderRadius: 1 }}
              />
            )}
          </Box>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();

                reader.onload = (event) => {
                  setAttachImage(event.target.result);
                };

                reader.readAsDataURL(file);
              }
            }}
          />

          <TextField
            autoFocus
            fullWidth
            multiline
            rows={8}
            type="text"
            margin="dense"
            label="Analyse"
            name="analyse"
            onChange={(e) => handleChangeMessage(e)}
            sx={{
              input: {
                color: '#FFF',
              },
              label: {
                color: '#FFF !important',
              },
            }}
          />
          <TextField
            autoFocus
            fullWidth
            multiline
            rows={6}
            type="text"
            margin="dense"
            label="Conclusion"
            name="conclusion"
            onChange={(e) => handleChangeConclusion(e)}
            sx={{
              input: {
                color: '#FFF',
              },
              label: {
                color: '#FFF !important',
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            sx={{ color: '#FFF', backgroundColor: 'transparent' }}
            onClick={() => setAddMessage(false)}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={loadingMessage}
            variant="contained"
            sx={{ background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8 } }}
            onClick={() => handleAddMessage()}
          >
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
        PaperProps={{
          style: {
            px: 2,
            width: '100%',
            background: '#0d1117',
            border: '2px solid #076af478',
          },
        }}
      >
        <DialogTitle sx={{ color: '#FFF' }}>Delete Message</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              my: 1,
            }}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 400 }}>
              Are you sure you want to delete the message?
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            sx={{ color: '#FFF', backgroundColor: 'transparent' }}
            onClick={() => {
              setDeleteConfirm(false);
            }}
          >
            No
          </Button>
          <LoadingButton
            loading={deleteLoading}
            variant="contained"
            sx={{ background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8 } }}
            onClick={() => handleDeleteMessage()}
          >
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Box sx={{ mt: 3, mx: 'auto', textAlign: 'center' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab
              label={
                <Typography
                  component="span"
                  sx={{
                    display: 'block',
                    textAlign: 'center',
                    backgroundColor: 'transparent!important',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  Profile
                  <br />
                  Section
                </Typography>
              }
              {...a11yProps(0)}
              sx={{
                flex: 1,
                color: '#FFF',
                ':not(.Mui-selected)': {
                  color: '#c2ccd5',
                },
              }}
            />
            {user.membership !== '10' && (
              <Tab
                label={
                  <Typography
                    component="span"
                    sx={{
                      display: 'block',
                      textAlign: 'center',
                      backgroundColor: 'transparent!important',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    Silver Video
                    <br />
                    Content
                  </Typography>
                }
                {...a11yProps(1)}
                sx={{
                  flex: 1,
                  color: '#FFF',
                  ':not(.Mui-selected)': {
                    color: '#c2ccd5',
                  },
                }}
              />
            )}
            {user.membership === '10' && (
              <Tab
                label={
                  <Typography
                    component="span"
                    sx={{
                      display: 'block',
                      textAlign: 'center',
                      backgroundColor: 'transparent!important',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    Masterclass
                    <br />
                    Video Content
                  </Typography>
                }
                {...a11yProps(2)}
                sx={{
                  flex: 1,
                  color: '#FFF',
                  ':not(.Mui-selected)': {
                    color: '#c2ccd5',
                  },
                }}
              />
            )}
            <Tab
              label={
                <Typography
                  component="span"
                  sx={{
                    display: 'block',
                    textAlign: 'center',
                    backgroundColor: 'transparent!important',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  Masterclass
                  <br />
                  Zone
                </Typography>
              }
              {...a11yProps(3)}
              sx={{
                flex: 1,
                color: '#FFF',
                ':not(.Mui-selected)': {
                  color: '#c2ccd5',
                },
              }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Container
            component={MotionViewport}
            sx={{
              pb: 3,
              px: 0,
            }}
          >
            <Dialog
              open={openResetPassword}
              onClose={handleCloseResetPassword}
              PaperProps={{
                style: {
                  minWidth: '90%',
                  maxWidth: '90%',
                  background: '#0d1117',
                  border: '2px solid #076af478',
                },
              }}
            >
              <DialogTitle sx={{ color: '#FFF' }}>Reset Password</DialogTitle>
              <DialogContent>
                <Typography variant="h7" sx={{ color: '#FFF' }}>
                  Are you sure you would like to get an email at {user?.email} to reset your
                  password?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  color="inherit"
                  sx={{ color: '#FFF', backgroundColor: 'transparent' }}
                  onClick={() => handleCloseResetPassword()}
                >
                  Cancel
                </Button>
                <LoadingButton
                  loading={loadingResetPassword}
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(#047efc, #12488f)',
                    ':hover': { opacity: 0.8 },
                  }}
                  onClick={() => onConfirmResetPassword()}
                >
                  Confirm
                </LoadingButton>
              </DialogActions>
            </Dialog>
            <Box sx={{ mt: 3, mx: 'auto', maxWidth: 500, textAlign: 'center' }}>
              <Box
                sx={{
                  backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
                  borderRadius: '24px',
                  padding: '2px',
                  transition: 'all .2s',
                  position: 'relative',
                  transform: 'none',
                  boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
                  mt: 2,
                }}
              >
                <Card
                  sx={{
                    boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
                    backgroundColor: '#0d1117',
                    border: '1px solid rgba(239, 240, 246, .08)',
                    borderRadius: 3,
                  }}
                >
                  <CardContent sx={{ px: 2, py: 2, ':last-child': { pb: 2 } }}>
                    <Typography variant="h5" sx={{ color: '#FFF', fontWeight: 600 }}>
                      Information
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                      <Typography
                        sx={{
                          color: '#FFF',
                          minWidth: '90px',
                          textAlign: 'start',
                          fontSize: '14px',
                        }}
                      >
                        Username
                      </Typography>
                      <Box sx={{ flex: 1 }} />
                      <Typography
                        sx={{
                          color: '#FFF',
                          fontSize: '14px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {user?.username}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                      <Typography
                        sx={{
                          color: '#FFF',
                          minWidth: '90px',
                          textAlign: 'start',
                          fontSize: '14px',
                        }}
                      >
                        E-mail
                      </Typography>
                      <Box sx={{ flex: 1 }} />
                      <Typography
                        sx={{
                          color: '#FFF',
                          fontSize: '14px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {user?.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                      <Typography sx={{ color: '#FFF', fontSize: '14px' }}>Password</Typography>
                      <Box sx={{ flex: 1 }} />
                      <Button
                        variant="h7"
                        sx={{
                          color: '#0194fb',
                          padding: 0,
                          ':hover': {
                            backgroundColor: 'transparent',
                          },
                        }}
                        onClick={() => handleOpenResetPassword()}
                      >
                        Reset Password
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
              <Box
                sx={{
                  backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
                  borderRadius: '24px',
                  padding: '2px',
                  transition: 'all .2s',
                  position: 'relative',
                  transform: 'none',
                  boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
                  mt: 3,
                }}
              >
                <Card
                  sx={{
                    boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
                    backgroundColor: '#0d1117',
                    border: '1px solid rgba(239, 240, 246, .08)',
                    borderRadius: 3,
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ color: '#FFF', fontWeight: 600 }}>
                      Premium
                    </Typography>
                    {user?.membership === '8' || user?.membership === '10' ? (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          mt: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {user?.membership === '8' ? (
                          <>
                            <Box
                              component="img"
                              alt="Silver"
                              src="/assets/images/home/silver_large.png"
                              sx={{
                                width: '32px',
                                height: '32px',
                              }}
                            />
                            <Typography
                              variant="h4"
                              sx={{ color: '#FFF', ml: 2, textAlign: 'start', lineHeight: '2' }}
                            >
                              Silver
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Box
                              component="img"
                              alt="Silver"
                              src="/assets/images/home/gold_large.png"
                              sx={{
                                width: '32px',
                                height: '32px',
                              }}
                            />
                            <Typography
                              variant="h4"
                              sx={{ color: '#FFF', ml: 2, textAlign: 'start', lineHeight: '2' }}
                            >
                              Gold
                            </Typography>
                          </>
                        )}
                      </Box>
                    ) : (
                      ''
                    )}
                    {user?.membership === '8' || user?.membership === '1' ? (
                      <Button
                        onClick={() => handleSubscription()}
                        sx={{
                          color: 'primary.contrastText',
                          height: '45px',
                          background: 'linear-gradient(#047efc, #12488f)',
                          ':hover': { opacity: 0.8 },
                          minWidth: '220px',
                          mt: 2,
                        }}
                      >
                        {user?.membership === '8'
                          ? 'Upgrade my subscription'
                          : 'Choose my subscription'}
                      </Button>
                    ) : (
                      ''
                    )}
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 3, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  sx={{
                    width: '220px',
                    height: '45px',
                    background: 'linear-gradient(#047efc, #12488f)',
                    ':hover': { opacity: 0.8 },
                  }}
                  href="bspconsult://bspconsult.com"
                >
                  Access Bets
                  <KeyboardArrowRightIcon />
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 3, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  sx={{
                    width: '220px',
                    height: '45px',
                    background: 'linear-gradient(#047efc, #12488f)',
                    ':hover': { opacity: 0.8 },
                  }}
                  onClick={handleLogout}
                >
                  Logout
                  <LogoutIcon />
                </Button>
              </Box>
            </Box>
          </Container>
        </CustomTabPanel>
        {user.membership !== '10' && (
          <CustomTabPanel value={value} index={1}>
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
                {isSilverSubscribed ? (
                  <div style={iframeContainerStyle}>
                    <iframe
                      src={silverCourseUrl}
                      scrolling="no"
                      allowFullScreen
                      title="WELCOME VIDEO"
                      style={iframeStyle}
                    />
                  </div>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '230px',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: '#FFF',
                      textAlign: 'center',
                      marginTop: '16px',
                    }}
                  >
                    <Box
                      sx={{
                        width: '50px',
                        height: '50px',
                        border: '2px solid #0866eb',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 2,
                        justifyContent: 'center',
                      }}
                    >
                      <RemoveModeratorIcon />
                    </Box>
                    <Typography variant="h6" sx={{ mt: 2, px: 2 }}>
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
                        mt: 2,
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
                      >
                        <a href="/check-out" style={{ textDecoration: 'none', color: '#FFF' }}>
                          Purchase Membership
                        </a>
                      </Button>
                    </Box>
                  </Box>
                )}
                {silverModules.map((module, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      cursor: isSilverSubscribed ? 'pointer' : 'default',
                      mt: 2,
                    }}
                    onClick={() => changeSilverCourseUrl(module.url)}
                  >
                    <PlayIcon sx={{ color: '#FFF' }} />
                    <Typography variant="h7" sx={{ color: '#FFF', ml: 2, textAlign: 'start' }}>
                      {module.name}
                    </Typography>
                    <Box sx={{ flex: 1 }} />
                    {!isSilverSubscribed && <LockIcon sx={{ color: '#FFF' }} />}
                    {isSilverSubscribed && <PlayCircleIcon sx={{ color: '#FFF' }} />}
                  </Box>
                ))}
              </Box>
            </Box>
          </CustomTabPanel>
        )}
        {user.membership === '10' && (
          <CustomTabPanel value={value} index={1}>
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
                {isGoldSubscribed ? (
                  <div style={iframeContainerStyle}>
                    <iframe
                      src={goldCourseUrl}
                      scrolling="no"
                      allowFullScreen
                      title="AN Apple launch video_FINAL V2"
                      style={iframeStyle}
                    />
                  </div>
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
                    <LockIcon sx={{ fontSize: 64, mb: 2 }} />
                    <Typography variant="h6" sx={{ mb: 2 }}>
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
                        mt: 6,
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
                      // onClick={() => setCurrentPage('Subscriptions')}
                      >
                        Upgrade to Gold
                      </Button>
                    </Box>
                  </Box>
                )}
                <Typography
                  variant="h4"
                  sx={{ color: '#FFF', mt: 2, textAlign: 'start' }}
                  onClick={() =>
                    changeGoldCourseUrl(
                      'https://player.vimeo.com/video/912613882?h=a837d3916f&badge=0&autopause=0&player_id=0&app_id=58479'
                    )
                  }
                >
                  What I will learn?
                </Typography>
                <Typography variant="h4" sx={{ color: '#FFF', mt: 4, mb: 2, textAlign: 'start' }}>
                  Course Curriculum
                </Typography>
                {goldModules.map((module, moduleIndex) => (
                  <Accordion key={moduleIndex}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                      sx={{
                        color: '#FFF',
                        textAlign: 'start',
                      }}
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
                            cursor: isGoldSubscribed ? 'pointer' : 'default',
                            mt: videoIndex > 0 ? 2 : 0,
                          }}
                          onClick={() => changeGoldCourseUrl(video.url)}
                        >
                          <PlayIcon sx={{ color: '#FFF' }} />
                          <Typography
                            variant="h7"
                            sx={{ color: '#FFF', ml: 2, textAlign: 'start' }}
                          >
                            {video.name}
                          </Typography>
                          <Box sx={{ flex: 1 }} />
                          {isGoldSubscribed ? (
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
          </CustomTabPanel>
        )}
        <CustomTabPanel value={value} index={2}>
          {isGoldSubscribed ? (
            <Box sx={{ mx: 'auto', textAlign: 'center' }}>
              {(selectedMessage === undefined || selectedMessage === null) && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'end',
                    width: '100%',
                    height: '100%',
                    marginBottom: 2,
                  }}
                >
                  {masterZoneMessages.map((message, index) => (
                    <Box
                      sx={{
                        mt: 2,
                        width: '100%',
                      }}
                    >
                      {message.imageUrl && (
                        <Box
                          sx={{
                            backgroundImage:
                              'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
                            minWidth: '100%',
                            borderRadius: '24px',
                            padding: '2px',
                            transition: 'all .2s',
                            position: 'relative',
                            transform: 'none',
                            boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
                            cursor: 'pointer',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMessage(message);
                          }}
                        >
                          <Box
                            sx={{
                              backgroundColor: '#0d1117',
                              width: '100%',
                              height: '100%',
                              border: '1px solid rgba(239, 240, 246, .08)',
                              borderRadius: '24px',
                              transition: 'all .2s',
                              position: 'relative',
                              boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
                              px: 3,
                              py: 4,
                              justifyContent: 'center',
                              alignItems: 'center',
                              display: 'flex',
                              flexDirection: 'column',
                            }}
                          >
                            <Box
                              component="img"
                              alt="Logo"
                              src={message.imageUrl}
                              sx={{
                                borderRadius: 1,
                                cursor: 'pointer',
                              }}
                            />
                          </Box>
                          {user?.role === 'administrator' && (
                            <DeleteIcon
                              sx={{
                                position: 'absolute',
                                right: '10px',
                                top: '10px',
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirm(true);
                                setDeletedMessage(message);
                              }}
                            />
                          )}
                        </Box>
                      )}
                    </Box>
                  ))}
                  {user?.role === 'administrator' && (
                    <Fab
                      color="primary"
                      aria-label="add"
                      sx={{
                        position: 'fixed',
                        bottom: 50,
                        right: 24,
                        background: 'linear-gradient(#047efc, #12488f)',
                        ':hover': { opacity: 0.8 },
                      }}
                      onClick={() => setAddMessage(true)}
                    >
                      <AddIcon />
                    </Fab>
                  )}
                </Box>
              )}
              {selectedMessage && (
                <>
                  <Box
                    sx={{
                      alignItems: 'left',
                      display: 'flex',
                      cursor: 'pointer',
                      mt: 2,
                    }}
                    onClick={() => setSelectedMessage(null)}
                  >
                    <PrevIcon />
                  </Box>
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
                    }}
                  >
                    <Paper
                      sx={{
                        boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
                        backgroundColor: '#0d1117',
                        border: '0px solid rgba(239, 240, 246, .08)',
                        borderRadius: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          background: 'linear-gradient(45deg, #0863e3, transparent)',
                        }}
                      >
                        <Typography variant="h7" sx={{ color: 'primary.contrastText', mt: 1 }}>
                          {formatDate(selectedMessage.date.toDate())}
                        </Typography>
                        <Typography variant="h7" sx={{ color: 'primary.contrastText', mb: 1 }}>
                          {selectedMessage.title}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          mt: 3,
                          px: 2,
                        }}
                      >
                        <Box
                          component="img"
                          alt="Logo"
                          src={selectedMessage.imageUrl}
                          sx={{
                            borderRadius: 1,
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          pb: 2,
                          borderBottomLeftRadius: '6px',
                          borderBottomRightRadius: '6px',
                        }}
                      >
                        <Typography
                          variant="h7"
                          sx={{
                            color: '#FFF',
                            px: 2,
                            mt: 3,
                            mb: 2,
                            textAlign: 'left',
                            fontWeight: 600,
                            textDecoration: 'underline',
                            textDecorationColor: '#FFF',
                          }}
                        >
                          Analyse
                        </Typography>
                        <Typography
                          variant="h7"
                          sx={{ color: '#FFF', px: 2, mb: 1, textAlign: 'left' }}
                        >
                          {createTypographyWithLineBreaks(selectedMessage.analyse)}
                        </Typography>
                        <Typography
                          variant="h7"
                          sx={{
                            color: '#FFF',
                            px: 2,
                            mt: 2,
                            mb: 2,
                            textAlign: 'left',
                            fontWeight: 600,
                            textDecoration: 'underline',
                            textDecorationColor: '#FFF',
                          }}
                        >
                          Conclusion
                        </Typography>
                        <Typography
                          variant="h7"
                          sx={{ color: '#FFF', px: 2, mb: 1, textAlign: 'left' }}
                        >
                          {createTypographyWithLineBreaks(selectedMessage.conclusion)}
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                </>
              )}
            </Box>
          ) : (
            <Paper
              sx={{
                borderRadius: 3,
                textAlign: 'center',
                backgroundColor: 'transparent',
                mt: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  mt: 2,
                  columnGap: 0,
                  rowGap: 1,
                  justifyContent: 'center',
                  px: 2,
                }}
              >
                <Box
                  sx={{
                    backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
                    minWidth: 'fit-content',
                    borderRadius: '24px',
                    padding: '2px',
                    transition: 'all .2s',
                    position: 'relative',
                    transform: 'none',
                    boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: '#0d1117',
                      width: '100%',
                      height: '100%',
                      border: '1px solid rgba(239, 240, 246, .08)',
                      borderRadius: '24px',
                      transition: 'all .2s',
                      position: 'relative',
                      boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
                      px: 3,
                      py: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column',
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
                    <Typography
                      sx={{
                        color: 'rgb(203, 213, 225)',
                        fontWeight: 400,
                        fontSize: '36px',
                        mt: 2,
                      }}
                    >
                      Purchase Membership
                    </Typography>
                    <Typography
                      sx={{
                        color: 'rgba(203, 213, 225, 0.5)',
                        fontWeight: 400,
                        fontSize: '18px',
                        mt: 1,
                      }}
                    >
                      You need to be a Gold Member to unlock the Masterclass Zone
                    </Typography>
                    <Box
                      sx={{
                        background: 'linear-gradient(#047efc, #12488f)',
                        position: 'relative',
                        overflow: 'hidden',
                        width: '100%',
                        height: '48px',
                        borderRadius: '8px',
                        mt: 4,
                        mb: 2,
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
                        {user.membership === '8' ? 'Upgrade to gold' : 'Purchase Membership'}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          )}
        </CustomTabPanel>
      </Box>
    </Container>
  );
}
