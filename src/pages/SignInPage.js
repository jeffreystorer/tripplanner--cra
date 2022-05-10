import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import {
  Button,
  Center,
  Container,
  FormControl,
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleSubmit = e => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
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
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                autoComplete="email"
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <form>
                <input type="text" autoComplete="username" ng-hide="true" />
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  autoComplete="new-password"
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </form>
            </FormControl>
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
