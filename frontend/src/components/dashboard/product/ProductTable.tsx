import { TableData } from "@/components";
import { API_URL } from "@/config/api";
import { DeleteModal } from "@/components";
import { useState } from "react";
import { useDeleteProductMutation } from "@/store/productsApiSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
type Category = {
  _id: string;
  name: string;
};

type Product = {
  _id: string;
  name: string;
  category: Category;
  image: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type Props = {
  head: string[];
  body: Product[];
};

const ProductTable = ({ head, body }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const toggleModal = (id: string) => {
    setShow(true);
    setProductId(id);
  };
  const removeProduct = async (id: string) => {
    console.log("check the id in remove method", id);
    try {
      const res = await deleteProduct(id).unwrap();
      toast.success(res.message);
      setShow(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong !");
    }
  };
  console.log("productId", productId);
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
          {body.map((product, index) => (
            <tr
              key={product._id}
              className={`
                border-b border-[#EB2327]/10 transition-colors duration-150
                
                ${index % 2 === 0 ? "bg-lightblack" : "bg-[#1a1a1a]/90"}
              `}
            >
              <TableData data={product?._id} />
              <TableData data={product?.name} />

              <td className="px-5 py-3">
                <span className=" text-primary text-sm font-semibold px-2 py-1 rounded-full">
                  {product?.category?.name}
                </span>
              </td>

              <td className="px-5 py-3">
                <img
                  src={`${API_URL}/uploads/${product?.image}`}
                  alt={product?.name}
                  className="w-10 h-10 rounded-lg object-cover border border-[#EB2327]/20"
                />
              </td>
              <TableData data={`${product?.price}€`} />
              <TableData
                data={new Date(product?.createdAt).toLocaleDateString()}
              />
              <TableData
                data={new Date(product?.updatedAt).toLocaleDateString()}
              />

              <td className="px-5 py-3">
                <div className="flex items-center gap-2">
                  <Link to={`/admin/products/edit/${product?._id}`}>
                    <button className="text-sm bg-white/5 hover:bg-white/10 text-white  px-3 py-2 rounded-lg  font-medium">
                      Edit
                    </button>
                  </Link>

                  <button
                    className="text-sm bg-primary text-gray-300   hover:text-white  px-3 py-2 rounded-lg transition-all duration-200 font-medium"
                    onClick={() => toggleModal(product?._id || "")}
                  >
                    Delete
                  </button>
                  <DeleteModal
                    id={productId || ""}
                    title="Delete Product"
                    show={show}
                    onClose={() => setShow(false)}
                    onDelete={removeProduct}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {body.length === 0 && (
        <div className="text-center py-12 text-primary bg-lightblack">
          No products found
        </div>
      )}
    </div>
  );
};

export default ProductTable;
