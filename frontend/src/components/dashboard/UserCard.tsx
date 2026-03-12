import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
interface Props {
  count?: number;
}
const UserCard = ({ count }: Props) => {
  return (
    <Link to="/admin/users">
      <div className="bg-transparent border-2 border-primary rounded-2xl p-6 flex flex-col items-center gap-4 hover:opacity-90 active:scale-[0.98] transition-all duration-200 cursor-pointer">
        <div className="bg-white/20 p-3 rounded-xl">
          <FiUser size={64} className="!text-primary " />
        </div>
        <div className="flex flex-col items-center">
          <p className="!text-primary  text-xs uppercase tracking-wide font-semibold">
            Total
          </p>
          <h3 className="!text-primary  text-2xl font-bold">Users</h3>
          {count !== undefined && (
            <p className="text-white/60 text-sm">{count} registered</p>
          )}
        </div>
      </div>
    </Link>
  );
};
export default UserCard;
