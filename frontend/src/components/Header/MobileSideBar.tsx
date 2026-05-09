import { Link } from "react-router-dom";
import { Navigation, DropDown } from "@/components";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import type { Dispatch, SetStateAction } from "react";

type MobileSideBarProps = {
  isOpen: boolean;
  onClose: () => void;
  dropdownOpen: boolean;
  setDropdownOpen: Dispatch<SetStateAction<boolean>>;
  handleLogout: () => Promise<void>;
};

const MobileSideBar = ({
  isOpen,
  onClose,
  dropdownOpen,
  setDropdownOpen,
  handleLogout,
}: MobileSideBarProps) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] md:hidden">
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
        aria-label="Close mobile menu"
      />

      <aside className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white p-5 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="rounded border px-3 py-1 text-sm"
            aria-label="Close"
          >
            X
          </button>
        </div>

        <div className="mb-6">
          <Navigation />
        </div>

        <div className="flex flex-col gap-3">
          {userInfo ? (
            <div className="relative w-fit">
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
              <Link to="/login" onClick={onClose}>
                Login
              </Link>
              <Link to="/register" onClick={onClose}>
                Register
              </Link>
            </>
          )}
        </div>
      </aside>
    </div>
  );
};

export default MobileSideBar;
