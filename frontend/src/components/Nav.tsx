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
    const { colorMode, toggleColorMode } = useColorMode();
    const [loggedIn, setLoggedIn] = useState(false);

    return (
      <>
        <Center>
            <Box w='70%' px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <HStack spacing={8} alignItems={'center'}>
                <HStack>
                    <Image className='h-16' src={BooBo_logo} alt="BooBo Logo"></Image>
                    <Text fontSize={'2xl'} className='theme-header'>BooBo</Text>
                </HStack>
                </HStack>
                <Flex alignItems={'center'}>
                        <Button onClick={toggleColorMode} mr={4}>
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
                        {!loggedIn &&
                        <>
                            <Button
                                variant={'solid'}
                                colorScheme={'messenger'}
                                size={'sm'}
                                mr={4}>
                                Sign Up
                            </Button>
                            <Button
                                variant={'solid'}
                                colorScheme={'purple'}
                                size={'sm'}
                                mr={4}>
                                Login
                            </Button>
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
                        <MenuItem>My Profile</MenuItem>
                        <MenuItem>Settings</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
            </Box>
        </ Center>
      </>
    );
  }