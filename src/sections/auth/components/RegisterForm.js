import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Box, Paper, Container, Typography, Button, IconButton, InputAdornment, Stack, Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material';
import Iconify from 'src/components/iconify';
import CloseIcon from '@mui/icons-material/Close';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// components
import { MotionViewport } from 'src/components/animate';
import useResponsive from 'src/hooks/useResponsive';
import { paths } from 'src/routes/paths';
import { useAuthContext } from '../../../auth/useAuthContext';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const isDesktop = useResponsive('up', 'md');
  
  const navigate = useNavigate();

  const { register } = useAuthContext();

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  
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

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    userName: Yup.string()
      .required('Full name is required')
      .min(6, 'Mininum 6 characters')
      .max(15, 'Maximum 15 characters'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password should be of minimum 6 characters length'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], "Password's not match"),
  });

  const defaultValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit
  } = methods;

  const onSubmit = async (data) => {
    try {
      handleOpen();
      if (register) {
        await register(data.email, data.password, data.userName);
        handleClose();
        navigate(paths.lock, { replace: true });
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
      <Paper
        sx={{
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          mx: 'auto',
          width: '624px',
          borderRadius: 4,
          border: '2px solid #076af478',
          height: 'max-content',
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
            mx: isDesktop?3:0,
            borderRadius: 2,
            mt: 3,
            display: 'flex',
            flexDirection: 'column',
            px: 2,
            pt: 5,
          }}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5}>
              <RHFTextField name="userName" label="Username"
               sx={{
                input: {
                  color: "#FFF",
                },
                borderRadius: 1
              }} />

              <RHFTextField name="email" label="Email address" 
               sx={{
                input: {
                  color: "#FFF",
                },
                borderRadius: 1
              }}/>
              <RHFTextField
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                sx={{
                  input: {
                    color: "#FFF",
                  },
                  borderRadius: 1
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} sx={{ color: '#FFF' }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <RHFTextField
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                sx={{
                  input: {
                    color: "#FFF",
                  },
                  borderRadius: 1
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} sx={{ color: '#FFF' }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3, minHeight: isDesktop?'56px':'48px', background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8} }}>
                Create Account
              </Button>
            </Stack>
          </FormProvider>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: 3, mb: 4 }}>
          <Typography variant="subtitle2" sx={{ color: '#d7d5d7', textAlign: 'center', fontWeight: 'light' }}>
            Already have an account?
          </Typography>
          <Typography variant="subtitle2" sx={{ color: '#FFF', textAlign: 'center', ml: 1 }}>
            <a href={paths.login} style={{ textDecoration: 'none', color: '#FFF'}}>
                Sign In
            </a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
