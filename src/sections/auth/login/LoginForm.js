import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

import './login.css';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'demo@minimals.cc',
    password: 'demo1234',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error(error);

      reset();

      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>

      <div>
        <div
          className="MuiDivider-root MuiDivider-fullWidth MuiDivider-withChildren css-1myavxm"
          role="separator"
          style={{ margin: '20px 20px' }}
        >
          <span className="MuiDivider-wrapper css-c1ovea" style={{ marginLeft: '48%' }}>
            OR
          </span>
        </div>
        <div
          className="css-128z9w6 btns"
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
        >
          <button
            className=" socialBtn MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-10ygcul"
            tabIndex="0"
            type="button"
            
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              className="MuiBox-root css-8dwmnm iconify iconify--eva"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <g id="iconifyReact153">
                <g id="iconifyReact154">
                  <path
                    id="iconifyReact155"
                    fill="currentColor"
                    d="M17.5 14a5.51 5.51 0 0 1-4.5 3.93a6.15 6.15 0 0 1-7-5.45A6 6 0 0 1 12 6a6.12 6.12 0 0 1 2.27.44a.5.5 0 0 0 .64-.21l1.44-2.65a.52.52 0 0 0-.23-.7A10 10 0 0 0 2 12.29A10.12 10.12 0 0 0 11.57 22A10 10 0 0 0 22 12.52v-2a.51.51 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h5"
                  />
                </g>
              </g>
            </svg>
            <span className="MuiTouchRipple-root css-w0pj6f" />
          </button>
          <button
            className="socialBtn MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit MuiIconButton-sizeMedium css-1gwtl1m"
            tabIndex="0"
            type="button"
           
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              className="MuiBox-root css-1t9pz9x iconify iconify--eva"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <g id="iconifyReact156">
                <g id="iconifyReact157">
                  <g id="iconifyReact158">
                    <g id="iconifyReact159">
                      <g id="iconifyReact160">
                        <g id="iconifyReact161">
                          <path
                            id="iconifyReact162"
                            fill="currentColor"
                            d="M12 1A10.89 10.89 0 0 0 1 11.77A10.79 10.79 0 0 0 8.52 22c.55.1.75-.23.75-.52v-1.83c-3.06.65-3.71-1.44-3.71-1.44a2.86 2.86 0 0 0-1.22-1.58c-1-.66.08-.65.08-.65a2.31 2.31 0 0 1 1.68 1.11a2.37 2.37 0 0 0 3.2.89a2.33 2.33 0 0 1 .7-1.44c-2.44-.27-5-1.19-5-5.32a4.15 4.15 0 0 1 1.11-2.91a3.78 3.78 0 0 1 .11-2.84s.93-.29 3 1.1a10.68 10.68 0 0 1 5.5 0c2.1-1.39 3-1.1 3-1.1a3.78 3.78 0 0 1 .11 2.84A4.15 4.15 0 0 1 19 11.2c0 4.14-2.58 5.05-5 5.32a2.5 2.5 0 0 1 .75 2v2.95c0 .35.2.63.75.52A10.8 10.8 0 0 0 23 11.77A10.89 10.89 0 0 0 12 1"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <span className="MuiTouchRipple-root css-w0pj6f" />
          </button>
          <button
            className="socialBtn MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-10ygcul"
            tabIndex="0"
            type="button"
         
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              className="MuiBox-root css-96715q iconify iconify--eva"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <g id="iconifyReact163">
                <g id="iconifyReact164">
                  <path
                    id="iconifyReact165"
                    fill="currentColor"
                    d="M8.08 20A11.07 11.07 0 0 0 19.52 9A8.09 8.09 0 0 0 21 6.16a.44.44 0 0 0-.62-.51a1.88 1.88 0 0 1-2.16-.38a3.89 3.89 0 0 0-5.58-.17A4.13 4.13 0 0 0 11.49 9C8.14 9.2 5.84 7.61 4 5.43a.43.43 0 0 0-.75.24a9.68 9.68 0 0 0 4.6 10.05A6.73 6.73 0 0 1 3.38 18a.45.45 0 0 0-.14.84A11 11 0 0 0 8.08 20"
                  />
                </g>
              </g>
            </svg>
            <span className="MuiTouchRipple-root css-w0pj6f" />
          </button>
        </div>
      </div>
    </FormProvider>
  );
}
