import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { FiUser, FiMail, FiEye, FiEyeOff } from "react-icons/fi";
import type { RootState } from "@/store/store";
import { clearCredentials, setCredentials } from "@/store/authSlice";
import {
  useLogoutUserMutation,
  useUpdateProfileMutation,
} from "@/store/userApiSlice";
import { Spinner } from "@/components";
import {
  profileSchema,
  type ProfileForm,
} from "@/validations/profileSchema";

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutUserMutation();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    values: userInfo
      ? {
          username: userInfo.username,
          email: userInfo.email,
          password: "",
          passwordConfirmation: "",
        }
      : undefined,
  });

  const onSubmit = async (data: ProfileForm) => {
    try {
      const res = await updateProfile({
        username: data.username,
        ...(data.password ? { password: data.password } : {}),
      }).unwrap();

      dispatch(setCredentials(res.user));
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  const handleLogout = async () => {
    try {
      const { message } = await logoutUser().unwrap();
      dispatch(clearCredentials());
      toast.success(message);
      navigate("/login");
    } catch {
      toast.error(t("auth.logoutFailed"));
    }
  };

  if (isLoggingOut || isUpdating) return <Spinner />;
  if (!userInfo) return null;

  return (
    <div className="min-h-screen bg-light-red py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl border border-primary/15 shadow-xl overflow-hidden">
          <div className="bg-primary px-8 py-8 text-center text-white">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl font-bold uppercase">
              {userInfo.username.charAt(0)}
            </span>
            <h1 className="mt-3 text-xl font-bold">{t("dropdown.profile")}</h1>
            <p className="mt-1 text-sm text-white/80 capitalize">
              {userInfo.role}
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-8 py-8 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Username
              </label>
              <div className="flex items-center border border-gray-200 rounded-xl px-4 gap-3 focus-within:border-primary focus-within:shadow-[0_0_0_3px_#EB232720] transition-all">
                <FiUser className="text-gray-400 shrink-0" size={16} />
                <input
                  {...register("username")}
                  type="text"
                  className="flex-1 py-3 text-sm text-lightblack outline-none"
                />
              </div>
              {errors.username && (
                <p className="text-primary text-xs">{errors.username.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Email
              </label>
              <div className="flex items-center border border-gray-200 rounded-xl px-4 gap-3 bg-gray-50">
                <FiMail className="text-gray-400 shrink-0" size={16} />
                <input
                  {...register("email")}
                  type="email"
                  readOnly
                  disabled
                  className="flex-1 py-3 text-sm text-gray-500 outline-none cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Password
              </label>
              <div className="flex items-center border border-gray-200 rounded-xl px-4 gap-3 focus-within:border-primary focus-within:shadow-[0_0_0_3px_#EB232720] transition-all">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Leave blank to keep current"
                  className="flex-1 py-3 text-sm text-lightblack placeholder-gray-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-primary text-xs">{errors.password.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Confirm Password
              </label>
              <div className="flex items-center border border-gray-200 rounded-xl px-4 gap-3 focus-within:border-primary focus-within:shadow-[0_0_0_3px_#EB232720] transition-all">
                <input
                  {...register("passwordConfirmation")}
                  type={showPasswordConfirmation ? "text" : "password"}
                  placeholder="Repeat new password"
                  className="flex-1 py-3 text-sm text-lightblack placeholder-gray-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswordConfirmation(!showPasswordConfirmation)
                  }
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  {showPasswordConfirmation ? (
                    <FiEyeOff size={16} />
                  ) : (
                    <FiEye size={16} />
                  )}
                </button>
              </div>
              {errors.passwordConfirmation && (
                <p className="text-primary text-xs">
                  {errors.passwordConfirmation.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-secondary active:scale-[0.98]"
            >
              Update Profile
            </button>

            <div className="flex flex-col gap-3 pt-2 border-t border-gray-100">
              {userInfo.role === "admin" && (
                <Link
                  to="/admin"
                  className="w-full rounded-xl border-2 border-primary px-4 py-3 text-center text-sm font-semibold text-primary transition-colors hover:bg-light-red"
                >
                  {t("dropdown.admin")}
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-xl border-2 border-primary/30 px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-light-red"
              >
                {t("dropdown.logout")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
