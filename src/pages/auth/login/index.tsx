import { Input, InputRef, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {  useNavigate } from "react-router";
import { LoginInputs } from "src/pages/auth/type";
import { useDebounce } from "use-debounce";
import { usePostLogin } from "@/entities/auth/api/post-login.ts";
import { AuthManager } from "@/shared/lib/auth-manager.ts";
import eyemy from "@/shared/ui/icons/sufix/eye.svg";
import eyemyo from "@/shared/ui/icons/sufix/eyeo.svg";
import eovir from "/logo/EOVIRL.svg";
import gerb from "/logo/gerb.svg";

export default function Login() {
  // Helpers
  const { t } = useTranslation();
  const navigate = useNavigate();
  const usernameRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);

  // States
  const [eyeShow, setEyeShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm<LoginInputs>();

  const watchedUsername = useWatch({ control, name: "username" });
  const watchedPassword = useWatch({ control, name: "password" });
  const [debouncedUsername] = useDebounce(watchedUsername, 200);
  const [debouncedPassword] = useDebounce(watchedPassword, 200);

  // Effects
  useEffect(() => {
    const checkAuthStatus = () => {
      if (AuthManager.getAccessToken()) {
        navigate("/", { replace: true });
      } else {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [navigate]);

  useEffect(() => {
    if (!isLoading) {
      usernameRef.current?.focus();
    }
  }, [isLoading]);

  // Queries
  const { mutateAsync: postLogin, isPending } = usePostLogin();

  // Functions
  const onSubmit = (data: LoginInputs) => {
    import("@/pages/dashboard");
    clearErrors();
    postLogin(data).catch((error) => {
      const responseData = error.response?.data;
      // Umumiy xatolik xabari
      if (responseData?.message) {
        setError("username", { type: "manual", message: responseData.message });
      }
      // else if (responseData?.detail) {
      //   setError("username", { type: "manual", message: responseData.detail });
      // }
      else {
        setError("username", {
          type: "manual",
          message: "Неверный логин или пароль"
        });
      }
    });
  };

  // Agar token mavjud bo'lsa yoki loading holatida bo'lsa
  if (isLoading) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="video-container">
        <video
          autoPlay
          loop
          muted
          preload="none"
          className="background-video object-cover h-[100vh] w-[100vw]"
        >
          <source src={"/static/registon.mp4"} type="video/mp4" />
          {t("login.video")}
        </video>

        <div className="z-20 absolute mx-auto w-full">
          <section className="bg-transparent text-white">
            <div className="flex flex-col items-center justify-center md:h-screen lg:py-0">
              <div className="w-full rounded-2xl sm:max-w-[570px] xl:p-0">
                <div className="space-y-6 wrapper px-[100px] py-20">
                  <div className="flex items-center justify-center gap-3">
                    <img height={32} width={32} src={gerb} alt="logo" />
                    <img src={eovir} alt="eovir" />
                  </div>

                  <form
                    className="space-y-4 md:space-y-5"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div>
                      <label
                        htmlFor="floating_login"
                        className="text-sm font-medium"
                      >
                        {t("login.email")}
                      </label>
                      <Controller
                        name="username"
                        control={control}
                        rules={{ required: t("errors.email") }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            ref={usernameRef}
                            onPressEnter={() => passwordRef.current?.focus()}
                            onChange={(e) => {
                              field.onChange(e);
                              clearErrors("username");
                            }}
                            status={errors.username ? "error" : ""}
                            id="floating_login"
                            size="large"
                            className="!bg-transparent mt-2.5 py-2.5 placeholder:text-[15px] placeholder:text-lighter !text-white font-medium border border-lighter focus:border-blued rounded-lg shinput"
                            placeholder={t("placeholder.email")}
                            disabled={isPending}
                          />
                        )}
                      />
                      {errors.username && (
                        <span className="text-rose-500">
                          {errors.username.message}
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <div className="flex items-center justify-between text-sm font-medium">
                        <label
                          htmlFor="floating_password"
                          className="font-medium"
                        >
                          {t("login.password")}
                        </label>
                      </div>
                      <div className="relative">
                        <Controller
                          name="password"
                          control={control}
                          rules={{ required: t("errors.password") }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              ref={passwordRef}
                              onChange={(e) => {
                                field.onChange(e);
                                clearErrors("password");
                              }}
                              status={errors.password ? "error" : ""}
                              id="floating_password"
                              size="large"
                              className="!bg-transparent mt-2.5 py-2.5 placeholder:text-lighter placeholder:text-[15px] text-[15px] text-white font-medium border border-lighter rounded-lg shinput"
                              placeholder={t("login.password_confirm")}
                              type={eyeShow ? "text" : "password"}
                              disabled={isPending}
                              onPressEnter={handleSubmit(onSubmit)}
                            />
                          )}
                        />
                        <button
                          onClick={() => setEyeShow((prev) => !prev)}
                          className="absolute bottom-2.5 right-2.5 cursor-pointer w-6 h-6 rounded-full flex justify-center items-center"
                        >
                          <img
                            src={eyeShow ? eyemyo : eyemy}
                            alt={eyeShow ? "Hide password" : "Show password"}
                            className="text-xl text-white"
                          />
                        </button>
                      </div>
                      {errors.password && (
                        <span className="text-rose-500">
                          {errors.password.message}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={
                        !debouncedUsername || !debouncedPassword || isPending
                      }
                      className="w-full text-white bg-bluePrimary hover:bg-mediumBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-3 text-center disabled:cursor-not-allowed disabled:bg-lighter disabled:hover:bg-lighter disabled:focus:ring-lighter"
                    >
                      {isPending ? (
                        <div className="flex items-center justify-center gap-2">
                          <Spin size="small" />
                          {t("login.login")}
                        </div>
                      ) : (
                        t("login.login")
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="absolute z-10 blur-sky" />

    </div>
  );
}
