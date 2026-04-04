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
import logo2 from "@/assets/images/logo-2.png";
const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
    <div className="container grid grid-cols-[2fr_5fr_1fr] py-6 items-center gap-4">
      <img className="w-full h-[128px] object-cover" src={logo} alt="logo" />
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
    </div>
  );
};

export default Header;
