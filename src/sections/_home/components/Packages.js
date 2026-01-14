// import { loadStripe } from '@stripe/stripe-js';
// import { useNavigate } from 'react-router-dom';
// // @mui
// import { Box, Paper, Container, Typography, Button } from '@mui/material';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import { MotionViewport, varFade } from 'src/components/animate';
// import useResponsive from 'src/hooks/useResponsive';
// import { useAuthContext } from '../../../auth/useAuthContext';
// import { paths } from '../../../routes/paths';
// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the Stripe object on every render.






// const stripePromise = loadStripe("pk_test_51NAUESCf4YXq1rsy7qsqKVbtnalP4WkcBPaYkjtlVZTmoCYd6wQNh6m5ui1F62CLzNdG1hP26kkX2YKBycMqRkq800RuHmE6iD");

// // ----------------------------------------------------------------------

// export default function Packages() {
//   const isDesktop = useResponsive('up', 'md');
//   const { user, isAuthenticated } = useAuthContext();
//   const navigate = useNavigate();

//   const handleBack = () => {
//     navigate('/home', { replace: false });
//   };

//   const handleSilverSubscription = async (event) => {
//     if (isAuthenticated) {
//       // Get Stripe.js instance
//       const stripe = await stripePromise;

//       // Call your Firebase function
//       const response = await fetch(
//         'https://us-central1-bspconsult-bcd6e.cloudfunctions.net/createCheckoutSession',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             priceId: 'price_1OgVTPCf4YXq1rsyGHWrpUI3',
//             customerEmail: user?.email,
//             platform: 'web',
//           }),
//         }
//       );

//       const session = await response.json();

//       // When the customer clicks on the button, redirect them to Checkout.
//       const result = await stripe.redirectToCheckout({
//         sessionId: session.id,
//       });

//       if (result.error) {
//         // If `redirectToCheckout` fails due to a browser or network
//         // error, display the localized error message to your customer.
//         console.error(result.error.message);
//       }
//     } else {
//       navigate(paths.login, { replace: true });
//     }
//   };

//   const handleGoldSubscription = async (event) => {
//     if (isAuthenticated) {
//       // Get Stripe.js instance
//       const stripe = await stripePromise;

//       // Call your Firebase function
//       const response = await fetch(
//         'https://us-central1-bspconsult-bcd6e.cloudfunctions.net/createCheckoutSession',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             priceId: 'price_1NqWtkCf4YXq1rsyDvmsIWtF',
//             customerEmail: user?.email,
//             platform: 'web',
//           }),
//         }
//       );

//       const session = await response.json();

//       // When the customer clicks on the button, redirect them to Checkout.
//       const result = await stripe.redirectToCheckout({
//         sessionId: session.id,
//       });

//       if (result.error) {
//         // If `redirectToCheckout` fails due to a browser or network
//         // error, display the localized error message to your customer.
//         console.error(result.error.message);
//       }
//     } else {
//       navigate(paths.login, { replace: true });
//     }
//   };
//   return (
//     <Container
//       component={MotionViewport}
//       sx={{
//         py: 3,
//         px: 3,
//       }}
//     >
//       <Paper
//         sx={{
//           borderRadius: 3,
//           textAlign: 'center',
//           backgroundColor: 'transparent',
//           paddingTop: 0,
//         }}
//       >
//         <Box sx={{ mt: isDesktop ? 2 : 0, mx: 'auto', maxWidth: 1086 }}>
//           <Box sx={{ width: '100%', display: 'flex', justifyContent: 'start' }}>
//             <ChevronLeftIcon
//               sx={{ width: '32px', height: '32px', cursor: 'pointer' }}
//               onClick={handleBack}
//             />
//           </Box>
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: isDesktop ? 'row' : 'column',
//               width: '100%',
//               mt: isDesktop ? 0 : 2,
//               columnGap: isDesktop ? 6 : 0,
//               rowGap: isDesktop ? 0 : 1,
//               justifyContent: 'center',
//             }}
//           >
//             <Box
//               variants={varFade().inUp}
//               sx={{
//                 flex: 1,
//                 alignItems: 'center',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 maxWidth: '423px',
//                 height: '100%',
//                 pb: 5,
//               }}
//             >
//               <Box
//                 sx={{
//                   backgroundImage: 'linear-gradient(#0867ef, #0d1117)',
//                   borderTopLeftRadius: '20px',
//                   borderTopRightRadius: '20px',
//                   pt: '2px',
//                   pl: '2px',
//                   pr: '2px',
//                 }}
//               >
//                 <Box
//                   sx={{
//                     backgroundColor: '#0d1117',
//                     borderRadius: '20px 20px 0 0',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     display: 'flex',
//                     position: 'relative',
//                     width: '200px',
//                     height: '90px',
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                       color: '#627083',
//                       fontSize: '28px',
//                       lineHeight: 1,
//                       textDecoration: 'line-through',
//                     }}
//                   >
//                     €850
//                   </Typography>
//                   <Box
//                     sx={{
//                       backgroundImage:
//                         'linear-gradient(rgba(177, 177, 177, .55), #fff 0%, rgba(235, 235, 235, .88) 58%, rgba(0, 0, 0, 0))',
//                       backgroundClip: 'text',
//                       fontSize: '50px',
//                       color: 'rgb(249, 250, 251)',
//                       lineHeight: 1,
//                       WebkitTextFillColor: 'transparent',
//                       fontFamily: "'Public Sans', sans-serif",
//                     }}
//                   >
//                     €397
//                   </Box>
//                 </Box>
//               </Box>
//               <Box
//                 sx={{
//                   backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
//                   borderRadius: '24px',
//                   padding: '2px',
//                   transition: 'all .2s',
//                   position: 'relative',
//                   transform: 'none',
//                   boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
//                 }}
//               >
//                 <Box
//                   sx={{
//                     backgroundColor: '#0d1117',
//                     width: '100%',
//                     height: '100%',
//                     border: '1px solid rgba(239, 240, 246, .08)',
//                     borderRadius: '24px',
//                     transition: 'all .2s',
//                     position: 'relative',
//                     boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
//                     px: 3,
//                     py: 3,
//                     textAlign: 'start',
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'row',
//                     }}
//                   >
//                     <Box
//                       component="img"
//                       alt="Logo"
//                       src="/assets/images/home/silver_large.png"
//                       sx={{
//                         width: '75px',
//                         height: '75px',
//                       }}
//                     />
//                     <Box
//                       sx={{
//                         backgroundImage: 'linear-gradient(#0867ef, #0867ef)',
//                         borderRadius: '40px',
//                         padding: '2px',
//                         position: 'absolute',
//                         top: '14px',
//                         right: '14px',
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           padding: '5px 16px 8px',
//                           fontSize: '11px',
//                           lineHeight: '16px',
//                           color: '#fff',
//                           textAlign: 'center',
//                           letterSpacing: '2px',
//                           backgroundColor: '#0d1117',
//                           border: '1px #484d54',
//                           borderRadius: '40px',
//                           fontWeight: 700,
//                         }}
//                       >
//                         €33/month
//                       </Box>
//                     </Box>
//                   </Box>
//                   <Typography
//                     variant="h3"
//                     sx={{ color: 'primary.contrastText', mt: 3, textAlign: 'start' }}
//                   >
//                     Silver Program
//                   </Typography>
//                   <Typography variant="h7" sx={{ color: '#9a9a9a', mt: 3, textAlign: 'start' }}>
//                     Get yearly access to the Silver Program and effortlessly copy and paste our
//                     well-analyzed winning bets.
//                   </Typography>
//                   <Box
//                     variants={varFade().inDown}
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'row',
//                       width: '100%',
//                       pt: 3,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Box
//                       component="img"
//                       alt="check"
//                       src="/assets/images/home/checkbox.svg"
//                       sx={{
//                         width: '22px',
//                         height: '22px',
//                       }}
//                     />
//                     <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
//                       Copy & Paste Concept
//                     </Typography>
//                   </Box>
//                   <Box
//                     variants={varFade().inDown}
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'row',
//                       width: '100%',
//                       mt: 1,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Box
//                       component="img"
//                       alt="check"
//                       src="/assets/images/home/checkbox.svg"
//                       sx={{
//                         width: '22px',
//                         height: '22px',
//                       }}
//                     />
//                     <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
//                       Telegram Live Channel
//                     </Typography>
//                   </Box>
//                   <Box
//                     variants={varFade().inDown}
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'row',
//                       width: '100%',
//                       mt: 1,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Box
//                       component="img"
//                       alt="check"
//                       src="/assets/images/home/checkbox.svg"
//                       sx={{
//                         width: '22px',
//                         height: '22px',
//                       }}
//                     />
//                     <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
//                       BSP Tennis Betting Model
//                     </Typography>
//                   </Box>
//                   <Box
//                     variants={varFade().inDown}
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'row',
//                       width: '100%',
//                       mt: 1,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Box
//                       component="img"
//                       alt="check"
//                       src="/assets/images/home/checkbox.svg"
//                       sx={{
//                         width: '22px',
//                         height: '22px',
//                       }}
//                     />
//                     <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
//                       Silver Video Content
//                     </Typography>
//                   </Box>
//                   <Box
//                     variants={varFade().inDown}
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'row',
//                       width: '100%',
//                       mt: 1,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Box
//                       component="img"
//                       alt="check"
//                       src="/assets/images/home/checkbox.svg"
//                       sx={{
//                         width: '22px',
//                         height: '22px',
//                         opacity: 0.5,
//                       }}
//                     />
//                     <Typography
//                       sx={{
//                         px: 1,
//                         color: 'primary.contrastText',
//                         fontSize: '15px',
//                         textDecoration: 'line-through',
//                       }}
//                     >
//                       Masterclass Channel
//                     </Typography>
//                   </Box>
//                   <Box
//                     variants={varFade().inDown}
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'row',
//                       width: '100%',
//                       mt: 1,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Box
//                       component="img"
//                       alt="check"
//                       src="/assets/images/home/checkbox.svg"
//                       sx={{
//                         width: '22px',
//                         height: '22px',
//                         opacity: 0.5,
//                       }}
//                     />
//                     <Typography
//                       sx={{
//                         px: 1,
//                         color: 'primary.contrastText',
//                         fontSize: '15px',
//                         textDecoration: 'line-through',
//                       }}
//                     >
//                       Masterclass Video Content
//                     </Typography>
//                   </Box>
//                   <Box
//                     variants={varFade().inDown}
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'row',
//                       width: '100%',
//                       mt: 1,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Box
//                       component="img"
//                       alt="check"
//                       src="/assets/images/home/checkbox.svg"
//                       sx={{
//                         width: '22px',
//                         height: '22px',
//                         opacity: 0.5,
//                       }}
//                     />
//                     <Typography
//                       sx={{
//                         px: 1,
//                         color: 'primary.contrastText',
//                         fontSize: '15px',
//                         textDecoration: 'line-through',
//                       }}
//                     >
//                       Masterclass Zone
//                     </Typography>
//                   </Box>
//                   <Box
//                     sx={{
//                       background: 'linear-gradient(#047efc, #12488f)',
//                       position: 'relative',
//                       overflow: 'hidden',
//                       width: '100%',
//                       height: '48px',
//                       borderRadius: '8px',
//                       mt: 4,
//                       ':hover': {
//                         opacity: 0.8,
//                       },
//                     }}
//                   >
//                     <Button
//                       variant="filled"
//                       color="inherit"
//                       sx={{
//                         position: 'relative',
//                         zIndex: 2, // Ensure the button text is above the overlay
//                         color: '#FFF',
//                         width: '100%',
//                         height: '48px',
//                         fontSize: 16,
//                         fontWeight: 700,
//                       }}
//                       onClick={handleSilverSubscription}
//                     >
//                       Start Now
//                       <Box
//                         component="img"
//                         alt="arrow"
//                         src="/assets/images/home/arrow_outward_white.png"
//                       />
//                     </Button>
//                   </Box>
//                 </Box>
//               </Box>
//             </Box>
//             <Box
//               variants={varFade().inUp}
//               sx={{
//                 flex: 1,
//                 alignItems: 'center',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 maxWidth: '423px',
//                 height: '100%',
//                 pb: 5,
//               }}
//             >
//               <Box
//                 sx={{
//                   backgroundImage: 'linear-gradient(#0867ef, #0d1117)',
//                   borderTopLeftRadius: '20px',
//                   borderTopRightRadius: '20px',
//                   pt: '2px',
//                   pl: '2px',
//                   pr: '2px',
//                 }}
//               >
//                 <Box
//                   sx={{
//                     backgroundColor: '#0d1117',
//                     borderRadius: '20px 20px 0 0',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     display: 'flex',
//                     position: 'relative',
//                     width: '200px',
//                     height: '90px',
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                       color: '#627083',
//                       fontSize: '28px',
//                       lineHeight: 1,
//                       textDecoration: 'line-through',
//                     }}
//                   >
//                     €2500
//                   </Typography>
//                   <Box
//                     sx={{
//                       backgroundImage:
//                         'linear-gradient(rgba(177, 177, 177, .55), #fff 0%, rgba(235, 235, 235, .88) 58%, rgba(0, 0, 0, 0))',
//                       backgroundClip: 'text',
//                       fontSize: '50px',
//                       color: 'rgb(249, 250, 251)',
//                       lineHeight: 1,
//                       WebkitTextFillColor: 'transparent',
//                       fontFamily: "'Public Sans', sans-serif",
//                     }}
//                   >
//                     €997
//                   </Box>
//                 </Box>
//               </Box>
//               <Box
//                 sx={{
//                   backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
//                   borderRadius: '24px',
//                   padding: '2px',
//                   transition: 'all .2s',
//                   position: 'relative',
//                   transform: 'none',
//                   boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
//                 }}
//               >
//                 <Box
//                   sx={{
//                     backgroundColor: '#0d1117',
//                     width: '100%',
//                     height: '100%',
//                     border: '1px solid rgba(239, 240, 246, .08)',
//                     borderRadius: '24px',
//                     transition: 'all .2s',
//                     position: 'relative',
//                     boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
//                     px: 3,
//                     py: 3,
//                     textAlign: 'start',
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'row',
//                     }}
//                   >
//                     <Box
//                       component="img"
//                       alt="Logo"
//                       src="/assets/images/home/gold_large.png"
//                       sx={{
//                         width: '75px',
//                         height: '75px',
//                       }}
//                     />
//                     <Box
//                       sx={{
//                         backgroundImage: 'linear-gradient(#0867ef, #0867ef)',
//                         borderRadius: '40px',
//                         padding: '2px',
//                         position: 'absolute',
//                         top: '14px',
//                         right: '14px',
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           padding: '5px 16px 8px',
//                           fontSize: '11px',
//                           lineHeight: '16px',
//                           color: '#fff',
//                           textAlign: 'center',
//                           letterSpacing: '2px',
//                           backgroundColor: '#0d1117',
//                           border: '1px #484d54',
//                           borderRadius: '40px',
//                           fontWeight: 700,
//                         }}
//                       >
//                         Most Valuable
//                       </Box>
//                     </Box>
//                   </Box>
//                   <Typography
//                     variant="h3"
//                     sx={{ color: 'primary.contrastText', mt: 3, textAlign: 'start' }}
//                   >
//                     Gold Program
//                   </Typography>
//                   <Typography variant="h7" sx={{ color: '#9a9a9a', mt: 3, textAlign: 'start' }}>
//                     Pay only €997 once to get instant access to all Masterclass features. From the
//                     second year, it&apos;s only €397 annually to maintain access.
//                   </Typography>
//                   <Box
//                     variants={varFade().inDown}
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'row',
//                       width: '100%',
//                       pt: 3,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Box
//                       component="img"
//                       alt="check"
//                       src="/assets/images/home/checkbox.svg"
//                       sx={{
//                         width: '22px',
//                         height: '22px',
//                       }}
//                     />
//                     <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
//                       Copy & Paste Concept
//                     </Typography>
//                   </Box>
//                   <Box
//                     variants={varFade().inDown}
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'row',
//                       width: '100%',
//                       mt: 1,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Box
//                       component="img"
//                       alt="check"
//                       src="/assets/images/home/checkbox.svg"
//                       sx={{
//                         width: '22px',
//                         height: '22px',
//                       }}
//                     />
//                     <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
//                       Telegram Live Channel
//                     </Typography>
//                   </Box>
//                   <Box
//                     variants={varFade().inDown}
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'row',
//                       width: '100%',
//                       mt: 1,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Box
//                       component="img"
//                       alt="check"
//                       src="/assets/images/home/checkbox.svg"
//                       sx={{
//                         width: '22px',
//                         height: '22px',
//                       }}
//                     />
//                     <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
//                       BSP Tennis Betting Model
//                     </Typography>
//                   </Box>
//                   <Box
//                     variants={varFade().inDown}
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'row',
//                       width: '100%',
//                       mt: 1,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Box
//                       component="img"
//                       alt="check"
//                       src="/assets/images/home/checkbox.svg"
//                       sx={{
//                         width: '22px',
//                         height: '22px',
//                       }}
//                     />
//                     <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
//                       Silver Video Content
//                     </Typography>
//                   </Box>
//                   <Box
//                     variants={varFade().inDown}
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'row',
//                       width: '100%',
//                       mt: 1,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Box
//                       component="img"
//                       alt="check"
//                       src="/assets/images/home/checkbox.svg"
//                       sx={{
//                         width: '22px',
//                         height: '22px',
//                       }}
//                     />
//                     <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
//                       Masterclass Channel
//                     </Typography>
//                   </Box>
//                   <Box
//                     variants={varFade().inDown}
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'row',
//                       width: '100%',
//                       mt: 1,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Box
//                       component="img"
//                       alt="check"
//                       src="/assets/images/home/checkbox.svg"
//                       sx={{
//                         width: '22px',
//                         height: '22px',
//                       }}
//                     />
//                     <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
//                       Masterclass Video Content
//                     </Typography>
//                   </Box>
//                   <Box
//                     variants={varFade().inDown}
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'row',
//                       width: '100%',
//                       mt: 1,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Box
//                       component="img"
//                       alt="check"
//                       src="/assets/images/home/checkbox.svg"
//                       sx={{
//                         width: '22px',
//                         height: '22px',
//                       }}
//                     />
//                     <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
//                       Masterclass Zone
//                     </Typography>
//                   </Box>
//                   <Box
//                     sx={{
//                       background: 'linear-gradient(#047efc, #12488f)',
//                       position: 'relative',
//                       overflow: 'hidden',
//                       width: '100%',
//                       height: '48px',
//                       borderRadius: '8px',
//                       mt: 4,
//                       ':hover': {
//                         opacity: 0.8,
//                       },
//                     }}
//                   >
//                     <Button
//                       variant="filled"
//                       color="inherit"
//                       sx={{
//                         position: 'relative',
//                         zIndex: 2, // Ensure the button text is above the overlay
//                         color: '#FFF',
//                         width: '100%',
//                         height: '48px',
//                         fontSize: 16,
//                         fontWeight: 700,
//                       }}
//                       onClick={handleGoldSubscription}
//                     >
//                       Start Now
//                       <Box
//                         component="img"
//                         alt="arrow"
//                         src="/assets/images/home/arrow_outward_white.png"
//                       />
//                     </Button>
//                   </Box>
//                 </Box>
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }


/* eslint-disable react/no-unescaped-entities */


import { loadStripe } from '@stripe/stripe-js';
import { CircleCheck } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { paths } from 'src/routes/paths';
import { useAuthContext } from 'src/auth/useAuthContext';


// Stripe must stay OUTSIDE component



const stripePromise = loadStripe(
  'pk_live_51NAUESCf4YXq1rsyBMpbCD1Yqi5kocGdjxYqcqknpppNXXnUKKCVxar7NqInLJRCJTCEVkbqQPppP7nvve8E053I00P0pVQI8d'
);

// const stripePromise = loadStripe(
//   'pk_test_51NAUESCf4YXq1rsy7qsqKVbtnalP4WkcBPaYkjtlVZTmoCYd6wQNh6m5ui1F62CLzNdG1hP26kkX2YKBycMqRkq800RuHmE6iD'
// );



// 🔹 Map program → Stripe Price ID
const PRICE_MAP = {
  silver: 'price_1OgVTPCf4YXq1rsyGHWrpUI3',
  advanced: 'price_XXXXXXXXXXXXXXX', // <-- put Advanced priceId here
  gold: 'price_1NqWtkCf4YXq1rsyDvmsIWtF',
};

const programs = [
  {
    id: 'silver',
    name: 'Silver Program',
    description:
      'For bettors who want a simple, disciplined foundation built on structured bets, clear analysis and repeatable execution. Designed to replace emotional decisions and bad habits with consistency.',
    priceAmount: '€397',
    pricePeriod: '/year',
    note: 'Best for starting with structure.',
    button: 'Get Silver Program',
    highlightCount: 4,
  },
  {
    id: 'advanced',
    name: 'Advanced Program',
    description:
      'For bettors who want structured bets backed by game-changing data and access to the BSP Betting Model to consistently identify mispriced odds. From year two, maintain full access for just €397 annually.',
    priceAmount: '€597',
    pricePeriod: ' one-time fee',
    note: 'Lock in pricing before the next platform update.',
    button: 'Get Advanced Program',
    highlightCount: 7,
  },
  {
    id: 'gold',
    name: 'Gold Program',
    description:
      'For bettors who want to master high-level decision-making, advanced strategies and real-world study cases to operate at their highest potential. From year two, maintain full access for just €397 annually.',
    priceAmount: '€997',
    pricePeriod: ' one-time fee',
    note: 'Secure current Gold pricing.',
    button: 'Get Gold Program',
    highlightCount: 10,
  },
];

const includes = [
  'Structured Bets',
  'Detailed Bet Analysis',
  'Tournament Previews',
  'Live Betting Opportunities',
  'Advanced Data Insights (BSP App)',
  'BSP Tennis Betting Model',
  'Essential Video Content',
  'High-Stakes Betting Frameworks',
  'BSP Masterclass (20+ Hours of Video)',
  'Real Time Study Cases',
];

export default function PriceSection() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthContext();
  const [activeProgram, setActiveProgram] = useState('silver');

  // ✅ EXACT same functionality as Packages.jsx
  const handleProgramClick = async (programId) => {
    if (!isAuthenticated) {
      navigate(paths.login, { replace: true });
      return;
    }

    try {
      const stripe = await stripePromise;

      const response = await fetch(
        'https://us-central1-bspconsult-bcd6e.cloudfunctions.net/createCheckoutSession',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            priceId: PRICE_MAP[programId],
            customerEmail: user?.email,
            platform: 'web',
          }),
        }
      );

      const session = await response.json();

      await stripe.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (error) {
      console.error('Stripe checkout error:', error);
    }
  };

  return (
    <section className="section-price" id="SectionPrice">
      <div className="container-1 mx-auto pl-2 pr-2 text-center mb-65">
        <div className="features-badge">Betting Programs</div>
        <h5 className="heading-h5">Choose Your Program</h5>
        <h2 className="heading-h2">
          There is real opportunity in tennis betting only through structure,
          discipline and a clear strategy.
        </h2>
      </div>

      <div className="price-grid">
        {programs.map((program) => (
          <div
            key={program.id}
            className={`price-card
              ${program.id === 'advanced' ? 'is-featured' : ''}
              ${activeProgram === program.id ? 'is-active' : ''}
            `}
          >
            <div className="price-inner">
              <div className="program-headers">
                <h3 className="program-title">{program.name}</h3>
                {program.id === 'advanced' && (
                  <span className="best-value-badge">Best Value</span>
                )}
              </div>

              <p className="program-desc">{program.description}</p>

              <div className="program-price">
                <span className="price-amount">{program.priceAmount}</span>
                <span className="price-period">{program.pricePeriod}</span>
              </div>

              <div className="program-note">{program.note}</div>

              <button
                type="button"
                className="program-btn"
                onClick={() => handleProgramClick(program.id)}
              >
                {program.button}
              </button>
            </div>

            <div className="program-includes">
              <h4>{program.name.split(' ')[0]} Includes</h4>
              <ul>
                {includes.map((item, i) => (
                  <li
                    key={item}
                    className={i < program.highlightCount ? 'active' : 'inactive'}
                  >
                    <img src="img/check-circle.svg" alt="check" />
                    <span className="include-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
