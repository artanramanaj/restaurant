import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthUserMutation } from "@/store/userApiSlice";
import {
  Spinner,
  WelcomeBack,
  EmailField,
  PasswordField,
  GoogleButton,
  RegisterLink,
} from "@/components";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { loginSchema } from "@/validations/loginSchema";

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authUser, { isLoading }] = useAuthUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await authUser(data).unwrap();
      dispatch(setCredentials(res.user));
      navigate("/");
      toast.success(res.message);
    } catch (error: any) {
      if (error?.data?.code === "UNVERIFIED_USER") {
        navigate("/verify");
      } else {
        toast.error(error?.data?.message);
      }
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-8 font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-primaryopacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="w-full max-w-md bg-lightblack rounded-2xl border border-white/10 shadow-2xl p-8 relative z-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <WelcomeBack />
          <EmailField register={register} errors={errors} />
          <PasswordField register={register} errors={errors} />
          <button
            type="submit"
            className="w-full bg-primary hover:bg-[#c91e21] active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl text-sm transition-all duration-200 mt-1 tracking-wide"
          >
            Sign In
          </button>
          <GoogleButton />
          <RegisterLink />
        </form>
      </div>
    </div>
  );
};

export default Login;
