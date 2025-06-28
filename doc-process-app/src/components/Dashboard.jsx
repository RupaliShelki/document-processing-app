import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Upload from "./Upload";
import Review from "./Review";
import Completed from "./Completed";
import { IoMdLogOut } from "react-icons/io";
import { FaRegSmileBeam } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="w-full h-auto sm:h-[9vh] flex flex-col sm:flex-row sm:justify-between items-center gap-3 sm:gap-0 px-4 sm:px-[6%] py-4 sm:py-0 bg-gray-500 fixed top-0 z-50">
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-7">
          <Link to="/dashboard/upload" className="text-white font-semibold hover:text-black">
            Upload
          </Link>
          <Link to="/dashboard/review" className="text-white font-semibold hover:text-black">
            Review
          </Link>
          <Link to="/dashboard/completed" className="text-white font-semibold hover:text-black">
            Completed
          </Link>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            navigate("/");
          }}
          className="flex items-center gap-1 text-white font-semibold hover:text-black"
        >
          <IoMdLogOut className="w-[24px] h-[24px]" />
          <span className="text-sm">Logout</span>
        </button>
      </nav>

      {/* Animated Route Content */}
      <div className="pt-[9vh] px-4">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              index
              element={
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full min-h-[70vh] flex justify-center items-center">
                    <div className="w-full max-w-xl bg-white p-6 rounded shadow-md text-center">
                      <h2 className="text-xl font-semibold mb-6 flex justify-center items-center gap-2">
                        Welcome to Document Processing App <FaRegSmileBeam className="w-7 h-7" />
                      </h2>
                      <p className="text-gray-600">Please select a tab to continue.</p>
                    </div>
                  </div>
                </motion.div>
              }
            />

            <Route
              path="upload"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Upload />
                </motion.div>
              }
            />

            <Route
              path="review"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Review />
                </motion.div>
              }
            />

            <Route
              path="completed"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Completed />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Dashboard;
