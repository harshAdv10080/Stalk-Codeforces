import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Plag from './pages/Plag'
import Profile from './pages/Profile'
import Stats from './pages/Stats'
function App() {
  return (
    // <div>
    //   <Sidebar/>
    // </div>
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      {/* <!-- Main Content --> */}
      <div className="flex-grow p-6">
        {/* <!-- Add your main content here --> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/plag' element={<Plag />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/stats' element={<Stats />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
