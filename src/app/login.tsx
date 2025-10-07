import React from 'react';

import { LoginForm, type LoginFormProps } from '../components/login-form';
import { FocusAwareStatusBar } from '../components/ui';

export default function Login() {
  // const router = useRouter();
  // const signIn = useAuth.use.signIn();

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    console.log(data);
    // signIn({ access: 'access-token', refresh: 'refresh-token' });
    // router.push('/');
  };

  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
