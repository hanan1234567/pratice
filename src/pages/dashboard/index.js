import React from "react";
import {Box} from '@chakra-ui/react'
import { Routes as Switch, Route} from "react-router-dom";
import './index.css'
import Sidebar from "./Sidebar";
import NotFound from "../errors/404";
import Home from '../home'
import Users from '../users'


const Dashboard = () => {
    return(
        <Box d="flex"  h='100vh' bg="gray.100">
            <Sidebar />
            <Box  maxW="calc(100% - 260px)" flex={1}>
                <Switch>                                                        
                    <Route exact path="/"  element={<Home />} />
                    <Route path="/users/*"  element={<Users />} />                      
                    <Route path="*" element={<NotFound/>} />
                </Switch>       
            </Box>            
        </Box>
    )
}

export default Dashboard