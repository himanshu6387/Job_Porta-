import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import {Toaster} from 'react-hot-toast'
import Navbar from './components/Navbar'
import EmployePanel from './pages/EmployePanel'
import EmployerPanel from './pages/EmployerPanel'
import CreateJob from './pages/CreateJob'
import Profile from './pages/Profile'
import ViewCreatedJob from './pages/ViewCreatedJob'
import ApplyForm from './pages/ApplyForm'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import ViewApplicants from './pages/ViewApplicants'
import DashBoard from './components/DashBoard'

const App = () => {

  const {user} = useContext(AuthContext)
  return (
    <div>
        <BrowserRouter>
        <Navbar/>
         <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element={user?<DashBoard/>:<Login/>}/>
            <Route path='/' element={<SignUp/>}/>
            <Route path='/employerPanel' element={<EmployerPanel/>}/>
            <Route path='/employeePanel' element={<EmployePanel/>}/>
            <Route path='/createJob' element={<CreateJob/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/viewCreatedJob' element={<ViewCreatedJob/>}/>
            <Route path="/apply/:jobId" element={<ApplyForm/>} />
            <Route path="/viewApplicants" element={<ViewApplicants/>} />
         </Routes>
         <Toaster/>
        </BrowserRouter>
    </div>
  )
}

export default App
