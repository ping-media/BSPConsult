// import { loadStripe } from '@stripe/stripe-js';
// // @mui
// import { Box, Paper, Container, Typography, Button } from '@mui/material';
// import { MotionViewport, varFade } from 'src/components/animate';
// import useResponsive from 'src/hooks/useResponsive';
// import { useAuthContext } from '../../../auth/useAuthContext';
// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the Stripe object on every render.
// const stripePromise = loadStripe("pk_live_51NAUESCf4YXq1rsyBMpbCD1Yqi5kocGdjxYqcqknpppNXXnUKKCVxar7NqInLJRCJTCEVkbqQPppP7nvve8E053I00P0pVQI8d");

// // ----------------------------------------------------------------------

// export default function Subscriptions() {
//   const { user } = useAuthContext();

//   const handleSilverSubscription = async (event) => {
//     // Get Stripe.js instance
//     const stripe = await stripePromise;

//     // Call your Firebase function
//     const response = await fetch(
//       'https://us-central1-bspconsult-bcd6e.cloudfunctions.net/createCheckoutSession',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           priceId: 'price_1OgVTPCf4YXq1rsyGHWrpUI3',
//           customerEmail: user?.email,
//           platform: 'web',
//         }),
//       }
//     );

//     const session = await response.json();

//     // When the customer clicks on the button, redirect them to Checkout.
//     const result = await stripe.redirectToCheckout({
//       sessionId: session.id,
//     });

//     if (result.error) {
//       // If `redirectToCheckout` fails due to a browser or network
//       // error, display the localized error message to your customer.
//       console.error(result.error.message);
//     }
//   };

//   const handleGoldSubscription = async (event) => {
//     // Get Stripe.js instance
//     const stripe = await stripePromise;

//     // Call your Firebase function
//     const response = await fetch(
//       'https://us-central1-bspconsult-bcd6e.cloudfunctions.net/createCheckoutSession',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           priceId: 'price_1NqWtkCf4YXq1rsyDvmsIWtF',
//           customerEmail: user?.email,
//           platform: 'web',
//         }),
//       }
//     );

//     const session = await response.json();

//     // When the customer clicks on the button, redirect them to Checkout.
//     const result = await stripe.redirectToCheckout({
//       sessionId: session.id,
//     });

//     if (result.error) {
//       // If `redirectToCheckout` fails due to a browser or network
//       // error, display the localized error message to your customer.
//       console.error(result.error.message);
//     }
//   };

//   const isDesktop = useResponsive('up', 'md');
//   return (
//     <Container
//       component={MotionViewport}
//       sx={{
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
//         <Box sx={{ mt: 2, mx: 'auto', maxWidth: 1086 }}>
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: isDesktop ? 'row' : 'column',
//               width: '100%',
//               columnGap: isDesktop ? 1 : 0,
//               rowGap: isDesktop ? 0 : 1,
//               justifyContent: 'center',
//             }}
//           >
//             {/* Silver */}
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
//                           fontSize: '10px',
//                           lineHeight: '16px',
//                           color: '#fff',
//                           textAlign: 'center',
//                           letterSpacing: '2px',
//                           backgroundColor: '#0d1117',
//                           border: '1px #484d54',
//                           borderRadius: '40px',
//                           fontWeight: 600,
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
//                   <Typography variant="h5" sx={{ color: 'primary.contrastText', mt: 3, textAlign: 'start' }}>
//                     Start with Structure.
//                   </Typography>
//                   <Typography variant="h7" sx={{ color: '#9a9a9a', mt: 3, textAlign: 'start' }}>
//                     For bettors who want a simple, disciplined foundation built on structured bets, clear analysis and repeatable execution.
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
//                       Structured Bets
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
//                       Detailed Bet Analysis
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
//                       Tournament Previews
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
//                       Live Betting Opportunities
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
//                       Tournament Insights (Key Data)
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
//                       Essential Video Content
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
//                       High-Stakes Betting Frameworks
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
//                       BSP Masterclass (20+ Hours of Video)
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
//                       Real Time Study Cases
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
//                       Get Silver
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
//             {/* Advanced */}
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
//                     €597
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
//                           fontSize: '10px',
//                           lineHeight: '16px',
//                           color: '#fff',
//                           textAlign: 'center',
//                           letterSpacing: '2px',
//                           backgroundColor: '#0d1117',
//                           border: '1px #484d54',
//                           borderRadius: '40px',
//                           fontWeight: 600,
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
//                     Advanced Program
//                   </Typography>
//                   <Typography variant="h5" sx={{ color: 'primary.contrastText', mt: 3, textAlign: 'start' }}>
//                     Bet with a real edge.
//                   </Typography>
//                   <Typography variant="h7" sx={{ color: '#9a9a9a', mt: 3, textAlign: 'start' }}>
//                     For bettors who want structured bets supported by game-changing data context, deeper insight into odds, and the ability to consistently spot mispriced odds.
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
//                       Structured Bets
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
//                       Detailed Bet Analysis
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
//                       Tournament Previews
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
//                       Live Betting Opportunities
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
//                       Tournament Insights (Key Data)
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
//                       Essential Video Content
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
//                       High-Stakes Betting Frameworks
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
//                       BSP Masterclass (20+ Hours of Video)
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
//                       Real Time Study Cases
//                     </Typography>
//                   </Box>


//                   {/* <Box variants={varFade().inDown} sx={{display:'flex', flexDirection: 'row', width: '100%', mt: 1, alignItems: 'center'}}>
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
//                     <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px'}}>
//                       Exclusive coaching program
//                     </Typography>
//                   </Box> */}
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
//                       Get Advanced
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
//             {/* Gold */}
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
//                     €997
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
//                           fontSize: '10px',
//                           lineHeight: '16px',
//                           color: '#fff',
//                           textAlign: 'center',
//                           letterSpacing: '2px',
//                           backgroundColor: '#0d1117',
//                           border: '1px #484d54',
//                           borderRadius: '40px',
//                           fontWeight: 600,
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
//                   <Typography variant="h5" sx={{ color: 'primary.contrastText', mt: 3, textAlign: 'start' }}>
//                     Operate at the highest level.
//                   </Typography>
//                   <Typography variant="h7" sx={{ color: '#9a9a9a', mt: 3, textAlign: 'start' }}>
//                     For bettors who want to master high-level decision-making, advanced strategies and real-world study cases to operate at their highest potential.
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
//                       Structured Bets
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
//                       Detailed Bet Analysis
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
//                       Tournament Previews
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
//                       Live Betting Opportunities
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
//                       Tournament Insights (Key Data)
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
//                       Essential Video Content
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
//                       High-Stakes Betting Frameworks
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
//                       BSP Masterclass (20+ Hours of Video)
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
//                       Real Time Study Cases
//                     </Typography>
//                   </Box>
//                   {/* <Box variants={varFade().inDown} sx={{display:'flex', flexDirection: 'row', width: '100%', mt: 1, alignItems: 'center'}}>
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
//                     <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px'}}>
//                       Exclusive coaching program
//                     </Typography>
//                   </Box> */}
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
//                       Get Gold
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
/* eslint-disable no-nested-ternary */


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

// 🔹 Map program → Stripe Price ID
const PRICE_MAP = {
  silver: 'price_1OgVTPCf4YXq1rsyGHWrpUI3',
  advanced: 'price_1SgyrmCf4YXq1rsyFk0I3ljo',
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

const UPGRADE_PRICING = {
  silver: {
    advanced: {
      priceAmount: '€597',
      priceId: 'price_1SgyrmCf4YXq1rsyFk0I3ljo',
    },
    gold: {
      priceAmount: '€997',
      priceId: 'price_1NqWtkCf4YXq1rsyDvmsIWtF',
    },
  },
  advanced: {
    gold: {
      priceAmount: '€997',
      priceId: 'price_1NqWtkCf4YXq1rsyDvmsIWtF',
    },
  },
};


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

export default function Subscriptions() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthContext();
  const [activeProgram, setActiveProgram] = useState('silver');

  // 🔐 Membership helpers (same logic as Profile)
const MEMBERSHIP = {
  NONE: '1',
  SILVER: '8',
  ADVANCED: '9',
  GOLD: '10',
};

const membership = user?.membership ?? MEMBERSHIP.NONE;

const isSilver = membership === MEMBERSHIP.SILVER;
const isAdvanced = membership === MEMBERSHIP.ADVANCED;
const isGold = membership === MEMBERSHIP.GOLD;

const currentPlan =
  isSilver ? 'silver' :
  isAdvanced ? 'advanced' :
  null;


// hierarchy: gold > advanced > silver
const PLAN_RANK = {
  silver: 1,
  advanced: 2,
  gold: 3,
};

const USER_RANK = isGold ? 3 : isSilver ? 1 : 0;

// disable if user already owns this or higher plan
const isDisabled = (programId) =>
  USER_RANK >= PLAN_RANK[programId];

const getProgramPricing = (programId) => {
  // Upgrade case (Silver → Advanced / Gold, Advanced → Gold)
  if (currentPlan && UPGRADE_PRICING[currentPlan]?.[programId]) {
    return UPGRADE_PRICING[currentPlan][programId];
  }

  // Default/base pricing
  return {
    priceAmount: programs.find(p => p.id === programId).priceAmount,
    priceId: PRICE_MAP[programId],
  };
};


  const handleProgramClick = async (programId) => {
  if (!isAuthenticated) {
    navigate(paths.login, { replace: true });
    return;
  }

  try {
    const stripe = await stripePromise;

    // ✅ ALWAYS use dynamic pricing
    const pricing = getProgramPricing(programId);

    const response = await fetch(
      'https://us-central1-bspconsult-bcd6e.cloudfunctions.net/createCheckoutSession',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: pricing.priceId, // ✅ FIXED
          customerEmail: user?.email,
          platform: 'web',
          upgrade: true,
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
    <section className="section-prices" id="SectionPrice">
      

    <div className="price-grid">
  {programs.map((program) => {
    const pricing = getProgramPricing(program.id);

    return (
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
            <span className="price-amount">{pricing.priceAmount}</span>
            <span className="price-period">{program.pricePeriod}</span>
          </div>

          <div className="program-note">{program.note}</div>

          <button
            type="button"
            className={`program-btn ${isDisabled(program.id) ? 'is-disabled' : ''}`}
            disabled={isDisabled(program.id)}
            onClick={() => handleProgramClick(program.id)}
          >
            {isDisabled(program.id)
              ? program.id === 'silver' && isSilver
                ? 'Current Plan'
                : program.id === 'gold' && isGold
                  ? 'Current Plan'
                  : 'Already Included'
              : program.button}
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
    );
  })}
</div>

    </section>
  );
}