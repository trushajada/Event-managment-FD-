import { Route, Routes } from 'react-router'
import './App.css'
import CreateEvent from './Componets/CreateEvent/CreateEvent'
import Login from './Componets/Login/Login'
import { AuthProvider } from './Context/AuthProvider/AuthProvider'
import EventList from './Componets/EventList/EventList'
import EditEvent from './Componets/EditEvent/EditEvent'

function App() {

  return (
    <>
    <AuthProvider>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/event' element={<CreateEvent/>}></Route>
      <Route path='/list' element={<EventList/>}></Route>
      <Route path='/edit/:id' element={<EditEvent/>}></Route>
    </Routes>
    </AuthProvider>
    
      
    </>
  )
}

export default App
