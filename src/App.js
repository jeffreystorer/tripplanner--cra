import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Outlet,
} from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Container,
  Text,
  Link,
  HStack,
  //theme,
  extendTheme,
} from '@chakra-ui/react';
import {
  AddRoomPage,
  AddTripPage,
  EditRoomPage,
  EditTripPage,
  RoomPage,
  SignInPage,
  TripPage,
} from 'pages';
import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: props => ({
    html: {
      fontSize: ['7px', '7px', '16px', '20px', '20px'],
    },
    body: {
      fontFamily: 'body',
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('white', 'gray.800')(props),
      lineHeight: 'base',
    },
    '*::placeholder': {
      color: mode('gray.400', 'whiteAlpha.400')(props),
    },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', 'whiteAlpha.300')(props),
      wordWrap: 'break-word',
    },
  }),
};

const brand = {
  headerColor: '#fff',
  headerBackground: '#7283fe', //'#400000',
  hLinkColor: '#333333', //'#fffffff',
  hLinkColorHover: '#f29085',
  hlinkColorActive: '',
  hLinkBackground: '#fff', //'#964800',
  hLinkBackgroundActive: '#f29085', //'#E6B862'
  vLinkColor: '#333333', //'#3C1E00',
  vLinkColorHover: '#f29085',
  vLinkColorActive: '',
  vLinkBackground: '#fff', //'#e6deb9',
  vLinkBackgroundActive: '#f29085', //'#E6B862'
};

const theme = extendTheme({
  styles: styles,
  colors: brand,
  components: {
    Divider: {
      variants: {
        custom: {
          borderColor: '#7283fe',
          borderWidth: '.0625rem',
          borderStyle: 'none none solid none',
        },
      },
    },
  },
});

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<SignInPage />}></Route>
          <Route path="/pages" element={<Layout />}>
            <Route index element={<TripPage />} />
            <Route path="addtrip" element={<AddTripPage />} />
            <Route path="room" element={<RoomPage />} />
            <Route path="addroom" element={<AddRoomPage />} />
            <Route
              path="/pages/editroom/:rowIndex"
              element={<EditRoomPage />}
            />
            <Route
              path="/pages/edittrip/:rowIndex"
              element={<EditTripPage />}
            />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

function Layout() {
  return (
    <>
      <Box>
        <Container>
          <HStack>
            <Text>Storer Trip Planner</Text>
            <Link as={NavLink} to="/pages">
              Trip
            </Link>
            <Link as={NavLink} to="/pages/room">
              Room
            </Link>
            <Link as={NavLink} to="/pages/addtrip">
              Add Trip
            </Link>
            <Link as={NavLink} to="/pages/addroom">
              Add Room
            </Link>
          </HStack>
        </Container>
      </Box>
      <Outlet />
    </>
  );
}
