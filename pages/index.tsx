import { Button, Container, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { InferType } from 'yup';
import { authStateSelector, loginUser } from '../src/application/state/features/auth';
import { useAppDispatch, useAppSelector } from '../src/application/state/hooks/hooks';
import { showNotification } from '../src/application/utils/notifications';
import { userLoginValidationSchema } from '../src/core/validations/auth_validations';

export default function HomePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    data: { token },
    pending,
    error,
  } = useAppSelector(authStateSelector);
  const form = useForm<InferType<typeof userLoginValidationSchema>>({
    initialValues: {
      email_address: '',
      password: '',
    },

    validate: yupResolver(userLoginValidationSchema),
  });

  useEffect(() => {
    if (error !== undefined && error !== null) {
      showNotification({
        title: 'An error has occurred',
        message: 'We are unable to process your request at the moment',
        type: 'danger',
      });
    }
  }, [error]);

  useEffect(() => {
    if (token !== undefined && token !== null) {
      showNotification({
        title: 'Login successful',
        message: 'We will redirect you to the dashboard shortly...',
        type: 'success',
      });

      // navigate the user to the dashboard page
      router.push('/dashboard');
    }
  }, [token]);

  return (
    <Container size={420} my={40}>
      <Title align="center">Welcome back!</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit((values) => {
            dispatch(loginUser(values));
          })}
        >
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...form.getInputProps('email_address')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />

          <Button loading={pending} fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
