import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productSchema } from "@/validations/productSchema";
import {
  ProductNameField,
  ProductPriceField,
  ProductImageField,
  ProductCategoryField,
} from "@/components";
import { useCreateProductMutation } from "@/store/productsApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type ProductForm = z.infer<typeof productSchema>;

const CreateProduct = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductForm) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", data.price.toString());
    formData.append("image", data.image[0]); // ← actual file
    try {
      await createProduct(formData).unwrap();
      toast.success("Product created successfully");
      navigate("/admin/products");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-8 font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-primary opacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl p-8 relative z-10">
        <h2 className="text-white text-2xl font-bold mb-6">Create Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <ProductNameField register={register} errors={errors} />
          <ProductCategoryField register={register} errors={errors} />
          <ProductImageField register={register} errors={errors} />
          <ProductPriceField register={register} errors={errors} />
          <button
            type="submit"
            className="w-full bg-primary hover:opacity-90 active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl text-sm transition-all duration-200 mt-1 tracking-wide"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
