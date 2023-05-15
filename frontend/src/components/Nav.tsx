import { ReactNode, useState } from 'react';
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
  MenuDivider,
  useDisclosure,
  IconButton,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
  Text
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon, AddIcon, ChatIcon } from '@chakra-ui/icons';
import BooBo_logo from '../assets/BooBo_logo.png';

// MIGHT USE THIS STUFF LATER
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
    //const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const [loggedIn, setLoggedIn] = useState(false);

    return (
      <>
        <Center>
            <Box w='75%' px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                {/*<IconButton
                size={'md'}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={'Open Menu'}
                display={{ md: 'none' }}
                onClick={isOpen ? onClose : onOpen}
                />
                    */}
                <HStack spacing={8} alignItems={'center'}>
                <Link href='/'>
                    <HStack>
                        <Image className='h-16' src={BooBo_logo} alt="BooBo Logo"></Image>
                        <Text fontSize={'2xl'} className='theme-header'>BooBo</Text>
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
                            <Button mr={4}>{<ChatIcon/>}</Button>
                            <Link href='/signup'>
                                <Button
                                    variant={'solid'}
                                    colorScheme={'messenger'}
                                    size={'sm'}
                                    mr={4}>
                                    Sign Up
                                </Button>
                            </Link>
                            <Link href='/login'>
                                <Button
                                    variant={'solid'}
                                    colorScheme={'purple'}
                                    size={'sm'}
                                    mr={4}>
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
                            src='https://bit.ly/broken-link'
                        />
                        </MenuButton>
                        
                        <MenuList>
                            <Link href='/profile'>
                                <MenuItem>My Profile</MenuItem>
                            </Link>
                        <MenuItem>Messages</MenuItem>
                        <MenuItem>Settings</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
                    {/*
            {isOpen ? (
                <Box pb={4} display={{ md: 'none' }}>
                <Stack as={'nav'} spacing={4}>
                    {Links.map((link) => (
                    <NavLink key={link}>{link}</NavLink>
                    ))}
                </Stack>
                </Box>
            ) : null}
                    */}
            </Box>
        </ Center>
      </>
    );
  }