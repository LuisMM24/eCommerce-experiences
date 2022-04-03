import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MantineProvider } from '@mantine/core';

import { AuthContextProvider } from "./context/authContext";
import Navbar from './components/DashboardNavbar/DashboardNavbar';
import { UsersTable as Users } from './components/Users/Users';
import ExperiencesList from './components/ExperiencesList/ExperiencesList';
import Experience from './components/Experience/Experience';
import {AuthenticationForm as Login} from './components/Login/Login'

import { data } from './data/users';

const users:any = data;

import './App.css'

function App() {
  const queryClient = new QueryClient;
  const [section, setSection] = useState('experiences');

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
      <AuthContextProvider>        
        <Router>
          <Navbar section={section} setSection={setSection}/>
          <Routes>
            <Route path='/dashboard/auth' element={<Login />} />
            <Route path='/dashboard/experiences' element={<ExperiencesList />} />
            <Route path='/dashboard/users' element={<Users data={users} />} />
            <Route path='/dashboard/experiences/:experienceId' element={<Experience />} />
          </Routes>
        </Router>
      </AuthContextProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
