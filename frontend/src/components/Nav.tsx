import { useEffect, useState } from 'react';
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
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import { NavLink as ReactLink } from "react-router-dom"
import { MoonIcon, SunIcon, /*HamburgerIcon, CloseIcon, AddIcon, ChatIcon*/ } from '@chakra-ui/icons';
import BooBo_logo from '../assets/BooBo_logo.png';
import { useSelector } from 'react-redux';
import { resetCurrentUser } from '../actions/userActions'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.user)
    const [loggedIn, setLoggedIn] = useState<boolean>(!!user);
    const navigate = useNavigate()

    useEffect(() => {
        if (user) setLoggedIn(true)
        else setLoggedIn(false)
    }, [user])

    const logout = () => {
        axios.post('http://localhost:3000/users/logout', {}, { withCredentials: true })
        .then(() => {
            dispatch(resetCurrentUser())
            navigate('/')
        })
    }

    return (
        <>
            <Center mx={3} mt={2}>
                <Box w={{ lg: '75%', md: '85%', sm: '100%' }}>
                    <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                        <HStack spacing={8} alignItems={'center'}>
                            <Link as={ReactLink} to='/'>
                                <HStack>
                                    <Image className='h-16' src={BooBo_logo} alt="BooBo L`ogo"></Image>
                                    <Text fontSize={'2xl'} className='theme-header' color={useColorModeValue('gray.800', 'gray.100')} fontFamily={'Pacifico'}>BooBo</Text>
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
                                    <Link as={ReactLink} to='/signup'>
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
                                    <Link as={ReactLink} to='/login'>
                                        <Button
                                            variant={'solid'}
                                            background={'red.200'}
                                            size={'md'}
                                            rounded={'xl'}
                                            mr={4}
                                            fontFamily={'Poppins'}>
                                            Login
                                        </Button>
                                    </Link>
                                </>
                            }
                            {loggedIn && 
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
                                    <Link as={ReactLink} to='/profile'>
                                        <MenuItem padding={4}>My Profile</MenuItem>
                                    </Link>
                                    <MenuItem padding={4} onClick={logout}>Logout</MenuItem>
                                </MenuList>
                            </Menu>}
                        </Flex>
                    </Flex>
                </Box>
            </ Center>
        </>
    );
}
