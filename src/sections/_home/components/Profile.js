// import PropTypes from 'prop-types';
// import { useState } from 'react';
// // @mui
// import { Box, Container, Typography, Button, Card, CardContent, Dialog, TextField, DialogTitle, DialogContent, DialogActions, MenuItem } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// import { MotionViewport } from 'src/components/animate';
// import { useAuthContext } from '../../../auth/useAuthContext';
// // ----------------------------------------------------------------------

// export default function Profile({onChange}) {
//   const { user, updateBankroll, resetPassword, deleteAccount } = useAuthContext();

//   Profile.propTypes = {
//     onChange: PropTypes.func.isRequired,
//   };

//   const [openBankroll, setOpenBankroll] = useState(false);
//   const [bankroll, setBankroll] = useState(user?.bankroll);
//   const [stakingStrategy, setStakingStrategy] = useState(user?.stakingStrategy);
//   const [loadingBankroll, setLoadingBankroll] = useState(false);

//   const [deletAccountRequest, setDeletAccount] = useState(false);

//   const [openResetPassword, setOpenResetPassword] = useState(false);
//   const [loadingResetPassword, setLoadingResetPassword] = useState(false);

//   const handleSubscription = () => {
//     onChange(user?.membership);
//   }

//   const handleOpenBankroll = () => {
//     setOpenBankroll(true);
//   }

//   const handleCloseBankroll = () => {
//     setOpenBankroll(false);
//   }

//   const handleChangeBankroll = (e) => {
//     setBankroll(e.target.value);
//   }
//   const handleChangeStakingStrategy = (e) => {
//     setStakingStrategy(e.target.value);
//   }

//   const onChangeBankroll = async () => {
//     setLoadingBankroll(true);
//     await updateBankroll(bankroll, stakingStrategy, user?.uid);
//     handleCloseBankroll();
//     setLoadingBankroll(false);
//   }

//   const handleOpenDeleteAccountRequest = () => {
//     setDeletAccount(true);
//   }
//   const handleCloseDeleteAccountRequest = () => {
//     setDeletAccount(false);
//   }
//   const handleOpenResetPassword = () => {
//     setOpenResetPassword(true);
//   }

//   const handleCloseResetPassword = () => {
//     setOpenResetPassword(false);
//   }

//   const onConfirmResetPassword = async () => {
//     setLoadingResetPassword(true);
//     await resetPassword(user?.email);
//     setLoadingResetPassword(false);
//     handleCloseResetPassword();
//   }
//   const onConfirmDeleteAccount = async () => {
//     setLoadingResetPassword(true);
//     await deleteAccount(user?.email);
//     setLoadingResetPassword(false);
//     handleCloseDeleteAccountRequest();
//   }

//   return (
//     <Container
//       component={MotionViewport}
//       sx={{
//         px: 3
//       }}
//     >
//       <Dialog open={openBankroll} onClose={handleCloseBankroll}
//         PaperProps={{
//           style: {
//             minWidth: '400px',
//             background: '#0d1117',
//             border: '2px solid #076af478'
//           },
//         }}>
//         <DialogTitle sx={{ color: '#FFF' }}>Change your bankroll</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             fullWidth
//             type="email"
//             margin="dense"
//             label="Bankroll"
//             name="email"
//             value={bankroll} 
//             onChange={(e) => handleChangeBankroll(e)}
//             sx={{
//               input: {
//                 color: "#FFF",
//               },
//               label: {
//                   color: "#FFF !important",
//               }
//             }}
//           />
//           <TextField
//             select
//             fullWidth
//             margin="dense"
//             label="Staking Strategy"
//             value={stakingStrategy}
//             onChange={(e) => handleChangeStakingStrategy(e)}
//             SelectProps={{
//             MenuProps: {
//               PaperProps: {
//                 sx: {
//                   backgroundColor: '#0d1117',
//                   '& .MuiMenuItem-root': {
//                     color: '#FFF',
//                     '&:hover': {
//                       backgroundColor: 'rgba(7, 106, 244, 0.2)',
//                     },
//                     '&.Mui-selected': {
//                       backgroundColor: 'rgba(7, 106, 244, 0.3)',
//                       '&:hover': {
//                         backgroundColor: 'rgba(7, 106, 244, 0.4)',
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }}
//             sx={{
//               mt: 2,
//               '& .MuiSelect-select': {
//                 color: '#FFF',
//               },
//               '& .MuiOutlinedInput-root': {
//                 '& fieldset': {
//                   borderColor: 'rgba(255, 255, 255, 0.23)',
//                 },
//                 '&:hover fieldset': {
//                   borderColor: 'rgba(255, 255, 255, 0.4)',
//                 },
//               },
//               '& .MuiInputLabel-root': {
//                 color: '#FFF !important',
//               },
//               '& .MuiSvgIcon-root': {
//                 color: '#FFF',
//               }
//             }}
//           >
//             <MenuItem value="Conservative">Conservative</MenuItem>
//             <MenuItem value="Balanced">Balanced</MenuItem>
//             <MenuItem value="Aggressive">Aggressive</MenuItem>
//           </TextField>
//         </DialogContent>
//         <DialogActions>
//           <Button color="inherit" sx={{ color: '#FFF', backgroundColor: 'transparent'}} onClick={() => handleCloseBankroll()}>
//             Cancel
//           </Button>
//           <LoadingButton loading={loadingBankroll} variant="contained" sx={{background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8}}} onClick={() => onChangeBankroll()}>
//             Confirm
//           </LoadingButton>
//         </DialogActions>
//       </Dialog>
//       <Dialog open={deletAccountRequest} onClose={handleCloseDeleteAccountRequest}
//         PaperProps={{
//           style: {
//             minWidth: '400px',
//             maxWidth: '400px',
//             background: '#0d1117',
//             border: '2px solid #076af478'
//           },
//         }}>
//         <DialogTitle sx={{ color: '#FFF' }}>Delete Account</DialogTitle>
//         <DialogContent>
//           <Typography variant="h7" sx={{ color: '#FFF' }}>
//           Are you sure you want to delete your account?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button color="inherit" sx={{ color: '#FFF', backgroundColor: 'transparent'}} onClick={() => handleCloseDeleteAccountRequest()}>
//             Cancel
//           </Button>
//           <LoadingButton loading={loadingResetPassword} variant="contained" sx={{background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8}}} onClick={() => onConfirmDeleteAccount()}>
//             Confirm
//           </LoadingButton>
//         </DialogActions>
//       </Dialog>
//       <Dialog open={openResetPassword} onClose={handleCloseResetPassword}
//         PaperProps={{
//           style: {
//             minWidth: '400px',
//             maxWidth: '400px',
//             background: '#0d1117',
//             border: '2px solid #076af478'
//           },
//         }}>
//         <DialogTitle sx={{ color: '#FFF' }}>Reset Password</DialogTitle>
//         <DialogContent>
//           <Typography variant="h7" sx={{ color: '#FFF' }}>
//           Are you sure you would like to get an email at {user?.email}  to reset your password?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button color="inherit" sx={{ color: '#FFF', backgroundColor: 'transparent'}} onClick={() => handleCloseResetPassword()}>
//             Cancel
//           </Button>
//           <LoadingButton loading={loadingResetPassword} variant="contained" sx={{background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8}}} onClick={() => onConfirmResetPassword()}>
//             Confirm
//           </LoadingButton>
//         </DialogActions>
//       </Dialog>
//       <Box sx={{ mt: 3, mx: 'auto', maxWidth: 500, textAlign: 'center' }}>
//         <Box
//             sx={{
//               backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
//               borderRadius: '24px',
//               padding: '2px',
//               transition: 'all .2s',
//               position: 'relative',
//               transform: 'none',
//               boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
//               mt: 2,
//             }}
//           >
//           <Card sx={{ boxShadow: '0 2px 7px rgba(20, 20, 43, .06)', backgroundColor: '#0d1117', border: '1px solid rgba(239, 240, 246, .08)', borderRadius: 3,}}>
//             <CardContent>
//               <Typography variant="h4" sx={{ color: '#FFF' }}>
//                 Information
//               </Typography>
//               <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
//                 <Typography variant="h7" sx={{ color: '#FFF', minWidth: '90px', textAlign: 'start' }}>
//                   Username
//                 </Typography>
//                 <Box sx={{ flex: 1 }}/>
//                 <Typography variant="h7" sx={{ color: '#FFF', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                   {user?.username}
//                 </Typography>
//               </Box>
//               <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
//                 <Typography variant="h7" sx={{ color: '#FFF', minWidth: '90px', textAlign: 'start' }}>
//                   E-mail
//                 </Typography>
//                 <Box sx={{ flex: 1 }}/>
//                 <Typography variant="h7" sx={{ color: '#FFF', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                   {user?.email}
//                 </Typography>
//               </Box>
//               <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
//                 <Typography variant="h7" sx={{ color: '#FFF' }}>
//                   Password
//                 </Typography>
//                 <Box sx={{ flex: 1 }}/>
//                 <Button variant="h7" sx={{ color: '#0194fb', padding: 0, ':hover': {
//                           backgroundColor: 'transparent'} }} onClick={() => handleOpenResetPassword()}>
//                   Reset Password
//                 </Button>
//               </Box>
//             </CardContent>
//           </Card>
//         </Box>
//         <Box
//           sx={{
//             backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
//             borderRadius: '24px',
//             padding: '2px',
//             transition: 'all .2s',
//             position: 'relative',
//             transform: 'none',
//             boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
//             mt: 3,
//           }}
//         >
//           <Card sx={{ boxShadow: '0 2px 7px rgba(20, 20, 43, .06)', backgroundColor: '#0d1117', border: '1px solid rgba(239, 240, 246, .08)', borderRadius: 3,}}>
//             <CardContent>
//               <Typography variant="h4" sx={{ color: '#FFF' }}>
//                 Premium
//               </Typography>
//               { user?.membership === '8' || user?.membership === '10'?
//               <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, justifyContent: 'center' }}>
//                 {
//                   user?.membership === '8'?
//                   <>
//                 <Box
//                   component="img"
//                   alt="Silver"
//                   src="/assets/images/home/silver_large.png"  
//                   sx= {{
//                     width: '40px',
//                     height: '40px'
//                   }}
//                 />
//                 <Typography variant="h5" sx={{ color: '#FFF', fontWeight: '600', ml: 2, lineHeight: '2' }}>
//                   Silver
//                 </Typography>
//                 </>:
//                 <>
//                 <Box
//                   component="img"
//                   alt="Silver"
//                   src="/assets/images/home/gold_large.png"  
//                   sx= {{
//                     width: '40px',
//                     height: '40px'
//                   }}
//                 />
//                 <Typography variant="h5" sx={{ color: '#FFF', fontWeight: '600', ml: 2, lineHeight: '2' }}>
//                   Gold
//                 </Typography>
//                 </>
//                 }
//                 </Box>
//               : ''}
//               { user?.membership === '8' || user?.membership === '1'?
//               <Button onClick={() => handleSubscription()} sx={{ color: 'primary.contrastText', height: '45px', background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8}, minWidth: '220px', mt: 2 }}>
//                   {user?.membership === '8'? 'Upgrade my subscription': 'Choose my subscription' }
//               </Button>
//               :''}
//             </CardContent>
//           </Card>
//         </Box>
//         <Box
//           sx={{
//             backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
//             borderRadius: '24px',
//             padding: '2px',
//             transition: 'all .2s',
//             position: 'relative',
//             transform: 'none',
//             boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
//             mt: 3,
//           }}
//         >
//           <Card sx={{ boxShadow: '0 2px 7px rgba(20, 20, 43, .06)', backgroundColor: '#0d1117', border: '1px solid rgba(239, 240, 246, .08)', borderRadius: 3,}}>
//             <CardContent>
//               <Typography variant="h4" sx={{ color: '#FFF' }}>
//                 Risk Managment
//               </Typography>
//               <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }} onClick={() => handleOpenBankroll()}>
//                 <Typography variant="h7" sx={{ color: '#FFF' }}>
//                   Bankroll
//                 </Typography>
//                 <Box sx={{ flex: 1 }}/>
//                 <Typography variant="h7" sx={{ color: '#FFF' }}>
//                 {user?.bankroll} €
//                 </Typography>
//               </Box>
//               <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }} onClick={() => handleOpenBankroll()}>
//                 <Typography variant="h7" sx={{ color: '#FFF' }}>
//                   Staking Strategy
//                 </Typography>
//                 <Box sx={{ flex: 1 }}/>
//                 <Typography variant="h7" sx={{ color: '#FFF' }}>
//                 {user?.stakingStrategy}
//                 </Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Box>
//         <Box
//           sx={{
//             backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
//             borderRadius: '24px',
//             padding: '2px',
//             transition: 'all .2s',
//             position: 'relative',
//             transform: 'none',
//             boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
//             mt: 3,
//           }}
//         >
//           <Card sx={{ boxShadow: '0 2px 7px rgba(20, 20, 43, .06)', backgroundColor: '#0d1117', border: '1px solid rgba(239, 240, 246, .08)', borderRadius: 3,}}>
//             <CardContent>
//               <Typography variant="h4" sx={{ color: '#FFF' }}>
//                 Free Training
//               </Typography>
//               <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, alignItems: 'center' }}>
//                 <Box
//                   component="img"
//                   alt="Logo"
//                   src="/assets/images/home/normal_large.png"  
//                   sx= {{
//                     width: '28px',
//                     height: '28px'
//                   }}
//                 />
//                 <Typography variant="h7" sx={{ color: '#FFF', lineHeight: '2.5', ml: 2 }}>
//                   <a href="https://bspconsult.myclickfunnels.com/sports-betting?new_run=true" style={{ textDecoration: 'none', color: '#FFF'}}>
//                     Strategy Models
//                   </a>
//                 </Typography>
//               </Box>
//               <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//                 <Box
//                   component="img"
//                   alt="Gold"
//                   src="/assets/images/home/gold_large.png"  
//                   sx= {{
//                     width: '28px',
//                     height: '28px'
//                   }}
//                 />
//                 <Typography variant="h7" sx={{ color: '#FFF', lineHeight: '2.5', ml: 2 }}>
//                   <a href="https://bspconsult.myclickfunnels.com/masterclass-14k-strategy?new_run=true" style={{ textDecoration: 'none', color: '#FFF'}}>
//                     Strategy Masterclass
//                   </a>
//                 </Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Box>
//         <Box
//           sx={{
//             backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
//             borderRadius: '24px',
//             padding: '2px',
//             transition: 'all .2s',
//             position: 'relative',
//             transform: 'none',
//             boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
//             mt: 3,
//           }}
//         >
//           <Card sx={{ boxShadow: '0 2px 7px rgba(20, 20, 43, .06)', backgroundColor: '#0d1117', border: '1px solid rgba(239, 240, 246, .08)', borderRadius: 3,}}>
//             <CardContent>
//               <Typography variant="h4" sx={{ color: '#FFF' }}>
//                 Contact us
//               </Typography>
//               <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
//                 <Box
//                   component="img"
//                   alt="Logo"
//                   src="/assets/images/home/instagram.svg"  
//                   sx= {{
//                     width: '28px',
//                     height: '28px'
//                   }}
//                 />
//                 <Typography variant="h7" sx={{ color: '#FFF', lineHeight: '1.5', ml: 2 }}>
//                   <a 
//                     href="https://www.instagram.com/bspconsult?igsh=NW9kd252bjk2a3ls&utm_source=qr" 
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{ textDecoration: 'none', color: '#FFF'}}
//                   >
//                     Instagram
//                   </a>
//                 </Typography>
//               </Box>
//               <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
//                 <Box
//                   component="img"
//                   alt="Gold"
//                   src="/assets/images/home/snapchat.svg"  
//                   sx= {{
//                     width: '28px',
//                     height: '28px'
//                   }}
//                 />
//                 <Typography variant="h7" sx={{ color: '#FFF', lineHeight: '1.5', ml: 2 }}>
//                   <a 
//                     href="https://t.snapchat.com/lPLA1XMl" 
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{ textDecoration: 'none', color: '#FFF'}}
//                   >
//                     Snapchat
//                   </a>
//                 </Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Box>
//         <Box
//           sx={{
//             backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
//             borderRadius: '24px',
//             padding: '2px',
//             transition: 'all .2s',
//             position: 'relative',
//             transform: 'none',
//             boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
//             mt: 3,
//           }}
//         >
//           <Card sx={{ boxShadow: '0 2px 7px rgba(20, 20, 43, .06)', backgroundColor: '#0d1117', border: '1px solid rgba(239, 240, 246, .08)', borderRadius: 3,}}>
//             <CardContent>
//               <Typography variant="h4" sx={{ color: '#FFF' }}>
//                 Account
//               </Typography>
//               <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
//                 <Box
//                   component="img"
//                   alt="Logo"
//                   src="/assets/images/home/terms.png"  
//                   sx= {{
//                     width: '28px',
//                     height: '28px'
//                   }}
//                 />
//                 <Typography variant="h7" sx={{ color: '#FFF', lineHeight: '1.5', ml: 2 }}>
//                   <a 
//                     href="/terms-and-conditions" 
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{ textDecoration: 'none', color: '#FFF'}}
//                   >
//                     Terms of Service
//                   </a>
//                 </Typography>
//               </Box>
//               <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
//                 <Box
//                   component="img"
//                   alt="Gold"
//                   src="/assets/images/home/policy.png"  
//                   sx= {{
//                     width: '28px',
//                     height: '28px'
//                   }}
//                 />
//                 <Typography variant="h7" sx={{ color: '#FFF', lineHeight: '1.5', ml: 2 }}>
//                   <a 
//                     href="/privacy-policy" 
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{ textDecoration: 'none', color: '#FFF'}}
//                   >
//                     Privacy Policy
//                   </a>
//                 </Typography>
//               </Box>
//               <Button onClick={() => handleOpenDeleteAccountRequest()} sx={{ color: 'primary.contrastText', height: '45px', background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8}, minWidth: '220px', mt: 2 }}>
//                   Delete my account
//               </Button>
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>
//     </Container>
//   );
// }

/* eslint-disable
  react/self-closing-comp,
  jsx-a11y/click-events-have-key-events,
  jsx-a11y/no-static-element-interactions
*/
/* eslint-disable no-nested-ternary */

import PropTypes from 'prop-types';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Container,
  Typography,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MotionViewport } from 'src/components/animate';
import { useAuthContext } from '../../../auth/useAuthContext';


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


export default function Profile({ onChange }) {
  const { user, updateBankroll, resetPassword, deleteAccount } = useAuthContext();

  Profile.propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  const [openBankroll, setOpenBankroll] = useState(false);
  const [bankroll, setBankroll] = useState(user?.bankroll);
  const [stakingStrategy, setStakingStrategy] = useState(user?.stakingStrategy);
  const [loadingBankroll, setLoadingBankroll] = useState(false);
  const [openStrategy, setOpenStrategy] = useState(false);
  const [loadingStrategy, setLoadingStrategy] = useState(false);



  const [openUpgrade, setOpenUpgrade] = useState(false);

  const [deletAccountRequest, setDeletAccount] = useState(false);
  const [openResetPassword, setOpenResetPassword] = useState(false);
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);
  const isGold = user?.membership === '10';
  const isAdvanced = user?.membership === '9';
  const isSilver = user?.membership === '8';
  const hasNoSubscription = user?.membership === '1' || !user?.membership;

  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (openBankroll) {
      setBankroll(
        user?.bankroll !== undefined && user?.bankroll !== null
          ? user.bankroll
          : 0
      );
    }
  }, [openBankroll, user]);

  useEffect(() => {
    if (openStrategy) {
      setStakingStrategy(user?.stakingStrategy || 'Aggressive');
    }
  }, [openStrategy, user]);



  const handleSubscription = () => onChange(user?.membership);

  const onChangeBankroll = async () => {
    setLoadingBankroll(true);
    await updateBankroll(bankroll, user?.stakingStrategy, user?.uid);
    setOpenBankroll(false);
    setLoadingBankroll(false);
  };
  const onChangeStrategy = async () => {
    setLoadingStrategy(true);
    await updateBankroll(user?.bankroll, stakingStrategy, user?.uid);
    setOpenStrategy(false);
    setLoadingStrategy(false);
  };


  const onConfirmResetPassword = async () => {
    setLoadingResetPassword(true);
    await resetPassword(user?.email);
    setLoadingResetPassword(false);
    setOpenResetPassword(false);
  };

  const onConfirmDeleteAccount = async () => {
    setLoadingResetPassword(true);
    await deleteAccount(user?.email);
    setLoadingResetPassword(false);
    setDeletAccount(false);
  };

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

  const currentPlan =
    isSilver ? 'silver' :
      isAdvanced ? 'advanced' :
        null;

  const upgradeData =
    currentPlan && selectedPlan
      ? UPGRADE_CONFIG[currentPlan]?.[selectedPlan]
      : null;


  return (
    <Container component={MotionViewport} className="content-grid">

      {/* ================= DIALOGS (UNCHANGED) ================= */}

      <Dialog
        open={openBankroll}
        onClose={() => setOpenBankroll(false)}
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
              Change your bankroll
            </span>


            <button
              type="button"
              className="lock-close"
              onClick={() => setOpenBankroll(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="lock-divider" />
          <h1 className="lock-title" style={{ fontSize: '18px' }}>Bankroll</h1>

          {/* BODY */}
          <div className="membership">
            <TextField
              fullWidth
              type="number"
              value={bankroll}
              onChange={(e) => setBankroll(Number(e.target.value))}
              sx={{
                '& .MuiInputBase-root': {
                  height: 48,
                  backgroundColor: '#FFFFFF0A',
                  borderRadius: '8px',
                },
                '& .MuiInputBase-root:hover': {
                  backgroundColor: '#FFFFFF05',
                },
                '& .MuiInputBase-input': {
                  color: '#FFF',
                  fontSize: '16px',
                  padding: '0 14px',
                  display: 'flex',
                  alignItems: 'center',
                },
                '& fieldset': {
                  border: '1px solid rgba(255,255,255,0.12)',
                },
              }}
            />



          </div>

          <div className="lock-divider" />

          {/* FOOTER */}
          <div className="lock-footer">
            <button
              type="button"
              className="lock-logout"
              onClick={() => setOpenBankroll(false)}
            >
              Cancel
            </button>

            <button
              type="button"
              className="lock-unlock"
              onClick={onChangeBankroll}
              style={{
                color: '#FFFFFF',
              }}
            >
              Confirm
            </button>
          </div>

        </div>
      </Dialog>


      <Dialog
        open={openStrategy}
        onClose={() => setOpenStrategy(false)}
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
            >Change staking strategy</span>

            <button
              type="button"
              className="lock-close"
              onClick={() => setOpenStrategy(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="lock-divider" />

          <h1 className="lock-title" style={{ fontSize: '18px' }}>Staking Strategy</h1>

          {/* BODY */}
          <div className="membership">
            <TextField
              select
              fullWidth
              value={stakingStrategy}
              onChange={(e) => setStakingStrategy(e.target.value)}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: {
                      mt: 1,
                      backgroundColor: '#1B1D27',
                      color: '#FFF',
                      borderRadius: '8px',
                    },
                  },
                  MenuListProps: {
                    sx: {
                      padding: '8px',
                    },
                  },
                },
              }}
              sx={{
                '& .MuiInputBase-root': {
                  height: 48,
                  backgroundColor: '#FFFFFF0A',
                  borderRadius: '8px',
                },
                '& .MuiInputBase-root:hover': {
                  backgroundColor: '#FFFFFF05',
                },
                '& .MuiInputBase-input': {
                  color: '#FFF',
                  fontSize: '16px',
                  padding: '0 14px',
                  display: 'flex',
                  alignItems: 'center',
                },
                '& fieldset': {
                  border: '1px solid rgba(255,255,255,0.12)',
                },


                '& .MuiMenuItem-root': {
                  borderRadius: 0,
                  minHeight: 48,
                  fontSize: '16px',
                },
                '& .MuiMenuItem-root:hover': {
                  backgroundColor: '#FFFFFF05',
                },
                '& .MuiMenuItem-root.Mui-selected': {
                  backgroundColor: '#FFFFFF0A',
                },
                '& .MuiMenuItem-root.Mui-selected:hover': {
                  backgroundColor: '#FFFFFF05',
                },
              }}
            >
              <MenuItem value="Conservative">Conservative</MenuItem>
              <MenuItem value="Balanced">Balanced</MenuItem>
              <MenuItem value="Aggressive">Aggressive</MenuItem>
            </TextField>





          </div>

          <div className="lock-divider" />

          {/* FOOTER */}
          <div className="lock-footer">
            <button
              type="button"
              className="lock-logout"
              onClick={() => setOpenStrategy(false)}
            >
              Cancel
            </button>

            <button
              type="button"
              className="lock-unlock"
              onClick={onChangeStrategy}
              disabled={loadingStrategy}
              style={{
                color: '#FFFFFF',
              }}
            >
              {loadingStrategy ? 'Saving...' : 'Confirm'}
            </button>
          </div>

        </div>
      </Dialog>


      <Dialog
        open={openResetPassword}
        onClose={() => setOpenResetPassword(false)}
        PaperProps={{
          style: {
            minWidth: '400px',
            maxWidth: '400px',
            background: '#0d1117',
            border: '2px solid #076af478',
            color: '#fff',
          },
        }}
      >
        <DialogTitle sx={{ color: '#FFF' }}>
          Reset Password
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ color: '#FFF' }}>
            Are you sure you would like to get an email at{' '}
            <strong>{user?.email}</strong> to reset your password?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            type="button"
            sx={{ color: '#FFF', backgroundColor: 'transparent' }}
            onClick={() => setOpenResetPassword(false)}
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
            onClick={onConfirmResetPassword}
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>


      <Dialog open={deletAccountRequest} onClose={() => setDeletAccount(false)}>
        <DialogTitle sx={{ color: '#FFF' }}>Delete Account</DialogTitle>
        <DialogActions>
          <Button type='button' onClick={() => setDeletAccount(false)}>Cancel</Button>
          <LoadingButton loading={loadingResetPassword} onClick={onConfirmDeleteAccount}>
            Confirm
          </LoadingButton>
        </DialogActions>
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





      {/* ================= UI ================= */}

      <div className="all-content">
        <p className="manage-profile">Manage Profile</p>

        <div className="all-profile-info">

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
              <span className="profile-ans with-icon" onClick={() => setOpenResetPassword(true)}>
                Reset Password <img src="/img/Icon.svg" alt="" />
              </span>
            </div>
          </div>

          {/* SUBSCRIPTION */}
          {/* <div className="info-box">
            <h3>Subscription</h3>
            <div className="program-type">
              <p>{user?.membership === '10' ? 'Gold Program' : 'Silver Program'}</p>
              <button type='button' className="upgrade-btn" onClick={handleSubscription}>
                Upgrade Membership
              </button>
            </div>
          </div> */}
          {/* SUBSCRIPTION */}
          <div className="info-box">
            <h3>Subscription</h3>

            <div className="program-type">
              {/* Show program name ONLY if user has subscription */}
              {(isSilver || isAdvanced || isGold) && (
                <p className='premium'>
                  {isGold && 'Gold Program'}
                  {isAdvanced && 'Advanced Program'}
                  {isSilver && 'Silver Program'}
                </p>
              )}


              {/* Show upgrade button if:
        - user has NO subscription
        - OR user has Silver */}
              {(hasNoSubscription || isSilver || isAdvanced) && !isGold && (
                <button
                  type="button"
                  className="upgrade-btn"
                  onClick={() => {

                    // NO MEMBERSHIP → same behavior as Courses
                    if (hasNoSubscription) {
                      onChange(user?.membership);
                      return;
                    }

                    // SILVER → open dialog (default Advanced)
                    if (isSilver) {
                      setSelectedPlan('advanced');
                    }

                    // ADVANCED → open dialog (default Gold)
                    if (isAdvanced) {
                      setSelectedPlan('gold');
                    }

                    setOpenUpgrade(true);
                  }}
                >
                  {hasNoSubscription ? 'Choose Membership' : 'Upgrade Membership'}
                </button>



              )}

            </div>
          </div>


          {/* RISK MANAGEMENT */}
          <div className="info-box">
            <h3>Risk Management</h3>

            <div className="info-row" onClick={() => setOpenBankroll(true)}>
              <span>Bankroll</span>
              <span className="profile-ans with-icon">
                {user?.bankroll}
                <img src="/img/chevron-right.svg" alt="" />
              </span>
            </div>

            <div className="info-row" onClick={() => setOpenStrategy(true)}>

              <span>Staking Strategy</span>
              <span className="profile-ans with-icon">
                {user?.stakingStrategy}
                <img src="/img/chevron-right.svg" alt="" />
              </span>
            </div>
          </div>

          {/* FREE TRAINING */}
          <div className="info-box">
            <h3>Free Training</h3>

            <a className="Strategy-btn" href="https://bspconsult.myclickfunnels.com/sports-betting?new_run=true">
              <span className="btn-left">
                <img src="/img/bsplogo.png" alt="" /> Strategy Models
              </span>
              <img src="/img/Icon.svg" className="btn-arrow" alt="" />
            </a>

          </div>

          {/* CONTACT */}
          <div className="info-box">
            <h3>Contact Us</h3>

            <div className="contact-buttons">
              <a className="contact-btn" href="https://instagram.com/bspconsult">
                <img src="/img/insta.svg" alt="" />
                <span>Instagram</span>
              </a>

              <a className="contact-btn" href="https://t.snapchat.com/lPLA1XMl">
                <img src="/img/snap.svg" alt="" />
                <span>Snapchat</span>
              </a>
            </div>
          </div>

          {/* ACCOUNT */}
          <div className="info-box">
            <h3>Account Setting</h3>

            <a className="Strategy-btn" href="/terms-and-conditions">
              <span className="btn-left">
                <img src="/img/tool-02.svg" alt="" /> Terms of Service
              </span>
            </a>

            <a className="Strategy-btn" href="/privacy-policy">
              <span className="btn-left">
                <img src="/img/file-shield-02.svg" alt="" /> Privacy Policy
              </span>
            </a>

            <button type='button' className="delete-btn" onClick={() => setDeletAccount(true)}>
              Delete my Account
            </button>
          </div>

          {/* ================= UPGRADE MEMBERSHIP – FULL WIDTH ================= */}
          {/* {!isGold && (isSilver || hasNoSubscription) && (
  <div className="upgrade-box">
    <div className="upgrade-content">
      <h3>Upgrade Membership</h3>
      <p>Upgrade to unlock full access.</p>
    </div>

    <button
      type="button"
      className="Gold-btn"
      onClick={handleSubscription}
    >
      Gold
    </button>

    <div className="upgrade-card upgrade-card--gold">
  <div className="upgrade-inner">

    <div className="upgrade-headers">
      <h3 className="upgrade-title">Gold Program</h3>
    </div>

    <div className="upgrade-price">
      <span className="price-amount">€400</span>
      <span className="price-period">one time fee</span>
    </div>

    <div className="upgrade-note">
      Lock in current pricing before next update.
    </div>

    <button
      type="button"
      className="Gold-btn"
      onClick={handleSubscription}
    >
      Get Gold Program
    </button>
  </div>

  <div className="upgrade-includes">
    <h4>Extra benefits with Gold</h4>
    <ul>
      <li className="active">
        <img src="img/gold-tick.svg" alt="check" />
        <span className="include-text">
          High-Stakes Betting Frameworks
        </span>
      </li>
      <li className="active">
        <img src="img/gold-tick.svg" alt="check" />
        <span className="include-text">
          BSP Masterclass (20+ Hours of Video)
        </span>
      </li>
      <li className="active">
        <img src="img/gold-tick.svg" alt="check" />
        <span className="include-text">
          Real Time Study Cases
        </span>
      </li>
    </ul>
  </div>
</div>

  </div>
)} */}

        </div>
      </div>
    </Container>
  );
}
