import { Link } from "react-router-dom";
type User = {
  role: string;
};

type Props = {
  userInfo: User;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
};
const DropDown = ({ userInfo, setDropdownOpen, handleLogout }: Props) => {
  return (
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
          to="/admin"
          onClick={() => setDropdownOpen(false)}
          className="px-4 py-2 hover:bg-gray-100"
        >
          Admin
        </Link>
      )}

      <button
        onClick={handleLogout}
        className="px-4 py-2 hover:bg-gray-100 text-left text-primary"
      >
        Logout
      </button>
    </div>
  );
};

export default DropDown;
