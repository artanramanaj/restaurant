import React from "react";

type DeleteModalProps = {
  id: string;
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  description?: string;
  isDeleting?: boolean;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  id,
  show,
  onClose,
  onDelete,
  title = "Delete Item",
  description = "Are you sure? This action cannot be undone.",
  isDeleting = false,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-lightblack rounded-2xl shadow-lg w-full max-w-sm p-8">
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-sm text-gray-300 mb-6">{description}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => onDelete(id)}
            disabled={isDeleting}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
