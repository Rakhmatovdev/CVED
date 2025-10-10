import ArrowLeftOutlined from "@ant-design/icons/ArrowLeftOutlined";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Flex, Modal, notification } from "antd";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useFetchMe } from "@/entities/auth/api/fetch-me.ts";
import { useFetchDistricts } from "@/entities/district/api/fetch-districts.ts";
import { useFetchRegions } from "@/entities/region/api/fetch-regions.ts";
import ChangePassword from "@/pages/profile/components/ChangePassword.tsx";
import ProfileService from "@/pages/profile/service";
import { ProfileValues } from "@/pages/profile/type";
import { CustomSelect } from "@/shared/ui/form-elements/CustomSelect";
import HFInput from "@/shared/ui/form-elements/HFInput";
import HFInputMask from "@/shared/ui/form-elements/HFInputMask";
import FRow from "@/shared/ui/form-elements/HFRow";
import UserCircleIcon from "@/shared/ui/icons/UserCircle.tsx";
import UserIcon from "@/shared/ui/icons/UserIcon.tsx";

const Profile = () => {
  // Helpers
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Form
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm<ProfileValues>({
    defaultValues: {
      first_name: "",
      last_name: "",
      middle_name: "",
      phone: "9989",
      username: "",
      region: null,
      district: null,
      role: ""
    }
  });

  // States
  const [showAdd, setShowAdd] = useState(false);
  // const [searchDistricts, setSearchDistricts] = useState("");
  const [originalValues, setOriginalValues] = useState<ProfileValues | null>(
    null
  );
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  // Queries
  const { data: user, isLoading: loading } = useFetchMe();
  const { options: districtOptions, setSearch: setDistrictsSearch } =
    useFetchDistricts({
      // search: searchDistricts,
      region: selectedRegion
    });
  const {
    options: regionOptions,
    isPending: pendingRegions,
    setSearch: setRegionsSearch
  } = useFetchRegions();
  useEffect(() => {
    setSelectedDistrict(null); // Region o'zgarganda distrikni tozalash
  }, [selectedRegion]);
  /// OLD
  // const { data: regions = { results: [] } } = useQuery({
  //   queryKey: ["regionsList", debouncedSearchRegions || "initial"],
  //   queryFn: () => HelperService.helperRegions(debouncedSearchRegions || "")
  // });
  // const { data: districts, refetch: refetchDistricts } = useQuery({
  //   queryKey: ["districts", searchDistricts, selectedRegion?.value],
  //   queryFn: () =>
  //     HelperService.helperDistricts(searchDistricts, 1, selectedRegion?.value),
  //   enabled: !!selectedRegion?.value
  // });

  // useEffect(() => {
  //   if (selectedRegion?.value) {
  //     setSearchDistricts("");
  //     refetchDistricts();
  //   }
  // }, [selectedRegion?.value]);

  useEffect(() => {
    if (user) {
      const userValues = {
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        middle_name: user.middle_name || "",
        district: user.district
          ? { label: user.district?.name, value: user.district?.id }
          : null,
        region: user.district?.region
          ? {
              label: user.district?.region?.name,
              value: user.district?.region?.id
            }
          : null,
        phone: user.phone || "9989",
        username: user.username || "",
        role: user.role || ""
      };

      reset(userValues);
      setOriginalValues(userValues); // Store original values
      setSrc(user.photo || null);
    }
  }, [user, reset]);

  // Helper function to get only changed fields
  const getChangedFields = (currentData: ProfileValues) => {
    if (!originalValues) return {};

    const changes: any = {};

    // Compare basic string fields
    const stringFields = [
      "first_name",
      "last_name",
      "middle_name",
      "username",
      "phone",
      "role"
    ];
    stringFields.forEach((field) => {
      const typedField = field as keyof ProfileValues;
      if (currentData[typedField] !== originalValues[typedField]) {
        changes[typedField] = currentData[typedField];
      }
    });

    if (file) {
      changes.photo = file;
    }

    if (currentData.password && currentData.password.trim() !== "") {
      changes.password = currentData.password;
    }

    return changes;
  };

  const updateMutation = useMutation({
    mutationFn: (data: any) => ProfileService.usersMeUpdate(data),
    mutationKey: ["user update"],
    onMutate: async (newUserData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["user", "me"] });

      // Snapshot of previous value
      const previousUser = queryClient.getQueryData(["user", "me"]);

      // Optimistically update to new value
      queryClient.setQueryData(["user", "me"], (old: any) => ({
        ...old,
        ...newUserData,
        photo: newUserData.photo
          ? URL.createObjectURL(newUserData.photo)
          : old?.photo
      }));

      // Return context with previous and new data
      return { previousUser, newUserData };
    },
    onSuccess: (data, _: any, __: any) => {
      // Update cache with server response
      queryClient.setQueryData(["user", "me"], data);

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(data));

      // Invalidate and refetch user queries to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["user"] });

      // Update original values with new data
      const newOriginalValues = {
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        middle_name: data.middle_name || "",
        district: data.district
          ? { label: data.district.name, value: data.district.id }
          : null,
        region: data.district?.region
          ? { label: data.district.region.name, value: data.district.region.id }
          : null,
        phone: data.phone || "9989",
        username: data.username || "",
        role: data.role || ""
      };
      setOriginalValues(newOriginalValues);

      setShowAdd(false);
      notification.success({
        message: t("profile.update_success", "Пользователь успешно обновлен")
      });
    },
    onError: (error: any, _, context) => {
      // Rollback on error
      if (context?.previousUser) {
        queryClient.setQueryData(["user", "me"], context.previousUser);
      }

      // Handle specific field errors from server
      if (typeof error === "object" && error !== null) {
        let hasFieldErrors = false;

        for (const key in error) {
          hasFieldErrors = true;

          // Set field-specific errors
          if (Array.isArray(error[key])) {
            setError(key as keyof ProfileValues, {
              type: "manual",
              message: error[key].join(" ")
            });
          } else if (typeof error[key] === "string") {
            setError(key as keyof ProfileValues, {
              type: "manual",
              message: error[key]
            });
          }
        }

        // Show notification with field-specific errors
        if (hasFieldErrors) {
          notification.error({
            message: t("profile.update_error", "Ошибка при обновлении профиля"),
            description: "Проверьте правильность заполнения полей"
          });
        } else {
          notification.error({
            message: t("profile.update_error", "Ошибка при обновлении профиля"),
            description: error?.message || "Попробуйте еще раз"
          });
        }
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure server state
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    }
  });

  const onSubmit = (data: ProfileValues) => {
    // Get only changed fields
    const changedFields = getChangedFields(data);

    // If no changes detected, show message and return
    if (Object.keys(changedFields).length === 0) {
      notification.info({
        message: t("notification.no_changes")
      });
      return;
    }

    console.log("Sending only changed fields:", changedFields); // For debugging
    updateMutation.mutate(changedFields);
  };

  const [src, setSrc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    inputRef.current?.click();
  };

  const handleImgChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (!files || files[0].size > 10 * 1024 * 1024) {
      notification.error({
        message: t("personal-information.limit-error", "Файл слишком большой")
      });
      return;
    }
    const url = URL.createObjectURL(files[0]);
    setSrc(url);
    setFile(files[0]);
  };

  return (
    <Flex
      vertical
      className="bg-[#F8FAFC] h-full w-full p-[24px] dark:bg-dbody"
    >
      <div
        onClick={() => navigate("/")}
        className="mb-4 flex items-center cursor-pointer"
      >
        <ArrowLeftOutlined className="text-[#3276FF] w-5 h-5 dark:text-dvalue" />
        <p className="text-sm dark:text-dvalue">{t("table.back")}</p>
      </div>

      {loading ? (
       <p>Loading...</p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 p-6 bg-[#FFF] dark:bg-dcontent rounded-2xl h-full"
        >
          <div className="flex flex-col items-center">
            <div
              onClick={handleAvatarClick}
              className="w-[160px] h-[160px] rounded-full overflow-hidden border dark:border-[#383E58] cursor-pointer"
            >
              {src ? (
                <img
                  src={src ?? ""}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCircleIcon className="dark:text-dvalue" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              hidden
              ref={inputRef}
              onChange={handleImgChange}
            />
          </div>

          <div className="text-[#1F2937] dark:text-dvalue text-center text-[24px] font-[600] leading-[30px]">
            {user?.username ?? "-"}
          </div>
          <div className="text-[#1F2937] dark:text-dvalue text-center text-[24px] font-[600] leading-[30px]">
            (
            {user?.groups
              ?.map((group: { id: number; name: string }) => group.name)
              .join(", ")}
            )
          </div>

          <div className="flex gap-4">
            <FRow label={t("inputs.name")}>
              <HFInput
                prefix={<UserIcon />}
                control={control}
                name="first_name"
                rules={{
                  required: t("form.required") || "Обязательное поле"
                }}
                status={errors.first_name ? "error" : ""}
                help={errors.first_name?.message}
              />
            </FRow>
            <FRow label={t("inputs.surname")}>
              <HFInput
                prefix={<UserIcon />}
                control={control}
                name="last_name"
                rules={{
                  required: t("form.required") || "Обязательное поле"
                }}
                status={errors.last_name ? "error" : ""}
                help={errors.last_name?.message}
              />
            </FRow>
            <FRow label={t("inputs.username")}>
              <HFInput
                prefix={<UserIcon />}
                control={control}
                name="username"
                placeholder={t("placeholder.username")}
                rules={
                  {
                    // required: t("form.required") || "Обязательное поле",
                    // minLength: {
                    //   value: 3,
                    //   message: "Username должен содержать минимум 3 символа"
                    // },
                    // pattern: {
                    //   value: /^[a-zA-Z0-9_.-]+$/,
                    //   message: "Username может содержать только буквы, цифры, точки, дефисы и подчеркивания"
                    // }
                  }
                }
                status={errors.username ? "error" : ""}
                help={errors.username?.message}
              />
            </FRow>
          </div>

          <div className="flex gap-4">
            <FRow label={t("inputs.sphone")}>
              <HFInputMask
                prefix={<UserIcon />}
                control={control}
                name="phone"
                // rules={{
                //   required: t("form.required") || "Обязательное поле",
                //   pattern: {
                //     value: /^998\d{9}$/,
                //     message: "Неверный формат номера телефона"
                //   }
                // }}
                // status={errors.sphone ? "error" : ""}
                // help={errors.sphone?.message}
              />
            </FRow>
            <FRow label={t("table.volley")}>
              <CustomSelect
                value={selectedRegion}
                loading={pendingRegions}
                // disabled
                onSearch={setRegionsSearch}
                options={regionOptions}
                placeholder={t("placeholder.citizenship")}
                onChange={(value: string) => setSelectedRegion(value)}
              />
            </FRow>
            <FRow label={t("table.village")}>
              <CustomSelect
                value={selectedDistrict}
                disabled={!selectedRegion}
                onChange={(value) => setSelectedDistrict(value)}
                onSearch={setDistrictsSearch}
                options={districtOptions}
                placeholder={t("placeholder.village")}
                // status={errors.district ? "error" : ""}
                // help={errors.district?.message}
              />
            </FRow>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              disabled={updateMutation.isPending}
              onClick={() => setShowAdd(true)}
              className="py-2 px-6 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("buttons.change_password")}
            </button>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="py-2 px-6 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {updateMutation.isPending && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {t("buttons.change")}
            </button>
          </div>
        </form>
      )}

      <Modal
        centered
        open={showAdd}
        title={
          <p className="dark:text-dvalue text-secondary">
            {t("buttons.change_password")}
          </p>
        }
        footer={null}
        className="rounded-2xl comfirm-modal7"
        onCancel={() => setShowAdd(false)}
      >
        <ChangePassword setShowAdd={setShowAdd} />
      </Modal>
    </Flex>
  );
};

export default Profile;
