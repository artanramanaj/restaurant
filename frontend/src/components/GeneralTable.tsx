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
  console.log("check the body", body);
  return (
    <div className="overflow-x-auto relative  ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-primary">
        <thead className="text-xs text-gray-700 uppercase bg-primary text-white ">
          <tr>
            {head.map((h, idx) => (
              <th key={idx} className="border px-2 py-1">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {body.map((product) => (
            <tr key={product._id} className="border">
              <td className="px-2 py-1">{product?.name}</td>
              <td className="px-2 py-1">{product?.category?.name}</td>
              <td className="px-2 py-1">{product?.price}</td>
              <td className="px-2 py-1">{product?.image}</td>
              <td className="px-2 py-1">{product?.price}</td>
              <td className="px-2 py-1">{product?.createdAt}</td>
              <td className="px-2 py-1">{product?.updatedAt}</td>
              <td className="px-2 py-1">{product?.__v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GeneralTable;
