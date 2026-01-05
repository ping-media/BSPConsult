import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box, Container, Typography, Button, Card, CardContent, Dialog, TextField, DialogTitle, DialogContent, DialogActions, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MotionViewport } from 'src/components/animate';
import { useAuthContext } from '../../../auth/useAuthContext';
// ----------------------------------------------------------------------

export default function Profile({onChange}) {
  const { user, updateBankroll, resetPassword, deleteAccount } = useAuthContext();

  Profile.propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  const [openBankroll, setOpenBankroll] = useState(false);
  const [bankroll, setBankroll] = useState(user?.bankroll);
  const [stakingStrategy, setStakingStrategy] = useState(user?.stakingStrategy);
  const [loadingBankroll, setLoadingBankroll] = useState(false);

  const [deletAccountRequest, setDeletAccount] = useState(false);

  const [openResetPassword, setOpenResetPassword] = useState(false);
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);

  const handleSubscription = () => {
    onChange(user?.membership);
  }

  const handleOpenBankroll = () => {
    setOpenBankroll(true);
  }

  const handleCloseBankroll = () => {
    setOpenBankroll(false);
  }

  const handleChangeBankroll = (e) => {
    setBankroll(e.target.value);
  }
  const handleChangeStakingStrategy = (e) => {
    setStakingStrategy(e.target.value);
  }

  const onChangeBankroll = async () => {
    setLoadingBankroll(true);
    await updateBankroll(bankroll, stakingStrategy, user?.uid);
    handleCloseBankroll();
    setLoadingBankroll(false);
  }

  const handleOpenDeleteAccountRequest = () => {
    setDeletAccount(true);
  }
  const handleCloseDeleteAccountRequest = () => {
    setDeletAccount(false);
  }
  const handleOpenResetPassword = () => {
    setOpenResetPassword(true);
  }

  const handleCloseResetPassword = () => {
    setOpenResetPassword(false);
  }

  const onConfirmResetPassword = async () => {
    setLoadingResetPassword(true);
    await resetPassword(user?.email);
    setLoadingResetPassword(false);
    handleCloseResetPassword();
  }
  const onConfirmDeleteAccount = async () => {
    setLoadingResetPassword(true);
    await deleteAccount(user?.email);
    setLoadingResetPassword(false);
    handleCloseDeleteAccountRequest();
  }

  return (
    <Container
      component={MotionViewport}
      sx={{
        px: 3
      }}
    >
      <Dialog open={openBankroll} onClose={handleCloseBankroll}
        PaperProps={{
          style: {
            minWidth: '400px',
            background: '#0d1117',
            border: '2px solid #076af478'
          },
        }}>
        <DialogTitle sx={{ color: '#FFF' }}>Change your bankroll</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            type="email"
            margin="dense"
            label="Bankroll"
            name="email"
            value={bankroll} 
            onChange={(e) => handleChangeBankroll(e)}
            sx={{
              input: {
                color: "#FFF",
              },
              label: {
                  color: "#FFF !important",
              }
            }}
          />
          <TextField
            select
            fullWidth
            margin="dense"
            label="Staking Strategy"
            value={stakingStrategy}
            onChange={(e) => handleChangeStakingStrategy(e)}
            SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  backgroundColor: '#0d1117',
                  '& .MuiMenuItem-root': {
                    color: '#FFF',
                    '&:hover': {
                      backgroundColor: 'rgba(7, 106, 244, 0.2)',
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(7, 106, 244, 0.3)',
                      '&:hover': {
                        backgroundColor: 'rgba(7, 106, 244, 0.4)',
                      }
                    }
                  }
                }
              }
            }
          }}
            sx={{
              mt: 2,
              '& .MuiSelect-select': {
                color: '#FFF',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#FFF !important',
              },
              '& .MuiSvgIcon-root': {
                color: '#FFF',
              }
            }}
          >
            <MenuItem value="Conservative">Conservative</MenuItem>
            <MenuItem value="Balanced">Balanced</MenuItem>
            <MenuItem value="Aggressive">Aggressive</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" sx={{ color: '#FFF', backgroundColor: 'transparent'}} onClick={() => handleCloseBankroll()}>
            Cancel
          </Button>
          <LoadingButton loading={loadingBankroll} variant="contained" sx={{background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8}}} onClick={() => onChangeBankroll()}>
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Dialog open={deletAccountRequest} onClose={handleCloseDeleteAccountRequest}
        PaperProps={{
          style: {
            minWidth: '400px',
            maxWidth: '400px',
            background: '#0d1117',
            border: '2px solid #076af478'
          },
        }}>
        <DialogTitle sx={{ color: '#FFF' }}>Delete Account</DialogTitle>
        <DialogContent>
          <Typography variant="h7" sx={{ color: '#FFF' }}>
          Are you sure you want to delete your account?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" sx={{ color: '#FFF', backgroundColor: 'transparent'}} onClick={() => handleCloseDeleteAccountRequest()}>
            Cancel
          </Button>
          <LoadingButton loading={loadingResetPassword} variant="contained" sx={{background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8}}} onClick={() => onConfirmDeleteAccount()}>
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Dialog open={openResetPassword} onClose={handleCloseResetPassword}
        PaperProps={{
          style: {
            minWidth: '400px',
            maxWidth: '400px',
            background: '#0d1117',
            border: '2px solid #076af478'
          },
        }}>
        <DialogTitle sx={{ color: '#FFF' }}>Reset Password</DialogTitle>
        <DialogContent>
          <Typography variant="h7" sx={{ color: '#FFF' }}>
          Are you sure you would like to get an email at {user?.email}  to reset your password?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" sx={{ color: '#FFF', backgroundColor: 'transparent'}} onClick={() => handleCloseResetPassword()}>
            Cancel
          </Button>
          <LoadingButton loading={loadingResetPassword} variant="contained" sx={{background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8}}} onClick={() => onConfirmResetPassword()}>
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
          <Card sx={{ boxShadow: '0 2px 7px rgba(20, 20, 43, .06)', backgroundColor: '#0d1117', border: '1px solid rgba(239, 240, 246, .08)', borderRadius: 3,}}>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#FFF' }}>
                Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                <Typography variant="h7" sx={{ color: '#FFF', minWidth: '90px', textAlign: 'start' }}>
                  Username
                </Typography>
                <Box sx={{ flex: 1 }}/>
                <Typography variant="h7" sx={{ color: '#FFF', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.username}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                <Typography variant="h7" sx={{ color: '#FFF', minWidth: '90px', textAlign: 'start' }}>
                  E-mail
                </Typography>
                <Box sx={{ flex: 1 }}/>
                <Typography variant="h7" sx={{ color: '#FFF', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.email}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                <Typography variant="h7" sx={{ color: '#FFF' }}>
                  Password
                </Typography>
                <Box sx={{ flex: 1 }}/>
                <Button variant="h7" sx={{ color: '#0194fb', padding: 0, ':hover': {
                          backgroundColor: 'transparent'} }} onClick={() => handleOpenResetPassword()}>
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
          <Card sx={{ boxShadow: '0 2px 7px rgba(20, 20, 43, .06)', backgroundColor: '#0d1117', border: '1px solid rgba(239, 240, 246, .08)', borderRadius: 3,}}>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#FFF' }}>
                Premium
              </Typography>
              { user?.membership === '8' || user?.membership === '10'?
              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, justifyContent: 'center' }}>
                {
                  user?.membership === '8'?
                  <>
                <Box
                  component="img"
                  alt="Silver"
                  src="/assets/images/home/silver_large.png"  
                  sx= {{
                    width: '40px',
                    height: '40px'
                  }}
                />
                <Typography variant="h5" sx={{ color: '#FFF', fontWeight: '600', ml: 2, lineHeight: '2' }}>
                  Silver
                </Typography>
                </>:
                <>
                <Box
                  component="img"
                  alt="Silver"
                  src="/assets/images/home/gold_large.png"  
                  sx= {{
                    width: '40px',
                    height: '40px'
                  }}
                />
                <Typography variant="h5" sx={{ color: '#FFF', fontWeight: '600', ml: 2, lineHeight: '2' }}>
                  Gold
                </Typography>
                </>
                }
                </Box>
              : ''}
              { user?.membership === '8' || user?.membership === '1'?
              <Button onClick={() => handleSubscription()} sx={{ color: 'primary.contrastText', height: '45px', background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8}, minWidth: '220px', mt: 2 }}>
                  {user?.membership === '8'? 'Upgrade my subscription': 'Choose my subscription' }
              </Button>
              :''}
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
          <Card sx={{ boxShadow: '0 2px 7px rgba(20, 20, 43, .06)', backgroundColor: '#0d1117', border: '1px solid rgba(239, 240, 246, .08)', borderRadius: 3,}}>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#FFF' }}>
                Risk Managment
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }} onClick={() => handleOpenBankroll()}>
                <Typography variant="h7" sx={{ color: '#FFF' }}>
                  Bankroll
                </Typography>
                <Box sx={{ flex: 1 }}/>
                <Typography variant="h7" sx={{ color: '#FFF' }}>
                {user?.bankroll} €
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }} onClick={() => handleOpenBankroll()}>
                <Typography variant="h7" sx={{ color: '#FFF' }}>
                  Staking Strategy
                </Typography>
                <Box sx={{ flex: 1 }}/>
                <Typography variant="h7" sx={{ color: '#FFF' }}>
                {user?.stakingStrategy}
                </Typography>
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
          <Card sx={{ boxShadow: '0 2px 7px rgba(20, 20, 43, .06)', backgroundColor: '#0d1117', border: '1px solid rgba(239, 240, 246, .08)', borderRadius: 3,}}>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#FFF' }}>
                Free Training
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, alignItems: 'center' }}>
                <Box
                  component="img"
                  alt="Logo"
                  src="/assets/images/home/normal_large.png"  
                  sx= {{
                    width: '28px',
                    height: '28px'
                  }}
                />
                <Typography variant="h7" sx={{ color: '#FFF', lineHeight: '2.5', ml: 2 }}>
                  <a href="https://bspconsult.myclickfunnels.com/sports-betting?new_run=true" style={{ textDecoration: 'none', color: '#FFF'}}>
                    Strategy Models
                  </a>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Box
                  component="img"
                  alt="Gold"
                  src="/assets/images/home/gold_large.png"  
                  sx= {{
                    width: '28px',
                    height: '28px'
                  }}
                />
                <Typography variant="h7" sx={{ color: '#FFF', lineHeight: '2.5', ml: 2 }}>
                  <a href="https://bspconsult.myclickfunnels.com/masterclass-14k-strategy?new_run=true" style={{ textDecoration: 'none', color: '#FFF'}}>
                    Strategy Masterclass
                  </a>
                </Typography>
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
          <Card sx={{ boxShadow: '0 2px 7px rgba(20, 20, 43, .06)', backgroundColor: '#0d1117', border: '1px solid rgba(239, 240, 246, .08)', borderRadius: 3,}}>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#FFF' }}>
                Contact us
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                <Box
                  component="img"
                  alt="Logo"
                  src="/assets/images/home/instagram.svg"  
                  sx= {{
                    width: '28px',
                    height: '28px'
                  }}
                />
                <Typography variant="h7" sx={{ color: '#FFF', lineHeight: '1.5', ml: 2 }}>
                  <a 
                    href="https://www.instagram.com/bspconsult?igsh=NW9kd252bjk2a3ls&utm_source=qr" 
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: '#FFF'}}
                  >
                    Instagram
                  </a>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                <Box
                  component="img"
                  alt="Gold"
                  src="/assets/images/home/snapchat.svg"  
                  sx= {{
                    width: '28px',
                    height: '28px'
                  }}
                />
                <Typography variant="h7" sx={{ color: '#FFF', lineHeight: '1.5', ml: 2 }}>
                  <a 
                    href="https://t.snapchat.com/lPLA1XMl" 
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: '#FFF'}}
                  >
                    Snapchat
                  </a>
                </Typography>
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
          <Card sx={{ boxShadow: '0 2px 7px rgba(20, 20, 43, .06)', backgroundColor: '#0d1117', border: '1px solid rgba(239, 240, 246, .08)', borderRadius: 3,}}>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#FFF' }}>
                Account
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                <Box
                  component="img"
                  alt="Logo"
                  src="/assets/images/home/terms.png"  
                  sx= {{
                    width: '28px',
                    height: '28px'
                  }}
                />
                <Typography variant="h7" sx={{ color: '#FFF', lineHeight: '1.5', ml: 2 }}>
                  <a 
                    href="/terms-and-conditions" 
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: '#FFF'}}
                  >
                    Terms of Service
                  </a>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                <Box
                  component="img"
                  alt="Gold"
                  src="/assets/images/home/policy.png"  
                  sx= {{
                    width: '28px',
                    height: '28px'
                  }}
                />
                <Typography variant="h7" sx={{ color: '#FFF', lineHeight: '1.5', ml: 2 }}>
                  <a 
                    href="/privacy-policy" 
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: '#FFF'}}
                  >
                    Privacy Policy
                  </a>
                </Typography>
              </Box>
              <Button onClick={() => handleOpenDeleteAccountRequest()} sx={{ color: 'primary.contrastText', height: '45px', background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8}, minWidth: '220px', mt: 2 }}>
                  Delete my account
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
