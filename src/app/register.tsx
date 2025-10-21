import React from 'react';

import { useAuth } from '@/lib';
import {
  RegisterForm,
  type RegisterFormProps,
} from '../components/register-form';
import { FocusAwareStatusBar } from '../components/ui';

export default function Register() {
  const register = useAuth.use.register();

  const onSubmit: RegisterFormProps['onSubmit'] = async (data) => {
    await register(data.email, data.password);
  };

  return (
    <>
      <FocusAwareStatusBar />
      <RegisterForm onSubmit={onSubmit} />
    </>
  );
}
