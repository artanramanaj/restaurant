import { TableData } from "@/components";
import { API_URL } from "@/config/api";
import { DeleteModal } from "@/components";
import { useState } from "react";
import { useDeleteProductMutation } from "@/store/productsApiSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDeleteCategoryMutation } from "@/store/categoriesApiSlice";
type Category = {
  _id: string;
  name: string;
  description: string;
};

type Props = {
  head: string[];
  body: Category[];
};

const CategoryTable = ({ head, body }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>("");
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();
  const toggleModal = (id: string) => {
    setShow(true);
    setCategoryId(id);
  };
  const removeCategory = async (id: string) => {
    try {
      const res = await deleteCategory(id).unwrap();
      toast.success(res.message);
      setShow(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong !");
    }
  };
  return (
    <div className="overflow-x-auto rounded-2xl  ">
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
          </tr>
        </thead>

        <tbody>
          {body.map((category, index) => (
            <tr
              key={category._id}
              className={`
                border-b border-[#EB2327]/30 transition-colors duration-150
                
                ${index % 2 === 0 ? "bg-lightblack" : "bg-[#1a1a1a]/90"}
              `}
            >
              <TableData data={category?._id} />
              <TableData data={category?.name} />
              <TableData data={category?.description} />

              <td className="px-5 py-3">
                <div className="flex items-center gap-2">
                  <Link to={`/admin/categories/edit/${category?._id}`}>
                    <button className="text-sm bg-white/5 hover:bg-white/10 text-white  px-3 py-2 rounded-lg  font-medium">
                      Edit
                    </button>
                  </Link>

                  <button
                    className="text-sm bg-primary text-gray-300   hover:text-white  px-3 py-2 rounded-lg transition-all duration-200 font-medium"
                    onClick={() => toggleModal(category?._id || "")}
                  >
                    Delete
                  </button>
                  <DeleteModal
                    id={categoryId || ""}
                    title="Delete Category"
                    show={show}
                    onClose={() => setShow(false)}
                    onDelete={removeCategory}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {body.length === 0 && (
        <div className="text-center py-12 text-primary bg-lightblack">
          No Categories found
        </div>
      )}
    </div>
  );
};

export default CategoryTable;
