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

const GeneralTable = ({ head, body }: Props) => {
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
                
                ${index % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#1a1a1a]/90"}
              `}
            >
              <td className="px-5 py-3 text-white font-medium">
                {product?._id}
              </td>
              <td className="px-5 py-3 text-white font-medium">
                {product?.name}
              </td>
              <td className="px-5 py-3">
                <span className=" text-primary text-sm font-semibold px-2 py-1 rounded-full">
                  {product?.category?.name}
                </span>
              </td>
              <td className="px-5 py-3 text-white font-semibold">
                ${product?.price}
              </td>
              <td className="px-5 py-3">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-10 h-10 rounded-lg object-cover border border-[#EB2327]/20"
                />
              </td>
              <td className="px-5 py-3 text-white text-sm">
                {new Date(product?.createdAt).toLocaleDateString()}
              </td>
              <td className="px-5 py-3 text-white text-sm">
                {new Date(product?.updatedAt).toLocaleDateString()}
              </td>
              <td className="px-5 py-3">
                <div className="flex items-center gap-2">
                  <button className="text-sm bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white  px-3 py-2 rounded-lg  font-medium">
                    Edit
                  </button>
                  <button className="text-sm bg-[#EB2327] text-gray-300   hover:text-white  px-3 py-2 rounded-lg transition-all duration-200 font-medium">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {body.length === 0 && (
        <div className="text-center py-12 text-primary bg-[#1a1a1a]">
          No products found
        </div>
      )}
    </div>
  );
};

export default GeneralTable;
