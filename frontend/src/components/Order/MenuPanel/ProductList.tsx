import { Product } from "@/components/index";
import pizzaPepperoni from "@/assets/images/pizza-pepperoni.webp";
import pizzaHam from "@/assets/images/pizza-ham.webp";

const products = [
  {
    id: 1,
    productImage: pizzaPepperoni,
    productName: "Pepperoni Pizza",
    productPrice: 9.99,
    productCategory: "pizza",
  },
  {
    id: 2,
    productImage: pizzaHam,
    productName: "Ham Pizza",
    productPrice: 8.99,
    productCategory: "pizza",
  },
  {
    id: 3,
    productImage: pizzaPepperoni,
    productName: "Doner Classic",
    productPrice: 6.99,
    productCategory: "doner",
  },
  {
    id: 4,
    productImage: pizzaHam,
    productName: "Doner Special",
    productPrice: 7.99,
    productCategory: "doner",
  },
  {
    id: 5,
    productImage: pizzaPepperoni,
    productName: "Doner Box",
    productPrice: 8.49,
    productCategory: "doner",
  },
  {
    id: 6,
    productImage: pizzaHam,
    productName: "Tost Classic",
    productPrice: 3.99,
    productCategory: "tost",
  },
  {
    id: 7,
    productImage: pizzaPepperoni,
    productName: "Tost Special",
    productPrice: 4.99,
    productCategory: "tost",
  },
  {
    id: 8,
    productImage: pizzaHam,
    productName: "Tost Ham & Cheese",
    productPrice: 4.49,
    productCategory: "tost",
  },
  {
    id: 9,
    productImage: pizzaPepperoni,
    productName: "Margherita Pizza",
    productPrice: 7.99,
    productCategory: "pizza",
  },
  {
    id: 10,
    productImage: pizzaHam,
    productName: "BBQ Pizza",
    productPrice: 10.99,
    productCategory: "pizza",
  },
  {
    id: 11,
    productImage: pizzaPepperoni,
    productName: "Doner Wrap",
    productPrice: 6.49,
    productCategory: "doner",
  },
  {
    id: 12,
    productImage: pizzaHam,
    productName: "Tost Veggie",
    productPrice: 3.49,
    productCategory: "tost",
  },
];

const ProductList = () => {
  return (
    <div className="grid grid-cols-2 gap-y-5 md:gap-y-10 gap-x-10 md:gap-x-20 md:grid-cols-3">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
