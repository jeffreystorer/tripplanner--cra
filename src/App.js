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
  Heading,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  extendTheme,
} from '@chakra-ui/react';
import {
  AddPage,
  DetailsGateway,
  EditItineraryPage,
  EditPage,
  ItineraryPage,
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
  textStyles: {
    boldLeft: {
      fontWeight: 'bold',
      textAlign: 'left',
    },
  },
});

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/pages" element={<Layout />}>
            <Route
              path="activity"
              element={<DetailsGateway page={'activity'} />}
            />
            <Route path="addactivity" element={<AddPage page={'activity'} />} />
            <Route
              path="/pages/editactivity/:rowIndex"
              element={<EditPage page={'activity'} />}
            />
            <Route path="car" element={<DetailsGateway page={'car'} />} />
            <Route path="addcar" element={<AddPage page={'car'} />} />{' '}
            <Route
              path="/pages/editcar/:rowIndex"
              element={<EditPage page={'car'} />}
            />
            <Route path="itinerary" element={<ItineraryPage />} />
            <Route path="edititinerary" element={<EditItineraryPage />} />
            <Route path="note" element={<DetailsGateway page={'note'} />} />
            <Route path="addnote" element={<AddPage page={'note'} />} />
            <Route
              path="/pages/editnote/:rowIndex"
              element={<EditPage page={'note'} />}
            />
            <Route path="room" element={<DetailsGateway page={'room'} />} />
            <Route path="addroom" element={<AddPage page={'room'} />} />
            <Route
              path="/pages/editroom/:rowIndex"
              element={<EditPage page={'room'} />}
            />
            <Route path="travel" element={<DetailsGateway page={'travel'} />} />
            <Route path="addtravel" element={<AddPage page={'travel'} />} />
            <Route
              path="/pages/edittravel/:rowIndex"
              element={<EditPage page={'travel'} />}
            />
            <Route path="trip" element={<TripPage />} />
            <Route path="addtrip" element={<AddPage page={'trip'} />} />
            <Route
              path="/pages/edittrip/:rowIndex"
              element={<EditPage page={'trip'} />}
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
      path: '/pages/itinerary',
      name: 'Itinerary',
    },
  ];

  const actions2 = [
    {
      path: '/',
      name: 'Signout',
    },
  ];

  function LinkItem({ item }) {
    return (
      <Link
        key={uuidv4()}
        as={RouterLink}
        to={item.path}
        height="2.5rem"
        width="fit-content"
        fontSize="1rem"
        fontFamily="Arial, Hevetica, sans-serif"
        padding=".4rem .625rem .1rem .625rem"
        color={brand.linkColor}
        bg={brand.linkBackground}
        mt="0"
        mb="0"
        fontWeight="bold"
        _hover={{ color: brand.linkColorHover }}
        _focus={{ outline: 0 }}
        _activeLink={activeStyle}
      >
        {item.name}
      </Link>
    );
  }

  let activeStyle = {
    color: '#ffffff',
    backgroundColor: '#3378ac',
    outline: 0,
  };

  const navBarItems = pages.map(item => {
    return <LinkItem key={uuidv4()} item={item} />;
  });

  const menuItems2 = actions2.map(item => {
    return (
      <MenuItem key={uuidv4()}>
        <LinkItem key={uuidv4()} item={item} />
      </MenuItem>
    );
  });

  return (
    <>
      <ChakraProvider key={uuidv4()} theme={theme}>
        <HStack
          key={uuidv4()}
          spacing={0}
          as="nav"
          width="fit-content"
          ml="auto"
          mr="auto"
          mt=".5rem"
          mb="1rem"
        >
          <Heading
            key={uuidv4()}
            backgroundColor="#cccccc"
            color="#00365f"
            alignItems="center"
            boxShadow="0rem .875rem 1.75rem rgba(0, 0, 0, 0.25), 0 .625rem .625rem rgba(0, 0, 0, 0.28)"
            height="2.5rem"
            marginLeft="auto"
            marginRight="1.25rem"
            fontSize="1.5rem"
            overflow="hidden"
            padding=".125rem .625rem .1875rem .625rem"
            textAlign="center"
            width="fit-content"
          >
            Storer Trip Planner
          </Heading>
          {navBarItems}
          <Menu key={uuidv4()}>
            <MenuButton
              key={uuidv4()}
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
              <ChevronDownIcon key={uuidv4()} />
            </MenuButton>
            <MenuList key={uuidv4()}>{menuItems2}</MenuList>
          </Menu>
        </HStack>
        <Outlet />
      </ChakraProvider>
    </>
  );
}
