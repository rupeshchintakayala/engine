/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { useSignupUserMutation } from 'queries/generated/graphql';

import { AuthenticationLayout } from 'layouts/authentication_layout';
import { LoggedInGuard } from 'wrappers/logged_in_guard';

import styles from './signup.module.scss';

interface FormValues {
  email: string;
  password: string;
  name: string;
}

export function Signup(): ReactElement {
  const [SignupUserMutation, { loading }] = useSignupUserMutation();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      name: (value) =>
        /^[a-zA-Z]+ [a-zA-Z]+$/.test(value) ? null : 'Invalid name',
    },
  });

  const onSubmit = async (values: FormValues) => {
    await SignupUserMutation({
      variables: {
        data: {
          email: values.email,
          password: values.password,
          firstname: values.name.split(' ')[0],
          // TODO (harshith): Cover usecase where the user enters more than 2 words
          lastname: values.name.split(' ')[1],
        },
      },
      onCompleted: () => {
        router.replace('/authentication/signin');
      },
      onError: (err: Error) => {
        form.setErrors({
          email: err.message,
        });
      },
    });
  };

  return (
    <Container className={styles.container}>
      <Title align="center" className={styles.title}>
        Register
      </Title>
      <Text color="dimmed" size="sm" align="center" className={styles.text}>
        Already have an account?{' '}
        <Link href="/authentication/signin" className={styles.link}>
          Login here
        </Link>
      </Text>

      <Paper withBorder radius="md" className={styles.paper}>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="Name"
            placeholder="Elon Musk"
            required
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Email"
            placeholder="elon@poozle.dev"
            mt="md"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />

          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

Signup.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <LoggedInGuard>
      <AuthenticationLayout>{page}</AuthenticationLayout>
    </LoggedInGuard>
  );
};
