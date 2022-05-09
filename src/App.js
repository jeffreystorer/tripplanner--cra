import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink as RouterLink,
  Outlet,
} from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  ChakraProvider,
  Box,
  Button,
  Center,
  Container,
  Heading,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
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
import { v4 as uuidv4 } from 'uuid';

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
  linkColor: '#0000008C',
  linkColorHover: '#0000008C',
  linkBackground: '#ffffff',
  linkColorActive: '#ffffff',
  linkBackgroundActive: '#3378ac',
};

const theme = extendTheme({
  styles: styles,
  colors: brand,
});

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<SignInPage />}></Route>
          <Route path="/pages" element={<Layout />}>
            <Route path="trip" element={<TripPage />} />
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
  const pages = [
    {
      path: '/pages/trip',
      name: 'Trip',
    },
    {
      path: '/pages/room',
      name: 'Room',
    },
  ];

  const actions = [
    {
      path: '/pages/addtrip',
      name: 'Add Trip',
    },
    {
      path: '/pages/addroom',
      name: 'Add Room',
    },
  ];

  let activeStyle = {
    color: '#ffffff',
    backgroundColor: '#3378ac',
    outline: 0,
  };

  const navBarItems = pages.map(page => {
    return (
      <ChakraProvider theme={theme}>
        <Link
          key={uuidv4()}
          /* as={props => (
            <NavLink
              {...props}
              style={({ isActive }) => {
                return { color: isActive ? activeStyle : undefined };
              }}
            />
          )} */
          as={RouterLink}
          to={page.path}
          height="auto"
          width="fit-content"
          fontSize=".8125rem"
          fontFamily="Arial, Hevetica, sans-serif"
          padding=".125rem .625rem .1875rem .625rem"
          color={brand.linkColor}
          bg={brand.linkBackground}
          margin=".1875rem"
          fontWeight="bold"
          _hover={{ color: brand.linkColorHover }}
          _focus={{ outline: 0 }}
          _activeLink={activeStyle}
        >
          {page.name}
        </Link>
      </ChakraProvider>
    );
  });

  const dropdownItems = actions.map(action => {
    return (
      <ChakraProvider theme={theme}>
        <MenuItem>
          <Link
            key={uuidv4()}
            /* as={props => (
            <NavLink
              {...props}
              style={({ isActive }) => {
                return { color: isActive ? activeStyle : undefined };
              }}
            />
          )} */
            as={RouterLink}
            to={action.path}
            height="auto"
            width="fit-content"
            fontSize=".8125rem"
            fontFamily="Arial, Hevetica, sans-serif"
            padding=".125rem .625rem .1875rem .625rem"
            color={brand.linkColor}
            bg={brand.linkBackground}
            margin=".1875rem"
            fontWeight="bold"
            _hover={{ color: brand.linkColorHover }}
            _focus={{ outline: 0 }}
            _activeLink={activeStyle}
          >
            {action.name}
          </Link>
        </MenuItem>
      </ChakraProvider>
    );
  });

  return (
    <>
      <ChakraProvider theme={theme}>
        <HStack spacing={3.5} as="nav" width="fit-content" ml="auto" mr="auto">
          <Heading
            backgroundColor="#cccccc"
            color="#00365f"
            alignItems="center"
            boxShadow="0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.28)"
            height="40px"
            marginLeft="auto"
            marginRight="20px"
            fontSize="24px"
            overflow="hidden"
            padding="0px 5px 0px 5px"
            textAlign="center"
            width="fit-content"
          >
            Storer Trip Planner
          </Heading>
          {navBarItems}
          <Menu>
            <MenuButton
              as={Text}
              height="auto"
              width="fit-content"
              fontSize=".8125rem"
              fontFamily="Arial, Hevetica, sans-serif"
              padding=".125rem .625rem .1875rem .625rem"
              color={brand.linkColor}
              bg={brand.linkBackground}
              fontWeight="bold"
              _hover={{ color: brand.linkColorHover }}
              _focus={{ outline: 0 }}
            >
              More
              <ChevronDownIcon />
            </MenuButton>
            <MenuList>{dropdownItems}</MenuList>
          </Menu>
        </HStack>
        <Outlet />
      </ChakraProvider>
    </>
  );
}
