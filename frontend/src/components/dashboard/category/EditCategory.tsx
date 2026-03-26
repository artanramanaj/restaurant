import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { categorySchema } from "@/validations/categorySchema";
import {
  EditCategoryDescriptionField,
  EditCategoryNameField,
  Spinner,
} from "@/components";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateCategoryMutation,
  useGetCategoryQuery,
} from "@/store/categoriesApiSlice";
import { useEffect } from "react";

type CategoryForm = z.infer<typeof categorySchema>;

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading: categoryLoading } = useGetCategoryQuery(id);
  const [updateCategory, { isLoading: updateLoading }] =
    useUpdateCategoryMutation();
  console.log("data", data);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data?.category?.name,
        description: data?.category?.description,
      });
    }
  }, [data]);

  const onSubmit = async (formValues: CategoryForm) => {
    console.log("check the form values", formValues);
    try {
      const res = await updateCategory({ id, newProduct: formValues }).unwrap();
      toast.success(res.message);
      navigate("/admin/categories");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  if (categoryLoading || updateLoading) return <Spinner />;

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-8 font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-primary opacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl p-8 relative z-10">
        <h2 className="text-white text-2xl font-bold mb-6">Update Category</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <EditCategoryNameField register={register} errors={errors} />
          <EditCategoryDescriptionField register={register} errors={errors} />
          <button
            type="submit"
            className="w-full bg-primary hover:opacity-90 active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl text-sm transition-all duration-200 mt-1 tracking-wide"
          >
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
