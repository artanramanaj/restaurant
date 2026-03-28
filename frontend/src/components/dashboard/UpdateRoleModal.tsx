type UpdateRoleModalProps = {
  id: string;
  show: boolean;
  onClose: () => void;
  onUpdate: (id: string) => void;
  role: string;
  isUpdating?: boolean;
};

const UpdateRoleModal: React.FC<UpdateRoleModalProps> = ({
  id,
  show,
  onClose,
  onUpdate,
  role,
  isUpdating = false,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-lightblack rounded-2xl shadow-lg w-full max-w-sm p-8">
        <h2 className="text-xl font-bold text-white mb-2">Change User Role</h2>
        <p className="text-sm text-gray-300 mb-6">
          Are you sure you want to{" "}
          <span className="text-primary-blue font-semibold">
            {role === "admin"
              ? "remove admin privileges from"
              : "make this user an admin"}
          </span>
          ? This will change their access level immediately.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => onUpdate(id)}
            disabled={isUpdating}
            className="px-4 py-2 rounded-lg bg-primary-blue text-white hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {isUpdating
              ? "Updating..."
              : role === "admin"
                ? "Remove Admin"
                : "Make Admin"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoleModal;
