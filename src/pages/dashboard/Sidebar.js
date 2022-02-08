import React, {useState, useEffect} from "react";
import {Box, HStack, Button, Text, VStack} from '@chakra-ui/react'
import {NavLink, useLocation} from 'react-router-dom'
import { Icon } from "../../ui-elements";
import {useAuth} from '../../hooks'
import {useDispatch} from 'react-redux'
import {authAction} from "../../redux/actions"
import { useIdleTimer } from 'react-idle-timer'

const sidemenu = [
    // {to: '/', label: 'Dashboard ', icon: 'ios-speedometer'},   
]

const Sidebar = () => {
    const location = useLocation()
    const [active, setActive] = useState(null)
    const auth = useAuth()
    const dispatch=useDispatch();
console.log(auth)
    useEffect(()=>{
         setTimeout(handleLogout,new Date(auth.expire)-Date.now())
         console.log(new Date(auth.expire)-Date.now())
    },[])
    useEffect(() => {
        setActive(location?.pathname)
    }, [location])

    const handleLogout = () => {
        dispatch(authAction.logout())
            .then(() => {
                window.location.href="/"
            })
            .catch((e) => {
                window.location.href="/"
            })
        
    }
 
    
    useIdleTimer({
        timeout: new Date(auth.expire)-Date.now(),
        onIdle:  handleLogout,
        debounce: 500
      })
     
    return(
        <>
            <VStack h="100%" w={"260px"} minW="260px" bg="white"  py="10px" shadow="lg"  borderRight="1px solid" borderColor="gray.100">
                <VStack w='100%' spacing={2} px={3} h="100%" overflowY="auto">
                    {
                        sidemenu?.map((item, index) =>
                        <Box key={index} w='100%'>                        
                            <NavLink to={item.to} >
                                <HStack bg={active === item.to ? "brand.500" : 'white'} className="align-center" px="2" py="1.5" rounded="sm" _hover={{ bg: active !== item.to && 'gray.100' }}>
                                    <Box w="28px" as="span" mr="1" h="28px" className='center' rounded="full">
                                        <Icon name={item.icon} color={active === item.to ? "white" : 'gray.400'} fontSize="18px"  />
                                    </Box>
                                    <Text as="span" fontWeight="medium" fontSize="sm" color={active === item.to ? "white" : "gray.500"}>{item.label} </Text>
                                </HStack>
                            </NavLink>                        
                        </Box>
                        )
                    }                                 
                </VStack>
                <VStack w='100%' px={3} py="2" alignItems='flex-start'>
                    <Text>Logged In </Text>
                    <Button onClick={handleLogout} rounded='sm' size="sm" my="4">Logout</Button>
                </VStack>
            </VStack> 
        </>
    )
}

export default Sidebar