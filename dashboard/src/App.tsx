import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MantineProvider } from '@mantine/core';
import Navbar from './components/DashboardNavbar/DashboardNavbar';
import { UsersTable as Users } from './components/Users/Users';
import ExperiencesList from './components/ExperiencesList/ExperiencesList';
import Experience from './components/Experience/Experience';

import { data } from './data/users';

const users:any = data;

import './App.css'

function App() {
  const queryClient = new QueryClient;
  const [section, setSection] = useState('experiences');

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Router>
        <Navbar section={section} setSection={setSection}/>
          <Routes>
          <Route path='/dashboard/experiences' element={<ExperiencesList />}>
            <Route path='/dashboard/experiences:experienceId' element={<Experience />} />
          </Route>
          <Route path='/dashboard/users' element={<Users data={users} />} />

          {/* <div className="App flex-row">
              <Navbar section={section} setSection={setSection}/>
              <div>
                {section === 'users' && (
                  <Users data={users}/>
                  )}
                {section === 'experiences' && (
                  <ExperiencesList />
                  )}
              </div>
            </div> */}
        </Routes>
        </Router>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
