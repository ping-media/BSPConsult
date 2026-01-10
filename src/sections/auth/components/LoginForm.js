// import * as Yup from 'yup';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useState } from 'react';
// import FormProvider, { RHFTextField } from 'src/components/hook-form';
// import Iconify from 'src/components/iconify';
// // @mui
// import { Box, Paper, Container, Typography, Button, InputAdornment, Backdrop, CircularProgress, Snackbar, Alert, IconButton, Stack, Dialog, TextField, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// import CloseIcon from '@mui/icons-material/Close';
// // components
// import { MotionViewport } from 'src/components/animate';
// import useResponsive from 'src/hooks/useResponsive';
// import { paths } from 'src/routes/paths';
// import { useSnackbar } from 'notistack';
// import { useAuthContext } from '../../../auth/useAuthContext';
// // ----------------------------------------------------------------------

// export default function LoginForm() {
//   const isDesktop = useResponsive('up', 'md');
  
//   const navigate = useNavigate();

//   const { enqueueSnackbar } = useSnackbar();

//   const { login, resetPassword } = useAuthContext();

//   const [open, setOpen] = useState(false);
//   const [openAlert, setOpenAlert] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [loadingResetPassword, setLoadingResetPassword] = useState(false);

//   const [email, setEmail] = useState("");

//   const onSnackbarAction = (color, anchor) => {
//     enqueueSnackbar(`Password reset email sent successfully!`, {
//       variant: color,
//       anchorOrigin: anchor,
//     });
//   };

//   const handleBack = () => {
//     navigate('/', { replace: false });
//   }
  
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleCloseAlert = () => {
//     setOpenAlert(false);
//   };
//   const handleOpenAlert = () => {
//     setOpenAlert(true);
//   };

//   const handleOpenDialog = () => {
//     setOpenDialog(true);
//   }

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   }

//   const handleChangeEmail= (e) => {
//     setEmail(e.target.value);
//   }

//   const onResetPassword = async (e) => {
//     if (resetPassword) {
//       setLoadingResetPassword(true);
//       await resetPassword(email);
//       setLoadingResetPassword(false);
//       handleCloseDialog();
//       onSnackbarAction('default', {
//         vertical: 'bottom',
//         horizontal: 'center',
//       })
//     }
//   }

//   const [showPassword, setShowPassword] = useState(false);

//   const LoginSchema = Yup.object().shape({
//     email: Yup.string().required('Email is required').email('Email must be a valid email address'),
//     password: Yup.string()
//       .required('Password is required')
//       .min(6, 'Password should be of minimum 6 characters length'),
//   });

//   const defaultValues = {
//     email: '',
//     password: '',
//   };

//   const methods = useForm({
//     resolver: yupResolver(LoginSchema),
//     defaultValues,
//   });

//   const {
//     handleSubmit
//   } = methods;

//   const handleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const onSubmit = async (data) => {
//      try {
//       handleOpen();
//       if (login) {
//         await login(data.email, data.password);
//         handleClose();
//         navigate(paths.home, { replace: true });
//       }
//     } catch (error) {
//       handleClose();
//       handleOpenAlert();
//     }
//   };

//   return (
//     <Container
//       component={MotionViewport}
//       sx={{ display: 'flex', height: '100%' }}
//     >
//       <Backdrop
//         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={open}
//         onClick={handleClose}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>
//       <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}
//           anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//         <Alert
//           onClose={handleCloseAlert}
//           severity="error"
//           variant="filled"
//           sx={{ width: '100%' }}
//           autoHideDuration={3000}
//         >
//           Email or Password is wrong. Please enter correct email and password.
//         </Alert>
//       </Snackbar>
//       <Dialog open={openDialog} onClose={handleCloseDialog}
//         PaperProps={{
//           style: {
//             minWidth: global.innerWidth < 400 ? global.innerWidth - 20 : 400,
//             background: '#0d1117',
//             border: '2px solid #076af478'
//           },
//         }}>
//         <DialogTitle sx={{ color: '#FFF' }}>Reset Password</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             fullWidth
//             type="email"
//             margin="dense"
//             label="Email Address"
//             name="email"
//             onChange={(e) => handleChangeEmail(e)}
//             sx={{
//               input: {
//                 color: "#FFF",
//               },
//               label: {
//                   color: "#FFF !important",
//               }
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button color="inherit" sx={{ color: '#FFF', backgroundColor: 'transparent'}} onClick={() => handleCloseDialog()}>
//             Cancel
//           </Button>
//           <LoadingButton loading={loadingResetPassword} variant="contained" sx={{background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8}}} onClick={(e) => onResetPassword(e)}>
//             Confirm
//           </LoadingButton>
//         </DialogActions>
//       </Dialog>
//       <Paper
//         sx={{
//           textAlign: 'center',
//           backgroundColor: 'rgba(0, 0, 0, 0)',
//           mx: 'auto',
//           width: '624px',
//           borderRadius: 4,
//           border: '2px solid #076af478',
//           height: '475px',
//           alignSelf: 'center'
//         }}
//       >
//         <Box sx={{width: '100%', display: 'flex' }}>
//           <Box sx={{ flex: 1, ml: isDesktop?8:6 }}/>
//           <Box
//             component="img"
//             alt="logo"
//             src="/assets/images/home/logo.png"
//             sx={{
//               mx: 'auto',
//               mt: 5
//             }}
//           />
//           <Box sx={{ flex: 1 }}/>
//           <CloseIcon sx={{ width: '32px', height: '32px', mt: 3, mr: isDesktop?4:2, cursor: 'pointer' }} onClick={handleBack}/>
//         </Box>
//         <Box
//           sx={{
//             textAlign: 'center',
//             backgroundColor: 'rgba(0, 0, 0, 0)',
//             mx: isDesktop?3:0,
//             borderRadius: 2,
//             height: '280px',
//             mt: 3,
//             display: 'flex',
//             flexDirection: 'column',
//             px: 2,
//             pt: 4,
//           }}
//         >
//           <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
//             <Stack spacing={2} alignItems="flex-end">
//               <RHFTextField name="email" label="Email address"  
//               sx={{
//                 input: {
//                   color: "#FFF",
//                 },
//                 // backgroundColor: 'rgb(129 182 221 / 21%)',
//                 borderRadius: 1
//               }}
//               />
//               <RHFTextField
//                 name="password"
//                 label="Password"
//                 type={showPassword ? 'text' : 'password'}
//                 sx={{
//                   input: {
//                     color: "#FFF",
//                   },
//                   // backgroundColor: 'rgb(129 182 221 / 21%)',
//                   borderRadius: 1
//                 }}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={handleShowPassword} edge="end">
//                         <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} sx={{ color: '#FFF' }} />
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             <Button
//             sx={{ color: 'primary.contrastText'}}
//             onClick={() => handleOpenDialog()}>
//               Forgot Password?
//             </Button>
              
//             <Button fullWidth
//               color="inherit"
//               size="large"
//               type="submit"
//               variant="contained" sx={{ color: 'primary.contrastText', textAlign: 'left', mt: 3, minHeight: isDesktop?'56px':'48px', background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8} }}>
//               Sign In
//             </Button>
//             </Stack>
//           </FormProvider>
//         </Box>
//         <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: 2 }}>
//           <Typography variant="subtitle2" sx={{ color: '#d7d5d7', textAlign: 'center', fontWeight: 'light' }}>
//             New here?
//           </Typography>
//           <Typography variant="subtitle2" sx={{ color: '#FFF', textAlign: 'center', ml: 1 }}>
//             <a href={paths.register} style={{ textDecoration: 'none', color: '#FFF'}}>
//               Create an account
//             </a>
//           </Typography>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }



/* eslint-disable jsx-a11y/label-has-associated-control */

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './LoginForm.css';
import { useSnackbar } from 'notistack';

import { paths } from 'src/routes/paths';
import { useAuthContext } from '../../../auth/useAuthContext';

export default function LoginForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { login, resetPassword } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [authError, setAuthError] = useState('');


  const LoginSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email'),
    password: Yup.string().required('Password is required').min(6),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

const onSubmit = async (data) => {
  try {
    setLoading(true);
    setAuthError('');
    setShowError(false);

    await login(data.email, data.password);
    navigate(paths.home, { replace: true });
  } catch (error) {
    const message =
      error?.message ||
      'Invalid email or password. Please try again.';

    setAuthError(message);
    setShowError(true);
  } finally {
    setLoading(false);
  }
};


  const onResetPassword = async () => {
    if (!resetEmail) return;
    setResetLoading(true);
    await resetPassword(resetEmail);
    setResetLoading(false);
    setOpenReset(false);
    enqueueSnackbar('Password reset email sent successfully!', {
      variant: 'success',
      anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
    });
  };
const EyeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 19 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer eye */}
    <path
      d="M1.05372 7.73775C1.99075 6.25275 4.78231 2.50001 9.03648 2.50001
      C13.2906 2.50001 16.0822 6.25404 17.02 7.73903
      C17.1336 7.91876 17.1903 8.00863 17.2221 8.14724
      C17.2459 8.25134 17.2459 8.41556 17.222 8.51966
      C17.1903 8.65826 17.1331 8.74872 17.0188 8.92965
      C16.0822 10.4146 13.2906 14.1667 9.03648 14.1667
      C4.78231 14.1667 1.99075 10.4126 1.05291 8.92766"
      stroke="#AFAFAF"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Pupil */}
    <circle
      cx="9.03648"
      cy="8.33334"
      r="2.5"
      stroke="#AFAFAF"
      strokeWidth="1.66667"
    />
  </svg>
);


const EyeOffIcon = () => (
      <svg width="20" height="20" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.98859 2.57694C8.32726 2.52687 8.67664 2.50001 9.03648 2.50001C13.2906 2.50001 16.0822 6.25404 17.02 7.73903C17.1336 7.91876 17.1903 8.00863 17.2221 8.14724C17.2459 8.25134 17.2459 8.41556 17.222 8.51966C17.1903 8.65826 17.1331 8.74872 17.0188 8.92965C16.7689 9.32513 16.3879 9.88093 15.8832 10.4837M4.63973 3.92921C2.83801 5.15143 1.61484 6.84949 1.05372 7.73775C0.939704 7.91824 0.882695 8.00848 0.850915 8.14708C0.827047 8.25117 0.827037 8.41538 0.850894 8.51948C0.882657 8.65808 0.939409 8.74794 1.05291 8.92766C1.99075 10.4126 4.78231 14.1667 9.03648 14.1667C10.7518 14.1667 12.2294 13.5563 13.4435 12.7305M1.53648 0.833344L16.5365 15.8333M7.26871 6.56558C6.8163 7.01799 6.53648 7.64299 6.53648 8.33334C6.53648 9.71406 7.65577 10.8333 9.03648 10.8333C9.72684 10.8333 10.3518 10.5535 10.8042 10.1011" stroke="#AFAFAF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
);
const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <circle cx="8" cy="8" r="7" fill="none" stroke="#FB3748" strokeWidth="1.2" />
    <rect x="7.25" y="4" width="1.5" height="6" rx="0.75" fill="#FB3748" />
    <circle cx="8" cy="11.5" r="0.75" fill="#FB3748" />
  </svg>
);





  return (
    <div className="login-layout">
      {loading && (
        <div className="backdrop">
          <div className="spinner" />
        </div>
      )}

      {/* LEFT */}
      <div className="login-left">
        <div className="brand-top">
          <img src="/img/bsplogo.png" alt="BSP Consult" />
          <p>BSP <span>CONSULT</span></p>
        </div>

        <div className="login-card">
          <h2 className="login-title">Sign In</h2>

          {showError && (
            <div className="error-alert">
              Email or Password is wrong. Please try again.
            </div>
          )}

          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            {/* EMAIL */}
            
          <label htmlFor="email" className="input-label">
            Email Address
          </label>
 <div className="input-wrapper">
  <input
    id="email"
    type="email"
    className={`input-field ${
      errors.email || authError ? 'input-error' : ''
    }`}
    placeholder="Enter your email address"
    {...register('email', {
      onChange: () => {
        setAuthError('');
        setShowError(false);
      },
    })}
  />

  {(errors.email || authError) && (
    <span className="error-icon">
      <ErrorIcon />
    </span>
  )}
</div>

{errors.email && (
  <p className="error-text">{errors.email.message}</p>
)}



            {/* PASSWORD */}
            <label htmlFor="password" className="input-label">
              Password
            </label>
         
            <div className="password-group input-wrapper">
  <input
    id="password"
    type={showPassword ? 'text' : 'password'}
    className={`input-field ${
      errors.password || authError ? 'input-error' : ''
    }`}
    placeholder="Enter your password"
    {...register('password')}
  />



  <button
    type="button"
    className="eye-btn"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
  </button>
    
</div>
{errors.password && (
  <p className="error-text">{errors.password.message}</p>
)}



            <button
              type="button"
              className="forgot-btn"
              onClick={() => setOpenReset(true)}
            >
              Forgot Password?
            </button>

            <button type="submit" className="login-btn">
              Sign In
            </button>
          </form>

          <div className="register-link">
            <span>New here?</span>
            <a href={paths.register}>Create an account</a>
          </div>
          <p className="terms-text">
  By creating an account, you agree to our{' '}
  <a href="/privacy-policy">Privacy Policy</a> and{' '}
  <a href="/terms-conditions">Terms & Conditions</a>.
</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="login-right">
        <img src="/img/log.png" alt="Preview" />
      </div>

      {/* RESET MODAL */}
      {openReset && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Reset Password</h3>

            <input
              type="email"
              className="input-field"
              placeholder="Email address"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />

            <div className="modal-actions">
              <button type="button" onClick={() => setOpenReset(false)}>
                Cancel
              </button>
              <button type="button" onClick={onResetPassword}>
                {resetLoading ? 'Sending...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
