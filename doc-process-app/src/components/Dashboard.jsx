import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Upload from "./Upload";
import Review from "./Review";
import Completed from "./Completed";
import { IoMdLogOut } from "react-icons/io";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="w-full h-auto sm:h-[9vh] flex flex-col sm:flex-row sm:justify-between items-center gap-3 sm:gap-0 px-4 sm:px-[6%] py-4 sm:py-0 bg-gray-500 fixed top-0 z-50">
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-7">
          <Link
            to="/dashboard/upload"
            className="text-white font-semibold hover:text-black"
          >
            Upload
          </Link>
          <Link
            to="/dashboard/review"
            className="text-white font-semibold hover:text-black"
          >
            Review
          </Link>
          <Link
            to="/dashboard/completed"
            className="text-white font-semibold hover:text-black"
          >
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
      <div className="">
        <Routes>
          <Route path="upload" element={<Upload />} />
          <Route path="review" element={<Review />} />
          <Route path="completed" element={<Completed />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
