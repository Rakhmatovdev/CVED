import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { makeSchema } from "@/pages/profile/schema";
import ProfileService from "@/pages/profile/service";
import { ChangeFormValues, ChangePasswordProps } from "@/pages/profile/type";
import HFPassword from "@/shared/ui/form-elements/HFPassword";
import FRow from "@/shared/ui/form-elements/HFRow";

const ChangePassword = ({ setShowAdd }: ChangePasswordProps) => {
  const { t } = useTranslation();
  const schema = makeSchema(t);

  const { handleSubmit, control, watch, setError, reset } =
    useForm<ChangeFormValues>({
      mode: "onChange",
      resolver: zodResolver(schema),
      defaultValues: {
        old_password: "",
        new_password: "",
        new_password_confirmation: ""
      }
    });

  const newPassword = watch("new_password") || "";

  const isDisabled =
    !watch("old_password") ||
    !newPassword ||
    !watch("new_password_confirmation") ||
    newPassword !== watch("new_password_confirmation");

  const updateMutation = useMutation({
    mutationFn: (data: Omit<ChangeFormValues, "new_password_confirmation">) =>
      ProfileService.userChangePassword(data),
    mutationKey: ["user change password"],
    onSuccess: () => {
      setShowAdd(false);
      reset();
      notification.success({
        message: t("notification.password_change_success")
      });
    },
    onError: (error: any) => {
      if (typeof error === "object" && error !== null) {
        Object.entries(error).forEach(([key, value]) => {
          setError(key as keyof ChangeFormValues, {
            type: "manual",
            message: Array.isArray(value) ? value.join(" ") : String(value)
          });
        });
      }

      // notification.error({
      //   message: t("errors.title"),
      //   description: t("notification.password_change_failed"),
      // });
    }
  });

  const onSubmit = (data: ChangeFormValues) => {
    // biome-ignore lint: lint/suspicious/noUnusedVariables
    const { new_password_confirmation, ...submitData } = data;
    updateMutation.mutate(submitData);
  };

  return (
    <section className="bg-transparent p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FRow label={t("login.password_old")} required>
          <HFPassword
            placeholder={t("placeholder.password")}
            name="old_password"
            control={control}
          />
        </FRow>

        <FRow label={t("login.create_password")} required>
          <HFPassword
            placeholder={t("placeholder.password")}
            name="new_password"
            control={control}
          />
        </FRow>

        <FRow label={t("login.password_confirm")} required>
          <HFPassword
            placeholder={t("placeholder.password")}
            name="new_password_confirmation"
            control={control}
          />
        </FRow>

        <button
          type="submit"
          disabled={isDisabled || updateMutation.isPending}
          className="w-full text-white disabled:cursor-not-allowed bg-[#2563EB] hover:bg-[#1563EB] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-[#6B7280] disabled:hover:bg-[#6A7280] disabled:focus:ring-[#6A7280]"
        >
          {updateMutation.isPending ? t("buttons.saving") : t("buttons.save")}
        </button>
      </form>
    </section>
  );
};

export default ChangePassword;
