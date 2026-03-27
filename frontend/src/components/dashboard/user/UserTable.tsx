import { TableData } from "@/components";
import { DeleteModal } from "@/components";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteUserMutation } from "@/store/userApiSlice";
import { Link } from "react-router-dom";
type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  head: string[];
  body: User[];
};

const UserTable = ({ head, body }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const toggleModal = (id: string) => {
    setShow(true);
    setUserId(id);
  };

  const removeUser = async (id: string) => {
    try {
      const res = await deleteUser(id).unwrap();
      toast.success(res.message);
      setShow(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-[#EB2327] text-white uppercase text-sm tracking-wider">
            {head.map((h, idx) => (
              <th
                key={idx}
                className="px-5 py-4 font-semibold whitespace-nowrap"
              >
                {h}
              </th>
            ))}
            <th className="px-5 py-4 font-semibold whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {body.map((user, index) => (
            <tr
              key={user._id}
              className={`
                border-b border-[#EB2327]/30 transition-colors duration-150
                ${index % 2 === 0 ? "bg-lightblack" : "bg-[#1a1a1a]/90"}
              `}
            >
              <TableData data={user?._id} />
              <TableData data={user?.username} />
              <TableData data={user?.email} />
              <TableData data={user?.role} />
              <td className="px-5 py-3">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${user?.isVerified ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                >
                  {user?.isVerified ? "Verified" : "Unverified"}
                </span>
              </td>
              <TableData
                data={new Date(user?.createdAt).toLocaleDateString()}
              />
              <TableData
                data={new Date(user?.updatedAt).toLocaleDateString()}
              />
              <td className="px-5 py-3">
                <div className="flex items-center gap-2">
                  <Link to={`/admin/users/edit/${user?._id}`}>
                    <button className="text-sm bg-white/5 hover:bg-white/10 text-white  px-3 py-2 rounded-lg  font-medium">
                      Edit
                    </button>
                  </Link>

                  <button
                    className="text-sm bg-primary text-gray-300   hover:text-white  px-3 py-2 rounded-lg transition-all duration-200 font-medium"
                    onClick={() => toggleModal(user?._id || "")}
                  >
                    Delete
                  </button>
                  <DeleteModal
                    id={userId || ""}
                    title="Delete User"
                    show={show}
                    onClose={() => setShow(false)}
                    onDelete={removeUser}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {body.length === 0 && (
        <div className="text-center py-12 text-primary bg-lightblack">
          No Users found
        </div>
      )}
    </div>
  );
};

export default UserTable;
