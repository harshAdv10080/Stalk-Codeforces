import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Plag from "./pages/Plag";
import Profile from "./pages/Profile";
import ProfileDetails from "./pages/ProfileDetails";
import Problem from "./pages/Problem";
import ProblemDetails from "./pages/ProblemDetails";
import Compare from "./pages/Compare";

function App() {
  return (
    <>
      <div className="lg:flex bg-gray-100">
        {/* Sidebar/Navbar */}
        <div className="lg:flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plag" element={<Plag />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userHandle" element={<ProfileDetails />} />
            <Route path="/problems" element={<Problem />} />
            <Route path="/problems/:userHandle" element={<ProblemDetails />} />
            <Route path="/compare" element={<Compare />} />

          </Routes>
          {/* Footer */}
          <footer className="py-8 bg-gray-800 mt-auto">
            <div className="container mx-auto text-center text-white">
              <p>Made By Harsh Bhanushali.</p>
            </div>
          </footer>
        </div>


      </div>
    </>
  );
}

export default App;
