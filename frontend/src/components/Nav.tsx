import { useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  /*
  MenuDivider,
  useDisclosure,
  IconButton,
  useColorModeValue,
  Stack,
  */
  useColorMode,
  Center,
  Image,
  Text
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, /*HamburgerIcon, CloseIcon, AddIcon,*/ ChatIcon } from '@chakra-ui/icons';
import BooBo_logo from '../assets/BooBo_logo.png';

// MIGHT USE THIS STUFF LATER, YAY
//   const Links = ['Find Books', 'Other things', 'Team'];

//   const NavLink = ({ children }: { children: ReactNode }) => (
//     <Link
//       px={2}
//       py={1}
//       rounded={'md'}
//       _hover={{
//         textDecoration: 'none',
//         bg: useColorModeValue('gray.200', 'gray.700'),
//       }}
//       href={'#'}>
//       {children}
//     </Link>
//   );

  export default function Nav() {
    const { colorMode, toggleColorMode } = useColorMode();
    const [loggedIn, setLoggedIn] = useState(false);

    const login = () => {
        setLoggedIn(true);
    }
    
    return (
      <>
        <Center>
            <Box w={{lg: '75%', md: '85%', sm: '100%'}} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <HStack spacing={8} alignItems={'center'}>
                <Link href='/'>
                    <HStack>
                        <Image className='h-16' src={BooBo_logo} alt="BooBo Logo"></Image>
                        <Text fontSize={'2xl'} className='theme-header' color={'gray.700'} fontFamily={'Pacifico'}>BooBo</Text>
                    </HStack>
                </Link>
                {/*<HStack
                    as={'nav'}
                    spacing={4}
                    display={{ base: 'none', md: 'flex' }}>
                    {Links.map((link) => (
                    <NavLink key={link}>{link}</NavLink>
                    ))}
                </HStack>
                    */}
                </HStack>
                <Flex alignItems={'center'}>
                        <Button onClick={toggleColorMode} mr={4}>
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
                        {!loggedIn &&
                        <>
                            {/*<Button mr={4}>{<ChatIcon/>}</Button>*/}
                            <Link href='/signup'>
                                <Button
                                    variant={'solid'}
                                    bg={'red.200'}
                                    size={'md'}
                                    rounded={'xl'}
                                    fontFamily={'Poppins'}
                                    mr={4}>
                                    Register
                                </Button>
                            </Link>
                            <Link href='/login'>
                                <Button
                                    variant={'solid'}
                                    background={'red.200'}
                                    size={'md'}
                                    rounded={'xl'}
                                    mr={4}
                                    fontFamily={'Poppins'}
                                    onClick={login}>
                                    Login
                                </Button>
                            </Link>
                        </>
                        }

                    <Menu>
                        <MenuButton
                        as={Button}
                        rounded={'full'}
                        variant={'link'}
                        cursor={'pointer'}
                        minW={0}>
                        <Avatar
                            size={'sm'}
                        />
                        </MenuButton>
                        <MenuList rounded={'2xl'}>
                            <Link href='/profile'>
                                <MenuItem padding={4}>My Profile</MenuItem>
                            </Link>
                        <MenuItem padding={4}>Messages</MenuItem>
                        <MenuItem padding={4}>Settings</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
            </Box>
        </ Center>
      </>
    );
  }
