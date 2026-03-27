import { useForm, Watch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productSchema } from "@/validations/productSchema";
import { useEffect } from "react";
import {
  EditProductNameField,
  EditProductPriceField,
  EditProductImageField,
  EditProductCategoryField,
  Spinner,
} from "@/components";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/store/productsApiSlice";
import { useGetCategoriesQuery } from "@/store/categoriesApiSlice";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
type ProductForm = z.infer<typeof productSchema>;
const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetProductQuery(id);
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();
  const { data: categoriesData, isLoading: categoryLoading } =
    useGetCategoriesQuery();
  console.log("check category data", categoriesData);
  console.log("check data data", data);
  Watch;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });
  const imageFile = watch("image");
  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        category: data.category,
        price: data.price,
      });
    }
  }, [data]);
  const onSubmit = async (formValues: ProductForm) => {
    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("category", formValues.category);
    formData.append("price", formValues.price.toString());

    if (imageFile instanceof FileList && imageFile.length > 0) {
      formData.append("image", imageFile[0]);
    } else {
      formData.append("image", data.image);
    }
    try {
      const res = await updateProduct({ id, newProduct: formData }).unwrap();
      toast.success(res.message);
      navigate("/admin/products");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };
  if (isLoading || updateLoading) return <Spinner />;
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-8 font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-primary opacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl p-8 relative z-10">
        <h2 className="text-white text-2xl font-bold mb-6">Edit Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <EditProductNameField register={register} errors={errors} />
          <EditProductCategoryField
            register={register}
            errors={errors}
            categories={categoriesData?.categories}
            categoryLoading={categoryLoading}
          />
          <EditProductImageField
            image={data.image}
            imageFile={imageFile}
            register={register}
            errors={errors}
          />
          <EditProductPriceField register={register} errors={errors} />
          <button
            type="submit"
            className="w-full bg-primary hover:opacity-90 active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl text-sm transition-all duration-200 mt-1 tracking-wide"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
