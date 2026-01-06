import ProfileIcon from '@mui/icons-material/AccountBox';
import AvatarIcon from '@mui/icons-material/AccountCircle';
import TipsIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import SubscriptionsIcon from '@mui/icons-material/Loyalty';
import VideoContentSilverIcon from '@mui/icons-material/School';
import MasterZoneIcon from '@mui/icons-material/Troubleshoot';
import CourseIcon from '@mui/icons-material/VideoCameraFront';
import {
  Box,
  CssBaseline,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  Toolbar,
  Typography
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { loadStripe } from '@stripe/stripe-js';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from 'src/components/logo/Logo';
import useResponsive from 'src/hooks/useResponsive';
import { useAuthContext } from '../../../auth/useAuthContext';
import { paths } from '../../../routes/paths';
import {
  Courses,
  MobileHome,
  Profile,
  Subscriptions,
  Tips,
  VideoContentSilver,
} from '../components';
import MasterZone from '../components/MasterZone';

const stripePromise = loadStripe("pk_live_51NAUESCf4YXq1rsyBMpbCD1Yqi5kocGdjxYqcqknpppNXXnUKKCVxar7NqInLJRCJTCEVkbqQPppP7nvve8E053I00P0pVQI8d");

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: '0px 2px 3px -1px rgb(25 140 255 / 34%)',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    boxShadow: '0px 2px 3px -1px rgb(25 140 255 / 34%)',
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    div: {
      backgroundColor: 'transparent',
    },
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

export default function HomeView() {
  const theme = useTheme();

  const navigate = useNavigate();

  const isDesktop = useResponsive('up', 'md');

  const { user, logout } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState('Profile');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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

  const handleProfileChange = (data) => {
    if (data === '1') {
      setCurrentPage('Subscriptions');
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

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: isDesktop ? 'auto' : '100%',
        background: '#0d1117',
      }}
    >
      {isDesktop ? (
        <>
          <CssBaseline />
          <AppBar position="fixed" open={open} sx={{ background: '#0d1117' }}>
            <Toolbar>
              {/* <IconButton
                color="#FFF"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon sx={{ color: '#FFF' }} />
              </IconButton> */}
              <Typography variant="h6" noWrap component="div" sx={{ color: '#FFF' }}>
                BSP Consult - Evolving the approach of Sports Betting
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader sx={{ justifyContent: 'center', background: '#0d1117' }}>
              <Logo sx={{ mt: 1, width: '48px', height: '48px' }} />
              {/* <IconButton onClick={handleDrawerClose} sx={{ position: 'absolute', right: 0 }}>
                {theme.direction === 'rtl' ? (
                  <ChevronRightIcon sx={{ color: '#FFF' }} />
                ) : (
                  <ChevronLeftIcon sx={{ color: '#FFF' }} />
                )}
              </IconButton> */}
            </DrawerHeader>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                background: '#0d1117',
                pt: 2,
              }}
            >
              <ListItem
                key="Profile"
                disablePadding
                sx={{
                  display: 'block',
                  background: currentPage === 'Profile' ? 'rgb(0 51 103 / 69%)' : 'transparent',
                }}
                onClick={() => setCurrentPage('Profile')}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: '#FFF',
                    }}
                  >
                    <ProfileIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" sx={{ opacity: open ? 1 : 0, color: '#FFF' }} />
                </ListItemButton>
              </ListItem>
              <ListItem
                key="Tips"
                disablePadding
                sx={{
                  display: 'block',
                  background: currentPage === 'Tips' ? 'rgb(0 51 103 / 69%)' : 'transparent',
                }}
                onClick={() => setCurrentPage('Tips')}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: '#FFF',
                    }}
                  >
                    <TipsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tips" sx={{ opacity: open ? 1 : 0, color: '#FFF' }} />
                </ListItemButton>
              </ListItem>
              <ListItem
                key="VideoContentSilver"
                disablePadding
                sx={{
                  display: 'block',
                  background:
                    currentPage === 'VideoContentSilver' ? 'rgb(0 51 103 / 69%)' : 'transparent',
                }}
                onClick={() => setCurrentPage('VideoContentSilver')}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: '#FFF',
                    }}
                  >
                    <VideoContentSilverIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Silver Video Content"
                    sx={{ opacity: open ? 1 : 0, color: '#FFF' }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                key="Courses"
                disablePadding
                sx={{
                  display: 'block',
                  background: currentPage === 'Courses' ? 'rgb(0 51 103 / 69%)' : 'transparent',
                }}
                onClick={() => setCurrentPage('Courses')}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: '#FFF',
                    }}
                  >
                    <CourseIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Masterclass Video Content"
                    sx={{ opacity: open ? 1 : 0, color: '#FFF' }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                key="MasterZone"
                disablePadding
                sx={{
                  display: 'block',
                  background: currentPage === 'MasterZone' ? 'rgb(0 51 103 / 69%)' : 'transparent',
                }}
                onClick={() => setCurrentPage('MasterZone')}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: '#FFF',
                    }}
                  >
                    <MasterZoneIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Masterclass Zone"
                    sx={{ opacity: open ? 1 : 0, color: '#FFF' }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                key="Subscriptions"
                disablePadding
                sx={{
                  display: 'block',
                  background:
                    currentPage === 'Subscriptions' ? 'rgb(0 51 103 / 69%)' : 'transparent',
                }}
                onClick={() => setCurrentPage('Subscriptions')}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: '#FFF',
                    }}
                  >
                    <SubscriptionsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Subscriptions"
                    sx={{ opacity: open ? 1 : 0, color: '#FFF' }}
                  />
                </ListItemButton>
              </ListItem>
              <Box sx={{ display: 'flex', flex: 1 }} />
              <ListItem key="User" disablePadding sx={{ display: 'block', mb: 1 }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2,
                  }}
                  onClick={handleLogout}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : 'auto',
                      display: open ? 'flex' : 'none',
                      justifyContent: 'center',
                      color: '#FFF',
                    }}
                  >
                    <AvatarIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={user?.username}
                    sx={{ opacity: open ? 1 : 0, color: '#FFF' }}
                  />
                  <LogoutIcon sx={{ color: '#FFF' }} />
                </ListItemButton>
              </ListItem>
            </Box>
          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, minHeight: '1050px', backgroundImage: '#0d1117' }}
          >
            <DrawerHeader />
            {currentPage === 'Profile' && <Profile onChange={handleProfileChange} />}
            {currentPage === 'Tips' && <Tips setCurrentPage={setCurrentPage} />}
            {currentPage === 'Subscriptions' && <Subscriptions />}
            {currentPage === 'Courses' && <Courses onChange={handleProfileChange} />}
            {currentPage === 'VideoContentSilver' && (
              <VideoContentSilver setCurrentPage={setCurrentPage} />
            )}
            {currentPage === 'MasterZone' && <MasterZone onChange={handleProfileChange} />}
          </Box>
        </>
      ) : (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Button variant="contained" sx={{height: '45px', minWidth: '160px', backgroundColor: '#0194fb', ':hover': { backgroundColor: '#0194FB61', boxShadow: 'none'}}} href="bspconsult://bspconsult.com">Get Started
        <KeyboardArrowRightIcon/>
      </Button>
      <Button variant="contained" sx={{height: '45px', minWidth: '160px', mt: 2, backgroundColor: '#0194fb', ':hover': { backgroundColor: '#0194FB61', boxShadow: 'none'}}} href={paths.profile}>Home
        <KeyboardArrowRightIcon/>
      </Button> */}
          <MobileHome />
        </Box>
      )}
    </Box>
  );
}
