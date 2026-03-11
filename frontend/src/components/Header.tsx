import { Navigation } from "@/components/index";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { clearCredentials } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearCredentials());
    toast.success("you are logged out");
    navigate("/login");
  };

  return (
    <div className="container grid grid-cols-[1fr_5fr_1fr] py-4 items-center gap-4">
      <h2>Logo</h2>
      <Navigation />
      <div className="flex gap-4 justify-end">
        {userInfo ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2"
            >
              Hi, {userInfo.username}
              <span className="text-xs">▼</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50 flex flex-col">
                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>

                {userInfo.role === "admin" && (
                  <Link
                    to="/admin/users"
                    onClick={() => setDropdownOpen(false)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    Admin
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 text-left text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
