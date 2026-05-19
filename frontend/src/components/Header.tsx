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
import { useTranslation } from "react-i18next";
import logo from "@/assets/images/logo.png";
import { FiMenu } from "react-icons/fi";
import MobileSideBar from "./Header/MobileSideBar";

const Header = () => {
  const { t } = useTranslation();
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
      toast.error(t("auth.logoutFailed"));
    }
  };
  if (isLoading) return <Spinner />;
  return (
    <>
      <div className="container grid grid-cols-2 items-center gap-4 py-2 md:grid-cols-[2fr_5fr_1fr] md:py-6">
        <img
          className="col-span-1 h-[120px] w-full object-cover md:h-[128px]"
          src={logo}
          alt="logo"
        />

        <div className="col-span-1 hidden md:block">
          <Navigation />
        </div>

        <div className="hidden min-w-[9.5rem] flex-col items-stretch justify-center gap-2 md:flex">
          {userInfo ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex w-full items-center gap-2.5 rounded-2xl border-2 border-primary/20 bg-light-red px-3 py-2 transition-all hover:border-primary/50"
                aria-expanded={dropdownOpen}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold uppercase text-white">
                  {userInfo.username.charAt(0)}
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-[0.65rem] leading-tight text-gray-500">
                    {t("dropdown.welcome")}
                  </span>
                  <span className="block truncate text-sm font-semibold text-lightblack">
                    {userInfo.username}
                  </span>
                </span>
                <span
                  className={`shrink-0 text-[0.6rem] text-primary transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
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
              <Link
                to="/login"
                className="rounded-xl border-2 border-primary px-4 py-2 text-center text-sm font-semibold text-primary transition-colors hover:bg-light-red"
              >
                {t("auth.login")}
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-primary px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-secondary active:scale-[0.98]"
              >
                {t("auth.register")}
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
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
