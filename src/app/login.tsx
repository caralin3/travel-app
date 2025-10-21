import React from 'react';

import { useAuth } from '@/lib';
import { LoginForm, type LoginFormProps } from '../components/login-form';
import { FocusAwareStatusBar } from '../components/ui';

export default function Login() {
  const signIn = useAuth.use.signIn();

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    await signIn(data.email, data.password);
  };

  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
