import { Navigation } from "@/components/index";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { clearCredentials } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogoutUserMutation } from "@/store/userApiSlice";
import { Spinner, DropDown } from "@/components";
import logo from "@/assets/images/logo.png";
import { FiMenu } from "react-icons/fi";
import MobileSideBar from "./Header/MobileSideBar";
const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const handleLogout = async () => {
    try {
      const { message } = await logoutUser().unwrap();
      setDropdownOpen(false);
      dispatch(clearCredentials());
      toast.success(message);
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };
  if (isLoading) return <Spinner />;
  return (
    <>
      <div className="container grid grid-cols-2 items-center gap-4 py-2 md:py-6 md:grid-cols-[2fr_5fr_1fr]">
        <img className="col-span-1 h-[120px] w-full object-cover md:h-[128px] md:w-full" src={logo} alt="logo" />

        <div className="hidden col-span-1 md:block">
          <Navigation />
        </div>

        <div className="hidden justify-end gap-4 md:flex">
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
                <DropDown
                  userInfo={userInfo}
                  setDropdownOpen={setDropdownOpen}
                  handleLogout={handleLogout}
                />
              )}
            </div>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>

        <button
          className="ml-auto rounded-md border p-2 md:hidden"
          onClick={() => setMobileSidebarOpen(true)}
          aria-label="Open mobile menu"
        >
          <FiMenu size={22} />
        </button>
      </div>

      <MobileSideBar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default Header;
