import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import {
  Button,
  Center,
  Container,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import preval from 'preval.macro';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Header } from 'components/signin';
import { firebaseConfig } from 'firebaseConfig';
import * as state from 'store';
import 'styles/App.css';

export default function SignInPage() {
  const build =
    'Build: ' + preval`module.exports = new Date().toLocaleString();`;
  const setUserId = useSetRecoilState(state.userId);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleSubmit = e => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, username, password)
      .then(userCredential => {
        const user = userCredential.user;
        setUserId(user.uid);
        setLoading(false);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      {loading ? (
        <Container width="30%">
          <VStack gap={3}>
            <Header />
            <form>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                autoComplete="username"
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                autoComplete="new-password"
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </form>
            <Center>
              <Button colorScheme="blue" size="md" onClick={handleSubmit}>
                Sign in
              </Button>
            </Center>
          </VStack>
          <Center>
            <footer className="footer--center">
              {build}
              <br />
              <br />
            </footer>
          </Center>
        </Container>
      ) : (
        <Navigate to="/pages/trip" />
      )}
    </>
  );
}
