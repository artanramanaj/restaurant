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
const Header = () => {
  const { t } = useTranslation();
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
      toast.error(t("auth.logoutFailed"));
    }
  };
  if (isLoading) return <Spinner />;
  return (
    <div className="container grid grid-cols-[2fr_5fr_1fr] py-6 items-center gap-4">
      <img className="w-full h-[128px] object-cover" src={logo} alt="logo" />
      <Navigation />
      <div className="flex flex-col items-stretch justify-center gap-2 min-w-[9.5rem]">
        {userInfo ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex w-full items-center gap-2.5 rounded-2xl border-2 border-primary/20 bg-light-red px-3 py-2 hover:border-primary/50 transition-all"
              aria-expanded={dropdownOpen}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white uppercase">
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
              className="rounded-xl border-2 border-primary px-4 py-2 text-center text-sm font-semibold text-primary hover:bg-light-red transition-colors"
            >
              {t("auth.login")}
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-primary px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary active:scale-[0.98] transition-all"
            >
              {t("auth.register")}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
