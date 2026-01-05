import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
// @mui
import { Box, Paper, Container, Typography, Button, InputAdornment, Backdrop, CircularProgress, Snackbar, Alert, IconButton, Stack, Dialog, TextField, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
// components
import { MotionViewport } from 'src/components/animate';
import useResponsive from 'src/hooks/useResponsive';
import { paths } from 'src/routes/paths';
import { useSnackbar } from 'notistack';
import { useAuthContext } from '../../../auth/useAuthContext';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const isDesktop = useResponsive('up', 'md');
  
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { login, resetPassword } = useAuthContext();

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);

  const [email, setEmail] = useState("");

  const onSnackbarAction = (color, anchor) => {
    enqueueSnackbar(`Password reset email sent successfully!`, {
      variant: color,
      anchorOrigin: anchor,
    });
  };

  const handleBack = () => {
    navigate('/', { replace: false });
  }
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const handleChangeEmail= (e) => {
    setEmail(e.target.value);
  }

  const onResetPassword = async (e) => {
    if (resetPassword) {
      setLoadingResetPassword(true);
      await resetPassword(email);
      setLoadingResetPassword(false);
      handleCloseDialog();
      onSnackbarAction('default', {
        vertical: 'bottom',
        horizontal: 'center',
      })
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password should be of minimum 6 characters length'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit
  } = methods;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
     try {
      handleOpen();
      if (login) {
        await login(data.email, data.password);
        handleClose();
        navigate(paths.home, { replace: true });
      }
    } catch (error) {
      handleClose();
      handleOpenAlert();
    }
  };

  return (
    <Container
      component={MotionViewport}
      sx={{ display: 'flex', height: '100%' }}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
          autoHideDuration={3000}
        >
          Email or Password is wrong. Please enter correct email and password.
        </Alert>
      </Snackbar>
      <Dialog open={openDialog} onClose={handleCloseDialog}
        PaperProps={{
          style: {
            minWidth: global.innerWidth < 400 ? global.innerWidth - 20 : 400,
            background: '#0d1117',
            border: '2px solid #076af478'
          },
        }}>
        <DialogTitle sx={{ color: '#FFF' }}>Reset Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            type="email"
            margin="dense"
            label="Email Address"
            name="email"
            onChange={(e) => handleChangeEmail(e)}
            sx={{
              input: {
                color: "#FFF",
              },
              label: {
                  color: "#FFF !important",
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" sx={{ color: '#FFF', backgroundColor: 'transparent'}} onClick={() => handleCloseDialog()}>
            Cancel
          </Button>
          <LoadingButton loading={loadingResetPassword} variant="contained" sx={{background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8}}} onClick={(e) => onResetPassword(e)}>
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Paper
        sx={{
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          mx: 'auto',
          width: '624px',
          borderRadius: 4,
          border: '2px solid #076af478',
          height: '475px',
          alignSelf: 'center'
        }}
      >
        <Box sx={{width: '100%', display: 'flex' }}>
          <Box sx={{ flex: 1, ml: isDesktop?8:6 }}/>
          <Box
            component="img"
            alt="logo"
            src="/assets/images/home/logo.png"
            sx={{
              mx: 'auto',
              mt: 5
            }}
          />
          <Box sx={{ flex: 1 }}/>
          <CloseIcon sx={{ width: '32px', height: '32px', mt: 3, mr: isDesktop?4:2, cursor: 'pointer' }} onClick={handleBack}/>
        </Box>
        <Box
          sx={{
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            mx: isDesktop?3:0,
            borderRadius: 2,
            height: '280px',
            mt: 3,
            display: 'flex',
            flexDirection: 'column',
            px: 2,
            pt: 4,
          }}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} alignItems="flex-end">
              <RHFTextField name="email" label="Email address"  
              sx={{
                input: {
                  color: "#FFF",
                },
                // backgroundColor: 'rgb(129 182 221 / 21%)',
                borderRadius: 1
              }}
              />
              <RHFTextField
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                sx={{
                  input: {
                    color: "#FFF",
                  },
                  // backgroundColor: 'rgb(129 182 221 / 21%)',
                  borderRadius: 1
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} sx={{ color: '#FFF' }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            <Button
            sx={{ color: 'primary.contrastText'}}
            onClick={() => handleOpenDialog()}>
              Forgot Password?
            </Button>
              
            <Button fullWidth
              color="inherit"
              size="large"
              type="submit"
              variant="contained" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3, minHeight: isDesktop?'56px':'48px', background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8} }}>
              Sign In
            </Button>
            </Stack>
          </FormProvider>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#d7d5d7', textAlign: 'center', fontWeight: 'light' }}>
            New here?
          </Typography>
          <Typography variant="subtitle2" sx={{ color: '#FFF', textAlign: 'center', ml: 1 }}>
            <a href={paths.register} style={{ textDecoration: 'none', color: '#FFF'}}>
              Create an account
            </a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
