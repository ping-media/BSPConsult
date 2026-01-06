import { loadStripe } from '@stripe/stripe-js';
// @mui
import { Box, Paper, Container, Typography, Button } from '@mui/material';
import { MotionViewport, varFade } from 'src/components/animate';
import useResponsive from 'src/hooks/useResponsive';
import { useAuthContext } from '../../../auth/useAuthContext';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe("pk_live_51NAUESCf4YXq1rsyBMpbCD1Yqi5kocGdjxYqcqknpppNXXnUKKCVxar7NqInLJRCJTCEVkbqQPppP7nvve8E053I00P0pVQI8d");

// ----------------------------------------------------------------------

export default function Subscriptions() {
  const { user } = useAuthContext();

  const handleSilverSubscription = async (event) => {
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
          priceId: 'price_1OgVTPCf4YXq1rsyGHWrpUI3',
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

  const handleGoldSubscription = async (event) => {
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
          priceId: 'price_1NqWtkCf4YXq1rsyDvmsIWtF',
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

  const isDesktop = useResponsive('up', 'md');
  return (
    <Container
      component={MotionViewport}
      sx={{
        px: 3,
      }}
    >
      <Paper
        sx={{
          borderRadius: 3,
          textAlign: 'center',
          backgroundColor: 'transparent',
          paddingTop: 0,
        }}
      >
        <Box sx={{ mt: 2, mx: 'auto', maxWidth: 1086 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: isDesktop ? 'row' : 'column',
              width: '100%',
              columnGap: isDesktop ? 1 : 0,
              rowGap: isDesktop ? 0 : 1,
              justifyContent: 'center',
            }}
          >
            {/* Silver */}
            <Box
              variants={varFade().inUp}
              sx={{
                flex: 1,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '423px',
                height: '100%',
                pb: 5,
              }}
            >
              <Box
                sx={{
                  backgroundImage: 'linear-gradient(#0867ef, #0d1117)',
                  borderTopLeftRadius: '20px',
                  borderTopRightRadius: '20px',
                  pt: '2px',
                  pl: '2px',
                  pr: '2px',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: '#0d1117',
                    borderRadius: '20px 20px 0 0',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    position: 'relative',
                    width: '200px',
                    height: '90px',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#627083',
                      fontSize: '28px',
                      lineHeight: 1,
                      textDecoration: 'line-through',
                    }}
                  >
                    €850
                  </Typography>
                  <Box
                    sx={{
                      backgroundImage:
                        'linear-gradient(rgba(177, 177, 177, .55), #fff 0%, rgba(235, 235, 235, .88) 58%, rgba(0, 0, 0, 0))',
                      backgroundClip: 'text',
                      fontSize: '50px',
                      color: 'rgb(249, 250, 251)',
                      lineHeight: 1,
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    €397
                  </Box>
                </Box>
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
                    py: 3,
                    textAlign: 'start',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <Box
                      component="img"
                      alt="Logo"
                      src="/assets/images/home/silver_large.png"
                      sx={{
                        width: '75px',
                        height: '75px',
                      }}
                    />
                    <Box
                      sx={{
                        backgroundImage: 'linear-gradient(#0867ef, #0867ef)',
                        borderRadius: '40px',
                        padding: '2px',
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                      }}
                    >
                      <Box
                        sx={{
                          padding: '5px 16px 8px',
                          fontSize: '10px',
                          lineHeight: '16px',
                          color: '#fff',
                          textAlign: 'center',
                          letterSpacing: '2px',
                          backgroundColor: '#0d1117',
                          border: '1px #484d54',
                          borderRadius: '40px',
                          fontWeight: 600,
                        }}
                      >
                        €33/month
                      </Box>
                    </Box>
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{ color: 'primary.contrastText', mt: 3, textAlign: 'start' }}
                  >
                    Silver Program
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'primary.contrastText', mt: 3, textAlign: 'start' }}>
                    Start with Structure.
                  </Typography>
                  <Typography variant="h7" sx={{ color: '#9a9a9a', mt: 3, textAlign: 'start' }}>
                    For bettors who want a simple, disciplined foundation built on structured bets, clear analysis and repeatable execution.
                  </Typography>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      pt: 3,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Structured Bets
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Detailed Bet Analysis
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Tournament Previews
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Live Betting Opportunities
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                        opacity: 0.5,
                      }}
                    />
                    <Typography
                      sx={{
                        px: 1,
                        color: 'primary.contrastText',
                        fontSize: '15px',
                        textDecoration: 'line-through',
                      }}
                    >
                      Tournament Insights (Key Data)
                    </Typography>
                  </Box>

                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                        opacity: 0.5,
                      }}
                    />
                    <Typography
                      sx={{
                        px: 1,
                        color: 'primary.contrastText',
                        fontSize: '15px',
                        textDecoration: 'line-through',
                      }}
                    >
                      BSP Tennis Betting Model
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                        opacity: 0.5,
                      }}
                    />
                    <Typography
                      sx={{
                        px: 1,
                        color: 'primary.contrastText',
                        fontSize: '15px',
                        textDecoration: 'line-through',
                      }}
                    >
                      Essential Video Content
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                        opacity: 0.5,
                      }}
                    />
                    <Typography
                      sx={{
                        px: 1,
                        color: 'primary.contrastText',
                        fontSize: '15px',
                        textDecoration: 'line-through',
                      }}
                    >
                      High-Stakes Betting Frameworks
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                        opacity: 0.5,
                      }}
                    />
                    <Typography
                      sx={{
                        px: 1,
                        color: 'primary.contrastText',
                        fontSize: '15px',
                        textDecoration: 'line-through',
                      }}
                    >
                      BSP Masterclass (20+ Hours of Video)
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                        opacity: 0.5,
                      }}
                    />
                    <Typography
                      sx={{
                        px: 1,
                        color: 'primary.contrastText',
                        fontSize: '15px',
                        textDecoration: 'line-through',
                      }}
                    >
                      Real Time Study Cases
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      background: 'linear-gradient(#047efc, #12488f)',
                      position: 'relative',
                      overflow: 'hidden',
                      width: '100%',
                      height: '48px',
                      borderRadius: '8px',
                      mt: 4,
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
                        fontWeight: 700,
                      }}
                      onClick={handleSilverSubscription}
                    >
                      Get Silver
                      <Box
                        component="img"
                        alt="arrow"
                        src="/assets/images/home/arrow_outward_white.png"
                      />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* Advanced */}
            <Box
              variants={varFade().inUp}
              sx={{
                flex: 1,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '423px',
                height: '100%',
                pb: 5,
              }}
            >
              <Box
                sx={{
                  backgroundImage: 'linear-gradient(#0867ef, #0d1117)',
                  borderTopLeftRadius: '20px',
                  borderTopRightRadius: '20px',
                  pt: '2px',
                  pl: '2px',
                  pr: '2px',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: '#0d1117',
                    borderRadius: '20px 20px 0 0',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    position: 'relative',
                    width: '200px',
                    height: '90px',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#627083',
                      fontSize: '28px',
                      lineHeight: 1,
                      textDecoration: 'line-through',
                    }}
                  >
                    €597
                  </Typography>
                  <Box
                    sx={{
                      backgroundImage:
                        'linear-gradient(rgba(177, 177, 177, .55), #fff 0%, rgba(235, 235, 235, .88) 58%, rgba(0, 0, 0, 0))',
                      backgroundClip: 'text',
                      fontSize: '50px',
                      color: 'rgb(249, 250, 251)',
                      lineHeight: 1,
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    €397
                  </Box>
                </Box>
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
                    py: 3,
                    textAlign: 'start',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <Box
                      component="img"
                      alt="Logo"
                      src="/assets/images/home/gold_large.png"
                      sx={{
                        width: '75px',
                        height: '75px',
                      }}
                    />
                    <Box
                      sx={{
                        backgroundImage: 'linear-gradient(#0867ef, #0867ef)',
                        borderRadius: '40px',
                        padding: '2px',
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                      }}
                    >
                      <Box
                        sx={{
                          padding: '5px 16px 8px',
                          fontSize: '10px',
                          lineHeight: '16px',
                          color: '#fff',
                          textAlign: 'center',
                          letterSpacing: '2px',
                          backgroundColor: '#0d1117',
                          border: '1px #484d54',
                          borderRadius: '40px',
                          fontWeight: 600,
                        }}
                      >
                        Most Valuable
                      </Box>
                    </Box>
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{ color: 'primary.contrastText', mt: 3, textAlign: 'start' }}
                  >
                    Advanced Program
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'primary.contrastText', mt: 3, textAlign: 'start' }}>
                    Bet with a real edge.
                  </Typography>
                  <Typography variant="h7" sx={{ color: '#9a9a9a', mt: 3, textAlign: 'start' }}>
                    For bettors who want structured bets supported by game-changing data context, deeper insight into odds, and the ability to consistently spot mispriced odds.
                  </Typography>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      pt: 3,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Structured Bets
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Detailed Bet Analysis
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Tournament Previews
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Live Betting Opportunities
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Tournament Insights (Key Data)
                    </Typography>
                  </Box>

                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      BSP Tennis Betting Model
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Essential Video Content
                    </Typography>
                  </Box>



                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                        opacity: 0.5,
                      }}
                    />
                    <Typography
                      sx={{
                        px: 1,
                        color: 'primary.contrastText',
                        fontSize: '15px',
                        textDecoration: 'line-through',
                      }}
                    >
                      High-Stakes Betting Frameworks
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                        opacity: 0.5,
                      }}
                    />
                    <Typography
                      sx={{
                        px: 1,
                        color: 'primary.contrastText',
                        fontSize: '15px',
                        textDecoration: 'line-through',
                      }}
                    >
                      BSP Masterclass (20+ Hours of Video)
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                        opacity: 0.5,
                      }}
                    />
                    <Typography
                      sx={{
                        px: 1,
                        color: 'primary.contrastText',
                        fontSize: '15px',
                        textDecoration: 'line-through',
                      }}
                    >
                      Real Time Study Cases
                    </Typography>
                  </Box>


                  {/* <Box variants={varFade().inDown} sx={{display:'flex', flexDirection: 'row', width: '100%', mt: 1, alignItems: 'center'}}>
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                        opacity: 0.5,
                      }}
                    />  
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px'}}>
                      Exclusive coaching program
                    </Typography>
                  </Box> */}
                  <Box
                    sx={{
                      background: 'linear-gradient(#047efc, #12488f)',
                      position: 'relative',
                      overflow: 'hidden',
                      width: '100%',
                      height: '48px',
                      borderRadius: '8px',
                      mt: 4,
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
                        fontWeight: 700,
                      }}
                      onClick={handleGoldSubscription}
                    >
                      Get Advanced
                      <Box
                        component="img"
                        alt="arrow"
                        src="/assets/images/home/arrow_outward_white.png"
                      />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* Gold */}
            <Box
              variants={varFade().inUp}
              sx={{
                flex: 1,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '423px',
                height: '100%',
                pb: 5,
              }}
            >
              <Box
                sx={{
                  backgroundImage: 'linear-gradient(#0867ef, #0d1117)',
                  borderTopLeftRadius: '20px',
                  borderTopRightRadius: '20px',
                  pt: '2px',
                  pl: '2px',
                  pr: '2px',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: '#0d1117',
                    borderRadius: '20px 20px 0 0',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    position: 'relative',
                    width: '200px',
                    height: '90px',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#627083',
                      fontSize: '28px',
                      lineHeight: 1,
                      textDecoration: 'line-through',
                    }}
                  >
                    €997
                  </Typography>
                  <Box
                    sx={{
                      backgroundImage:
                        'linear-gradient(rgba(177, 177, 177, .55), #fff 0%, rgba(235, 235, 235, .88) 58%, rgba(0, 0, 0, 0))',
                      backgroundClip: 'text',
                      fontSize: '50px',
                      color: 'rgb(249, 250, 251)',
                      lineHeight: 1,
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    €397
                  </Box>
                </Box>
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
                    py: 3,
                    textAlign: 'start',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <Box
                      component="img"
                      alt="Logo"
                      src="/assets/images/home/gold_large.png"
                      sx={{
                        width: '75px',
                        height: '75px',
                      }}
                    />
                    <Box
                      sx={{
                        backgroundImage: 'linear-gradient(#0867ef, #0867ef)',
                        borderRadius: '40px',
                        padding: '2px',
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                      }}
                    >
                      <Box
                        sx={{
                          padding: '5px 16px 8px',
                          fontSize: '10px',
                          lineHeight: '16px',
                          color: '#fff',
                          textAlign: 'center',
                          letterSpacing: '2px',
                          backgroundColor: '#0d1117',
                          border: '1px #484d54',
                          borderRadius: '40px',
                          fontWeight: 600,
                        }}
                      >
                        Most Valuable
                      </Box>
                    </Box>
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{ color: 'primary.contrastText', mt: 3, textAlign: 'start' }}
                  >
                    Gold Program
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'primary.contrastText', mt: 3, textAlign: 'start' }}>
                    Operate at the highest level.
                  </Typography>
                  <Typography variant="h7" sx={{ color: '#9a9a9a', mt: 3, textAlign: 'start' }}>
                    For bettors who want to master high-level decision-making, advanced strategies and real-world study cases to operate at their highest potential.
                  </Typography>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      pt: 3,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Structured Bets
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Detailed Bet Analysis
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Tournament Previews
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Live Betting Opportunities
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Tournament Insights (Key Data)
                    </Typography>
                  </Box>

                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      BSP Tennis Betting Model
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Essential Video Content
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      High-Stakes Betting Frameworks
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      BSP Masterclass (20+ Hours of Video)
                    </Typography>
                  </Box>
                  <Box
                    variants={varFade().inDown}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      mt: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px' }}>
                      Real Time Study Cases
                    </Typography>
                  </Box>
                  {/* <Box variants={varFade().inDown} sx={{display:'flex', flexDirection: 'row', width: '100%', mt: 1, alignItems: 'center'}}>
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                        opacity: 0.5,
                      }}
                    />  
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px'}}>
                      Exclusive coaching program
                    </Typography>
                  </Box> */}
                  <Box
                    sx={{
                      background: 'linear-gradient(#047efc, #12488f)',
                      position: 'relative',
                      overflow: 'hidden',
                      width: '100%',
                      height: '48px',
                      borderRadius: '8px',
                      mt: 4,
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
                        fontWeight: 700,
                      }}
                      onClick={handleGoldSubscription}
                    >
                      Get Gold
                      <Box
                        component="img"
                        alt="arrow"
                        src="/assets/images/home/arrow_outward_white.png"
                      />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* <Box variants={varFade().inUp} sx={{
                  flex: 1,
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column', 
                  maxWidth: "423px",
                  height: "100%",
                  pb: 5}}>
              <Box
                sx={{
                  backgroundImage: 'linear-gradient(#0867ef, #0d1117)',
                  borderTopLeftRadius: '20px',
                  borderTopRightRadius: '20px',
                  pt: '2px',
                  pl: '2px',
                  pr: '2px'
                }}>
                <Box
                  sx={{
                    backgroundColor: '#0d1117',
                    borderRadius: '20px 20px 0 0',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    position: 'relative',
                    width: '200px',
                    height: '90px'
                  }}>
                  <Typography variant="h6" sx={{ color: '#627083', fontSize: '28px', lineHeight: 1, textDecoration: 'line-through', height: '28px'}}/>
                  <Box sx={{ backgroundImage: 'linear-gradient(rgba(177, 177, 177, .55), #fff 0%, rgba(235, 235, 235, .88) 58%, rgba(0, 0, 0, 0))', backgroundClip: 'text', fontSize: '50px', color: 'rgb(249, 250, 251)', lineHeight: 1, WebkitTextFillColor: 'transparent'}}>
                    €2900
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
                  borderRadius: '24px',
                  padding: '2px',
                  transition: 'all .2s',
                  position: 'relative',
                  transform: 'none',
                  boxShadow: '0 0 70px rgba(9, 134, 251, .19)'
                }}
              >
                <Box
                  sx={{
                  backgroundColor: '#0d1117',
                  width: '100%',
                  height: '100%',
                  maxHeight: '580px',
                  border: '1px solid rgba(239, 240, 246, .08)',
                  borderRadius: '24px',
                  transition: 'all .2s',
                  position: 'relative',
                  boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
                  px: 3,
                  py: 5,
                  textAlign: 'start'
                }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row'
                    }}>
                    <Box
                      component="img"
                      alt="Logo"
                      src="/assets/images/home/normal_large.png"                  
                      sx={{
                        width: '75px',
                        height: '75px'
                      }}
                    />
                    <Box
                      sx={{
                        backgroundImage: 'linear-gradient(#0867ef, #0867ef)',
                        borderRadius: '40px',
                        padding: '2px',
                        position: 'absolute',
                        top: '14px',
                        right: '14px'
                      }}
                    >
                      <Box
                        sx={{
                          padding: '5px 16px 8px',
                          fontSize: '10px',
                          lineHeight: '16px',
                          color: '#fff',
                          textAlign: 'center',
                          letterSpacing: '2px',
                          backgroundColor: '#0d1117',
                          border: '1px #484d54',
                          borderRadius: '40px',
                          fontWeight: 600
                        }}
                      >
                      3 spots left
                      </Box>
                    </Box>  

                  </Box>
                  <Typography variant="h3" sx={{ color: 'primary.contrastText', mt: 3, textAlign: 'start'}}>
                    Platinum Program
                  </Typography>
                  <Typography variant="h7" sx={{ color: '#9a9a9a', mt: 3, textAlign: 'start'}}>
                    This program offers unlimited possibilities customized during your admission call.
                  </Typography>
                  <Box variants={varFade().inDown} sx={{display:'flex', flexDirection: 'row', width: '100%', pt: 3, alignItems: 'center'}}>
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px'}}>
                      Copy & Paste Concept
                    </Typography>
                  </Box>
                  <Box variants={varFade().inDown} sx={{display:'flex', flexDirection: 'row', width: '100%', mt: 1, alignItems: 'center'}}>
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px',
                      }}
                    />  
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px'}}>
                      Telegram Live Channel
                    </Typography>
                  </Box>
                  <Box variants={varFade().inDown} sx={{display:'flex', flexDirection: 'row', width: '100%', mt: 1, alignItems: 'center'}}>
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px'
                      }}
                    />  
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px'}}>
                      Sports Betting Models
                    </Typography>
                  </Box>
                  <Box variants={varFade().inDown} sx={{display:'flex', flexDirection: 'row', width: '100%', mt: 1, alignItems: 'center'}}>
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px'
                      }}
                    />  
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px'}}>
                      Masterclass Channel
                    </Typography>
                  </Box>
                  <Box variants={varFade().inDown} sx={{display:'flex', flexDirection: 'row', width: '100%', mt: 1, alignItems: 'center'}}>
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px'
                      }}
                    />  
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px'}}>
                      Masterclass 14K strategy
                    </Typography>
                  </Box>
                  <Box variants={varFade().inDown} sx={{display:'flex', flexDirection: 'row', width: '100%', mt: 1, alignItems: 'center'}}>
                    <Box
                      component="img"
                      alt="check"
                      src="/assets/images/home/checkbox.svg"
                      sx={{
                        width: '22px',
                        height: '22px'
                      }}
                    />  
                    <Typography sx={{ px: 1, color: 'primary.contrastText', fontSize: '15px'}}>
                      Exclusive coaching program
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      background: 'linear-gradient(#047efc, #12488f)',
                      position: 'relative',
                      overflow: 'hidden',
                      width: '100%',
                      height: '48px',
                      borderRadius: '8px',
                      mt: 4,
                      ':hover': {
                        opacity: 0.8,
                      }
                    }}>
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
                        fontWeight: 700,
                      }}
                    >
                      <a href="https://calendly.com/bspconsult/platinum-call" style={{ textDecoration: 'none', color: '#FFF'}}>Book your call</a>
                      <Box
                          component="img"
                          alt="arrow"
                          src="/assets/images/home/arrow_outward_white.png"
                        />
                    </Button>
                  </Box>
                  <Typography sx={{ color: '#8a8a8a', fontSize: '13px', mt: 2, textAlign: 'center'}}>
                    Accepting admissions for bankrolls of 15K+ only
                  </Typography>
                </Box>
              </Box>
            </Box> */}
            {/* <Grid variants={varFade().inUp} sx={{
                  flex: 1,
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column', 
                  maxWidth: "423px",
                  height: "100%",
                  backgroundColor: '#1A11355E',
                  borderRadius: 1,
                  px: 3,
                  pb: 4}}>
              <Box
                component="img"
                alt="Silver Large"
                src="/assets/images/home/silver_large.png"
                sx={{
                  pt: 4
                }}
              />
              <Box variants={varFade().inDown} sx={{ mt: 3 }}>
                <Typography variant="h1_extra" sx={{ color: 'primary.contrastText'}}>
                  Silver
                </Typography>
              </Box>
              <Box variants={varFade().inDown}>
                <Typography variant="h5" sx={{ mt: 2, color: 'primary.contrastText', maxWidth: '343px'}}>
                  Join our Silver Membership to effortlessly copy and paste winning bets
                </Typography>
              </Box>
              <Box variants={varFade().inDown} sx={{width: '100%', display:'flex', pt: 3}}>
                <Typography variant="h7" sx={{ px: isDesktop?5:0, color: 'primary.contrastText', textAlign: 'left'}}>
                  What’s Included
                </Typography>
              </Box>
              <Box variants={varFade().inDown} sx={{display:'flex', flexDirection: 'row', px: isDesktop?5:0, width: '100%', pt: 3}}>
                <Box
                  component="img"
                  alt="check"
                  src="/assets/images/home/check.png"
                />
                <Typography variant="h7" sx={{ px: 1, color: 'primary.contrastText', textAlign: 'left'}}>
                  Copy & Paste Concept
                </Typography>
              </Box>
              <Box variants={varFade().inDown} sx={{display:'flex', flexDirection: 'row', px: isDesktop?5:0, width: '100%', marginTop: '20px'}}>
                <Box
                  component="img"
                  alt="check"
                  src="/assets/images/home/check.png"
                />
                <Typography variant="h7" sx={{ px: 1, color: 'primary.contrastText'}}>
                  Telegram Live Channel
                </Typography>
              </Box>
              <Box variants={varFade().inDown} sx={{display:'flex', flexDirection: 'row', px: isDesktop?5:0, width: '100%', marginTop: '20px'}}>
                <Box
                  component="img"
                  alt="check"
                  src="/assets/images/home/check.png"
                />
                <Typography variant="h7" sx={{ px: 1, color: 'primary.contrastText', textAlign: 'left'}}>
                  Sports Betting Models
                </Typography>
              </Box>
              <Box variants={varFade().inDown} sx={{display:'flex', flexDirection: 'row', px: isDesktop?5:0, width: '100%', marginTop: '20px'}}>
                <Box
                  component="img"
                  alt="check"
                  src="/assets/images/home/check_disable.png"
                />
                <Typography variant="h7" sx={{ px: 1, color: 'primary.alphaText', textAlign: 'left', textDecoration: 'line-through'}}>
                  Masterclass Channel
                </Typography>
              </Box>
              <Box variants={varFade().inDown} sx={{display:'flex', flexDirection: 'row', px: isDesktop?5:0, width: '100%', marginTop: '20px'}}>
                <Box
                  component="img"
                  alt="check"
                  src="/assets/images/home/check_disable.png"
                />
                <Typography variant="h7" sx={{ px: 1, color: 'primary.alphaText', textAlign: 'left', textDecoration: 'line-through'}}>
                  Masterclass 14K Strategy
                </Typography>
              </Box>
              <Box variants={varFade().inDown}>
                <Typography variant="h2" sx={{ mt: 3, color: 'primary.contrastText'}}>
                  €397/year
                </Typography>
              </Box>
              <Box variants={varFade().inDown} sx={{ mt: 1}}>
                <Typography variant="h7" sx={{color: 'primary.contrastText'}}>
                  €33/month
                </Typography>
              </Box>
              <Box
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  width: '100%',
                  height: '60px',
                  borderRadius: '8px',
                  mt: 2,
                  pb: 3,
                  background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8}
                }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    zIndex: 1,
                  }}
                >
                  <Button
                    variant="filled"
                    color="inherit"
                    sx={{
                      position: 'relative',
                      zIndex: 2, // Ensure the button text is above the overlay
                      color: '#fff',
                      width: '100%',
                      height: '60px',
                      fontSize: 20,
                      fontWeight: 700,
                    }}
                    onClick={handleSilverSubscription}
                  >
                    Start Now
                    <Box
                        component="img"
                        alt="arrow"
                        src="/assets/images/home/arrow_outward_white.png"
                      />
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid variants={varFade().inUp} sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              maxWidth: "423px",
              height: '100%',
              backgroundColor: '#1A11355E',
              // border: '1px solid #646464',
              borderRadius: 1,
              px: 3,
              pb: 4}}>
               <Box
                component="img"
                alt="Gold Large"
                src="/assets/images/home/gold_large.png"
                sx={{
                  pt: 4
                }}
              />
              <Box variants={varFade().inDown} sx={{ mt: 3 }}>
                <Typography variant="h1_extra" sx={{ color: 'primary.contrastText'}}>
                  Gold
                </Typography>
              </Box>
              <Box variants={varFade().inDown}>
                <Typography variant="h5" sx={{ mt: 2, color: 'primary.contrastText', maxWidth: '343px'}}>
                  Become a tennis betting pro with Gold Membership and master the 14K strategy
                </Typography>
              </Box>
              <Box variants={varFade().inDown} sx={{width: '100%', display:'flex', pt: 3}}>
                <Typography variant="h7" sx={{ px: isDesktop?5:0, color: 'primary.contrastText', textAlign: 'left'}}>
                  What’s Included
                </Typography>
              </Box>
              <Box variants={varFade().inDown} sx={{display:'flex', flexDirection: 'row', px: isDesktop?5:0, width: '100%', pt: 3}}>
                <Box
                  component="img"
                  alt="check"
                  src="/assets/images/home/check.png"
                />
                <Typography variant="h7" sx={{ px: 1, color: 'primary.contrastText', textAlign: 'left'}}>
                  Copy & Paste Concept
                </Typography>
              </Box>
              <Box variants={varFade().inDown} sx={{display:'flex', flexDirection: 'row', px: isDesktop?5:0, width: '100%', marginTop: '20px'}}>
                <Box
                  component="img"
                  alt="check"
                  src="/assets/images/home/check.png"
                />
                <Typography variant="h7" sx={{ px: 1, color: 'primary.contrastText'}}>
                  Telegram Live Channel
                </Typography>
              </Box>
              <Box variants={varFade().inDown} sx={{display:'flex', flexDirection: 'row', px: isDesktop?5:0, width: '100%', marginTop: '20px'}}>
                <Box
                  component="img"
                  alt="check"
                  src="/assets/images/home/check.png"
                />
                <Typography variant="h7" sx={{ px: 1, color: 'primary.contrastText', textAlign: 'left'}}>
                  Sports Betting Models
                </Typography>
              </Box>
              <Box variants={varFade().inDown} sx={{display:'flex', flexDirection: 'row', px: isDesktop?5:0, width: '100%', marginTop: '20px'}}>
                <Box
                  component="img"
                  alt="check"
                  src="/assets/images/home/check.png"
                />
                <Typography variant="h7" sx={{ px: 1, color: 'primary.contrastText', textAlign: 'left'}}>
                  Masterclass Channel
                </Typography>
              </Box>
              <Box variants={varFade().inDown} sx={{display:'flex', flexDirection: 'row', px: isDesktop?5:0, width: '100%', marginTop: '20px'}}>
                <Box
                  component="img"
                  alt="check"
                  src="/assets/images/home/check.png"
                />
                <Typography variant="h7" sx={{ px: 1, color: 'primary.contrastText', textAlign: 'left'}}>
                  Masterclass 14K Strategy
                </Typography>
              </Box>
              <Box variants={varFade().inDown}>
                <Typography variant="h2" sx={{ mt: 3, color: 'primary.contrastText'}}>
                  €997/one time fee
                </Typography>
              </Box>
              <Box variants={varFade().inDown} sx={{ mt: 1}}>
                <Typography variant="h7" sx={{color: 'primary.contrastText'}}>
                  only €397 billed annually from the 2nd year 
                </Typography>
              </Box>
              <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                height: '60px',
                borderRadius: '8px',
                mt: 2,
                pb: 3,
                background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8}
              }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    zIndex: 1,
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
                      height: '60px',
                      fontSize: 20,
                      fontWeight: 700,
                    }}
                    onClick={handleGoldSubscription}
                  >
                    Start Now
                    <Box
                        component="img"
                        alt="arrow"
                        src="/assets/images/home/arrow_outward_white.png"
                      />
                  </Button>
                </Box>
              </Box>
            </Grid> */}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
