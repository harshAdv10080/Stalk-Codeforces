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
      <div className="lg:flex min-h-screen bg-professional-gradient">
        {/* Sidebar/Navbar */}
        <div className="lg:flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-4 lg:p-8">
            <div className="animate-fade-in">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/plag" element={<Plag />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:userHandle" element={<ProfileDetails />} />
                <Route path="/problems" element={<Problem />} />
                <Route path="/problems/:userHandle" element={<ProblemDetails />} />
                <Route path="/compare" element={<Compare />} />
              </Routes>
            </div>
          </main>

          {/* Footer */}
          <footer className="py-6 bg-secondary-800 bg-opacity-95 backdrop-blur-sm mt-auto">
            <div className="container mx-auto text-center text-secondary-100">
              <p className="text-sm font-medium">Made with ❤️ by Harsh Bhanushali</p>
              <div className="flex items-center justify-center gap-4 mt-2">
                <p className="text-xs text-secondary-300">CF Stalker - Your Codeforces Analytics Companion</p>
                <a
                  href="https://github.com/harshAdv10080"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-secondary-300 hover:text-primary-400 transition-colors duration-300 hover:scale-105 transform"
                >
                  <span>🔗</span>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
