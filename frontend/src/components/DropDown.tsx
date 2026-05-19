import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
};

type Props = {
  userInfo: User;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
};

const DropDown = ({ userInfo, setDropdownOpen, handleLogout }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-primary/15 bg-white shadow-xl z-50">
    

      <div className="flex flex-col p-1">
        <Link
          to="/profile"
          onClick={() => setDropdownOpen(false)}
          className="rounded-xl px-3 py-2.5 text-sm font-medium text-lightblack hover:bg-light-red transition-colors"
        >
          {t("dropdown.profile")}
        </Link>

        {userInfo.role === "admin" && (
          <Link
            to="/admin"
            onClick={() => setDropdownOpen(false)}
            className="rounded-xl px-3 py-2.5 text-sm font-medium text-lightblack hover:bg-light-red transition-colors"
          >
            {t("dropdown.admin")}
          </Link>
        )}

        <button
          type="button"
          onClick={handleLogout}
          className="mt-1 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-primary hover:bg-light-red transition-colors"
        >
          {t("dropdown.logout")}
        </button>
      </div>
    </div>
  );
};

export default DropDown;
