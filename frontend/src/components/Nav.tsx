import React from 'react'
import logo from '../assets/BooBo_logo.png'
import icon_user_account from '../assets/icon_user_account.png'

const Nav = () => {
  return (
    <nav className='flex justify-between h-20 w-3/4 content-center items-center mb-4'>
        <div className='flex content-center'>
            <img src={logo} className='h-20'/>
            <span className='theme-header self-center'>BooBo</span>
        </div>

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
            <Box w='70%' px={4}>
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
                <HStack>
                    <Image className='h-16' src={BooBo_logo} alt="BooBo Logo"></Image>
                    <Text fontSize={'2xl'} className='theme-header'>BooBo</Text>
                </HStack>
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