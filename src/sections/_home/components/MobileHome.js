/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */
/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable
  react/self-closing-comp,
  jsx-a11y/click-events-have-key-events,
  jsx-a11y/no-static-element-interactions
*/
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */
import { loadStripe } from '@stripe/stripe-js';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import './MobileHome.css'
// @mui
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


const stripePromise = loadStripe(
  'pk_live_51NAUESCf4YXq1rsyBMpbCD1Yqi5kocGdjxYqcqknpppNXXnUKKCVxar7NqInLJRCJTCEVkbqQPppP7nvve8E053I00P0pVQI8d'
);

const UPGRADE_PRICE_MAP = {
  silver_to_advanced: 'price_1Sh1flCf4YXq1rsy94ex1p16',
  silver_to_gold: 'price_1OgVtOCf4YXq1rsy99bw9IHr',
  advanced_to_gold: 'price_1Sh1gECf4YXq1rsycqlOtspg',
};
const UPGRADE_CONFIG = {
  silver: {
    advanced: {
      title: 'Advanced Program',
      price: '€200',
      priceId: UPGRADE_PRICE_MAP.silver_to_advanced,
      features: [
        'Advanced Data Insights (BSP App)',
        'BSP Tennis Betting Model',
        'Essential Video Content',
      ],
    },
    gold: {
      title: 'Gold Program',
      price: '€600',
      priceId: UPGRADE_PRICE_MAP.silver_to_gold,
      features: [
        'Advanced Data Insights (BSP App)',
        'BSP Tennis Betting Model',
        'Essential Video Content',
        'High-Stakes Betting Frameworks',
        'BSP Masterclass (20+ Hours of Video)',
        'Real Time Study Cases',
      ],
    },
  },
  advanced: {
    gold: {
      title: 'Gold Program',
      price: '€400',
      priceId: UPGRADE_PRICE_MAP.advanced_to_gold,
      features: [
        'High-Stakes Betting Frameworks',
        'BSP Masterclass (20+ Hours of Video)',
        'Real Time Study Cases',
      ],
    },
  },
};


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

  const checkExpireDate = () => {
    const sec = user?.expire_date ? user.expire_date.seconds * 1000 : 0;
    if (!sec) return true;
    return Date.now() < sec;
  };

  const isExpired = !checkExpireDate();

  const isGold = user?.membership === '10' && !isExpired;
  const isAdvanced = user?.membership === '9' && !isExpired;
  const isSilver = user?.membership === '8' && !isExpired;

  const hasNoSubscription =
    isExpired || user?.membership === '1' || !user?.membership;

  const effectiveMembership =
    isExpired ? '1' : String(user?.membership || '1');


  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [value, setValue] = useState(0);

  // const checkExpireDate = () => {
  //   const sec = user.expire_date ? user.expire_date.seconds * 1000 : 0;
  //   const expireDate = new Date(sec);
  //   const currentDate = new Date();
  //   return currentDate.getTime() < expireDate.getTime();
  // };

  const isSilverSubscribed = user.membership !== '1' && checkExpireDate();
  const isGoldSubscribed = user.membership === '10' && checkExpireDate();

  const isSubscribed =
    ['8', '9', '10'].includes(String(user?.membership)) &&
    checkExpireDate();



  const [openUpgrade, setOpenUpgrade] = useState(false);
  const [gopenUpgrade, setgOpenUpgrade] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('gold');

  const handleUpgradeCheckout = async (priceId) => {
    try {
      const stripe = await stripePromise;

      const response = await fetch(
        'https://us-central1-bspconsult-bcd6e.cloudfunctions.net/createCheckoutSession',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            priceId,
            customerEmail: user?.email,
            platform: 'web',
            upgrade: true, // optional but useful in webhook
          }),
        }
      );

      const session = await response.json();

      if (!session?.id) {
        throw new Error('Invalid Stripe session');
      }

      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error('Upgrade checkout error:', error);
    }
  };

  const membership = user?.membership;
  const hasNotExpired = () => {
    const expiry =
      user?.expire_date ||
      user?.expiry_date;

    // No expiry = lifetime access
    if (!expiry || !expiry.seconds) {
      return true;
    }

    return Date.now() < expiry.seconds * 1000;
  };

  const hasAnyMembership = ['8', '9', '10'].includes(membership);

  const currentPlan =
    isSilver ? 'silver' :
      isAdvanced ? 'advanced' :
        null;

  const upgradeData =
    currentPlan && selectedPlan
      ? UPGRADE_CONFIG[currentPlan]?.[selectedPlan]
      : null;

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


  const [activeVideoUrl, setActiveVideoUrl] = useState(null);



  const [activeIndex, setActiveIndex] = useState(0);

  const modules = [
    { name: 'ELO RATINGS', url: 'https://player.vimeo.com/video/1034739032' },
    { name: 'SERVICE RATINGS', url: 'https://player.vimeo.com/video/1034739217' },
    { name: 'RETURN RATINGS', url: 'https://player.vimeo.com/video/1034739245' },
    { name: 'UNDER PRESSURE RATINGS', url: 'https://player.vimeo.com/video/1034739270' },
    { name: 'CENTRAL TENNIS BETTING MODEL', url: 'https://player.vimeo.com/video/1034739295' },
    { name: 'EXERCISE CLAY', url: 'https://player.vimeo.com/video/1034739314' },
    { name: 'EXERCISE HARD', url: 'https://player.vimeo.com/video/1034739336' },
    { name: 'EXERCISE GRASS', url: 'https://player.vimeo.com/video/1034739350' },
    { name: 'UPDATE MODELS', url: 'https://player.vimeo.com/video/1042773017' },
    { name: 'SUMMARY', url: 'https://player.vimeo.com/video/1043640297' },
  ];



  const moduless = [
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


  const [courseUrl, setCourseUrl] = useState(
    'https://player.vimeo.com/video/912613882?badge=0&autopause=0&player_id=0&app_id=58479'
  );



  const changeCourseUrl = (url) => {
    if (isSubscribed) {
      setCourseUrl(url);
    }
  };



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
        open={gopenUpgrade}
        onClose={() => setgOpenUpgrade(false)}
        maxWidth={false}
        disableScrollLock
        PaperProps={{
          sx: {
            background: 'transparent',
            boxShadow: 'none',
            borderRadius: 0,
            padding: 0,
            margin: 0,
            overflow: 'visible',
          },
        }}
      >
        <DialogContent
          sx={{
            padding: 0,
            margin: 0,
            background: 'transparent',
            overflow: 'visible',
          }}
        >
          {!isGold && (isSilver || isAdvanced || hasNoSubscription) && (
            <div className="upgrade-box">

              {/* HEADER */}
              <div className="upgrade-content-header">
                <div className="upgrade-content">
                  <h3>{hasNoSubscription ? 'Choose Membership' : 'Upgrade Membership'}</h3>
                  <p>Upgrade to unlock advanced features and full access.</p>
                </div>

                <button
                  type="button"
                  className="upgrade-close"
                  onClick={() => setgOpenUpgrade(false)}
                >
                  ✕
                </button>
              </div>

              <div className="upgrade-divider" />

              {/* PLAN SWITCH */}
              <div className="plan-switch">

                {(hasNoSubscription || isSilver) && (
                  <button
                    type="button"
                    className={`plan-btn gold ${selectedPlan === 'gold' ? 'active' : ''}`}
                    onClick={() => setSelectedPlan('gold')}
                  >
                    Gold
                  </button>
                )}

                {isAdvanced && (
                  <button type="button" className="plan-btn gold active">
                    Gold
                  </button>
                )}

              </div>


              {/* DYNAMIC CARD */}
              {upgradeData && (
                <div className={`upgrade-card upgrade-card--${selectedPlan}`}>
                  <div className="upgrade-inner">

                    <div className="upgrade-headers">
                      <h3 className="upgrade-title">{upgradeData.title}</h3>


                    </div>


                    <div className="upgrade-price">
                      <span className="price-amount">{upgradeData.price}</span>
                      <span className="price-period">one time fee</span>
                    </div>

                    <div className="upgrade-note">
                      Lock in current pricing before next update.
                    </div>

                    <button
                      type="button"
                      className={selectedPlan === 'gold' ? 'Gold-btn' : 'adva-btn'}
                      onClick={() => {
                        setgOpenUpgrade(false);
                        handleUpgradeCheckout(upgradeData.priceId);
                      }}
                    >
                      Get {upgradeData.title}
                    </button>

                  </div>

                  <div className="upgrade-includes">
                    <h4>
                      Extra benefits with{' '}
                      <span className={selectedPlan === 'gold' ? 'gold-text' : 'advanced-text'}>
                        {selectedPlan === 'gold' ? 'Gold' : 'Advanced'}
                      </span>
                    </h4>

                    <ul>
                      {upgradeData.features.map((feature) => (
                        <li key={feature} className="active">
                          <img
                            src={
                              selectedPlan === 'gold'
                                ? '/img/gold-tick.svg'
                                : '/img/check-circle.svg'
                            }
                            alt="check"
                          />
                          <span className="include-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

            </div>
          )}
        </DialogContent>
      </Dialog>


      <Dialog
        open={openUpgrade}
        onClose={() => setOpenUpgrade(false)}
        maxWidth={false}
        disableScrollLock
        PaperProps={{
          sx: {
            background: 'transparent',
            boxShadow: 'none',
            borderRadius: 0,
            padding: 0,
            margin: 0,
            overflow: 'visible',
          },
        }}
      >
        <DialogContent
          sx={{
            padding: 0,
            margin: 0,
            background: 'transparent',
            overflow: 'visible',
          }}
        >
          {!isGold && (isSilver || isAdvanced || hasNoSubscription) && (
            <div className="upgrade-box">

              {/* HEADER */}
              <div className="upgrade-content-header">
                <div className="upgrade-content">
                  <h3>{hasNoSubscription ? 'Choose Membership' : 'Upgrade Membership'}</h3>
                  <p>Upgrade to unlock advanced features and full access.</p>
                </div>

                <button
                  type="button"
                  className="upgrade-close"
                  onClick={() => setOpenUpgrade(false)}
                >
                  ✕
                </button>
              </div>

              <div className="upgrade-divider" />

              {/* PLAN SWITCH */}
              <div className="plan-switch">

                {(hasNoSubscription || isSilver) && (
                  <>
                    <button
                      type="button"
                      className={`plan-btn advanced ${selectedPlan === 'advanced' ? 'active' : ''}`}
                      onClick={() => setSelectedPlan('advanced')}
                    >
                      Advanced
                    </button>

                    <button
                      type="button"
                      className={`plan-btn gold ${selectedPlan === 'gold' ? 'active' : ''}`}
                      onClick={() => setSelectedPlan('gold')}
                    >
                      Gold
                    </button>
                  </>
                )}

                {isAdvanced && (
                  <button type="button" className="plan-btn gold active">
                    Gold
                  </button>
                )}

              </div>

              {/* DYNAMIC CARD */}
              {upgradeData && (
                <div className={`upgrade-card upgrade-card--${selectedPlan}`}>
                  <div className="upgrade-inner">

                    <div className="upgrade-headers">
                      <h3 className="upgrade-title">{upgradeData.title}</h3>

                      {selectedPlan === 'advanced' && (
                        <span className="best-value-badge">Best Value</span>
                      )}
                    </div>


                    <div className="upgrade-price">
                      <span className="price-amount">{upgradeData.price}</span>
                      <span className="price-period">one time fee</span>
                    </div>

                    <div className="upgrade-note">
                      Lock in current pricing before next update.
                    </div>

                    <button
                      type="button"
                      className={selectedPlan === 'gold' ? 'Gold-btn' : 'adva-btn'}
                      onClick={() => {
                        setOpenUpgrade(false);
                        handleUpgradeCheckout(upgradeData.priceId);
                      }}
                    >
                      Get {upgradeData.title}
                    </button>

                  </div>

                  <div className="upgrade-includes">
                    <h4>
                      Extra benefits with{' '}
                      <span className={selectedPlan === 'gold' ? 'gold-text' : 'advanced-text'}>
                        {selectedPlan === 'gold' ? 'Gold' : 'Advanced'}
                      </span>
                    </h4>

                    <ul>
                      {upgradeData.features.map((feature) => (
                        <li key={feature} className="active">
                          <img
                            src={
                              selectedPlan === 'gold'
                                ? '/img/gold-tick.svg'
                                : '/img/check-circle.svg'
                            }
                            alt="check"
                          />
                          <span className="include-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

            </div>
          )}
        </DialogContent>
      </Dialog>
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

      <Dialog
        open={openResetPassword}
        onClose={() => setOpenResetPassword(false)}
        maxWidth={false}
        PaperProps={{
          className: 'lock-gradient-box',
          sx: {
            background: 'rgba(18, 20, 30, 1)',
            padding: 0,
          },
        }}
        BackdropProps={{
          className: 'lock-paper',
        }}
      >
        <div className="lock-content">

          {/* HEADER */}
          <div className="lock-header">
            <span
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              Reset Password
            </span>

            <button
              type="button"
              className="lock-close"
              onClick={() => setOpenResetPassword(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="lock-divider" />

          {/* BODY */}
          <div className="membership">
            <Typography sx={{ color: '#FFF', textAlign: 'center' }}>
              Are you sure you would like to get an email at
              <br />
              <strong>{user?.email}</strong> to reset your <br /> password?
            </Typography>
          </div>

          <div className="lock-divider" />

          {/* FOOTER */}
          <div className="lock-footer">
            <button
              type="button"
              className="lock-logout"
              onClick={() => setOpenResetPassword(false)}
            >
              Cancel
            </button>

            <button
              type="button"
              loading={loadingResetPassword}
              onClick={onConfirmResetPassword}
              className="lock-unlock"
              style={{
                color: '#FFFFFF',
              }}
            >
              Confirm
            </button>
          </div>

        </div>
      </Dialog>

      <div className="profile-wrapper">

        {/* Tabs */}
        <div className="tabs">
          <button
            type="button"
            className={value === 0 ? 'tab active' : 'tab'}
            onClick={() => setValue(0)}
          >
            <span>Profile<br />Section</span>
          </button>

          {/* Only show for non-gold users */}
          {user.membership !== '10' && (
            <button
              type="button"
              className={value === 1 ? 'tab active' : 'tab'}
              onClick={() => setValue(1)}
            >
              <span>Essential Video<br />Content</span>
            </button>
          )}


          <button
            type="button"
            className={value === 2 ? 'tab active' : 'tab'}
            onClick={() => setValue(2)}
          >
            <span>BSP<br />Masterclass</span>
          </button>
        </div>


        {/* TAB 0 – PROFILE */}
        {value === 0 && (
          <div className="tab-panel">

            {/* PERSONAL INFO */}
            <div className="info-box">
              <h3>Personal Information</h3>

              <div className="info-row">
                <span>Username</span>
                <span className="profile-ans">{user?.username}</span>
              </div>

              <div className="info-row">
                <span>E-mail</span>
                <span className="profile-ans">{user?.email}</span>
              </div>

              <div className="info-row">
                <span></span>
                <span
                  className="profile-ans with-icon"
                  onClick={handleOpenResetPassword}
                >
                  Reset Password <img src="/img/Icon.svg" alt="" />
                </span>
              </div>
            </div>

            {/* SUBSCRIPTION */}
            <div className="info-box">
              <h3>Subscription</h3>

              {!isExpired && (isSilver || isAdvanced || isGold) && (
                <p className="premium">
                  {isGold && 'Gold Program'}
                  {isAdvanced && 'Advanced Program'}
                  {isSilver && 'Silver Program'}
                </p>
              )}

              {(hasNoSubscription || isSilver || isAdvanced) && !isGold && (
                <button
                  type="button"
                  className="upgrade-btn"
                  onClick={() => {
                    if (hasNoSubscription) {
                      handleSubscription(user?.membership);
                      return;
                    }

                    if (isSilver) setSelectedPlan('advanced');
                    if (isAdvanced) setSelectedPlan('gold');

                    setOpenUpgrade(true);
                  }}
                >
                  {hasNoSubscription ? 'Choose Membership' : 'Upgrade Membership'}
                </button>
              )}
            </div>

            {/* ACTIONS */}
            <button
              type="button"
              className="access-btn"
              onClick={() =>
                window.open(
                  'https://apps.apple.com/us/app/bsp-consult/id1531281216',
                  '_blank'
                )
              }
            >
              Access Bets
            </button>

            <button
              type="button"
              className="delete-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>
        )}

        {/* TAB 1 – VIDEO CONTENT */}
        {value === 1 && (
          <div className="tab-panel">

            <div className="video-container">
              <div className="video-outer-box">
                <div className="video-inner-box">

                  {/* VIDEO / LOCKED OVERLAY */}
                  <div className="video-wraper">
                    {isSubscribed ? (
                      <iframe
                        src={
                          user.membership === '10'
                            ? goldCourseUrl
                            : silverCourseUrl
                        }
                        allowFullScreen
                        title="Course Video"
                        className="video-iframe"
                      />
                    ) : (
                      <div className="locked-wrapper">
                        <div className='g-lock'>
                          <img src="/img/locked-premium.svg" alt="Locked" />
                        </div>
                        <h3>Essential Video Content Locked</h3>
                        <button
                          type="button"
                          className="update-btn"
                          onClick={handleSubscription}
                        >
                          Purchase Membership
                        </button>
                      </div>
                    )}
                  </div>

                  {/* ✅ MODULE LIST (ALWAYS INSIDE SAME BOX) */}
                  <div className="modules-list">
                    {modules.map((module, index) => (
                      <div
                        key={index}
                        className={`module-row ${isSubscribed ? 'clickable' : ''
                          } ${activeIndex === index ? 'active' : ''}`}
                      onClick={() => {
  if (!isSubscribed) return;

  setActiveIndex(index);

  if (user.membership === '10') {
    setGoldCourseUrl(module.url);
  } else {
    setSilverCourseUrl(module.url);
  }
}}

                      >
                        <img
                          src="/img/silvber-content.svg"
                          alt="Module"
                          className="silver-content-icon"
                        />

                        <span className="module-title">{module.name}</span>
                        <span className="module-spacer" />

                      {!isSubscribed ? (
  <LockIcon
    sx={{
      fontSize: {
        xs: 16,
        sm: 22,
      },
    }}
  />
) : (
  <img
    src="/img/silver-play.svg"
    alt="Play"
    className='blue-play'
  />
)}

                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>

          </div>
        )}



        {/* TAB 2 – MASTERCLASS ZONE */}
        {value === 2 && (
          <div className="tab-panel">
            <div className="courses-wrapper">
              <div className="courses-border">
                <div className="courses-inner">

                  {/* VIDEO OR LOCKED */}
                  {isGoldSubscribed ? (
                    <iframe
                      src={courseUrl} // this could be the selected video URL from Gold Zone
                      scrolling="no"
                      allowFullScreen
                      title="Gold Zone Video"
                      className="course-iframe"
                    />
                  ) : (
                    <div className="locked-wrapper">
                      <div className="g-lock">
                        <img src="/img/locked-premium.svg" alt="Locked" />
                      </div>
                      <h3 className="locked-text">Gold Content Locked</h3>
                      <p className="locked-para">One click away from full access</p>
                      <button
                        type="button"
                        className="update-btn"
                        onClick={() => setgOpenUpgrade(true)} // opens the dialog
                      >
                        {!hasAnyMembership ? 'Purchase Membership' : 'Upgrade Now'}
                      </button>

                    </div>
                  )}

                  {/* GOLD ZONE CURRICULUM */}
                  <h2 className="course-heading">Course Curriculum</h2>

                  {moduless.map((module, moduleIndex) => (
                    <details key={moduleIndex} className="accordion" open={moduleIndex === 0}>
                      <summary className="accordion-summary">
                        <span className="module-title">{module.title || `Module ${moduleIndex + 1}`}</span>
                        <span className="expand-icons">
                          <img src="/img/arrow-up.svg" className="icon-down" />
                          <img src="/img/arrow-down.svg" className="icon-up" />
                        </span>
                      </summary>


                      <div className="accordion-details">
                        {(module.videos || []).map((video, videoIndex) => (
                          <div
                            key={videoIndex}
                            className={`video-row ${isGoldSubscribed ? 'clickable' : ''}`}
                            onClick={() => {
                              if (!isGoldSubscribed) return;
                              setSelectedMessage(video);
                              setCourseUrl(video.url);
                            }}

                          >
                            <img
                              src="/img/silvber-content.svg"
                              alt="Play"
                              className="video-left-icon"
                            />
                            <span className="video-title">{video.name}</span>
                            <span className="spacer" />

                            {isGoldSubscribed ? (
                              <img
                                src={
                                  activeVideoUrl === video.url
                                    ? "/img/silvde-pause.svg"
                                    : "/img/silver-play.svg"
                                }
                                alt="Action"
                                className="video-action-icon"
                              />
                            ) : (
                              <LockIcon
                                sx={{
                                  fontSize: {
                                    xs: 16,
                                    sm: 22,
                                  },
                                }} />
                            )}
                          </div>
                        ))}
                      </div>
                    </details>
                  ))}

                </div>
              </div>
            </div>
          </div>

        )}



      </div>

    </Container>
  );
}
