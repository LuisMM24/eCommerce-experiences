// import { useState } from 'react'

import { NavbarSegmented as Navbar } from './components/DashboardNavbar/DashboardNavbar';
import { UsersTable as Users } from './components/Users/Users';
import ExperiencesList from './components/ExperiencesList/ExperiencesList';

import { data } from './data/users';

const users:any = data;

import './App.css'

function App() {

  return (
    <div className="App flex-row">
      <Navbar />
      <Users data={users}/>
      <ExperiencesList />
    </div>
  )
}

export default App
