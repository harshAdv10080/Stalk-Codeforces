import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Plag from './pages/Plag'
import Profile from './pages/Profile'
import ProfileDetails from './pages/ProfileDetails'
import Problem from './pages/Problem'
import ProblemDetails from './pages/ProblemDetails'
function App() {
  return (
    // <div>
    //   <Sidebar/>
    // </div>
    <div className="flex h-screen bg-gray-100">
      <div className="w-96 top-0 left-0 h-full bg-gray-800 text-white shadow-lg">
        <Sidebar />
      </div>
      {/* <!-- Main Content --> */}
      <div className="flex-grow p-6 overflow-y-scroll">
        {/* <!-- Add your main content here --> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/plag' element={<Plag />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/:userHandle' element={<ProfileDetails/>}/>
          <Route path='/problems' element={<Problem />} />
          <Route path='/problems/:userHandle' element={<ProblemDetails/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
