import { Input } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {  useNavigate } from "react-router";
import { InputReset } from "@/pages/auth/type";
import { AuthManager } from "@/shared/lib/auth-manager.ts";
import eyemy from "@/shared/ui/icons/sufix/eye.svg";
import eyemyo from "@/shared/ui/icons/sufix/eyeo.svg";
import gerb from "/logo/gerb.svg";

const token = AuthManager.getAccessToken();

export default function Reset() {
  // Helpers
  const { t } = useTranslation();
  const navigate = useNavigate();

  // States
  const [eyeShow, setEyeShow] = useState(false);
  const [eyeShow2, setEyeShow2] = useState(false);

  // Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<InputReset>();

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  if (token) return null;

  const onSubmit = (data: InputReset) => {
    console.log("Form ma’lumotlari:", data);
  };

  return (
    <div className="relative">
      <div className="video-container ">
        <video autoPlay loop muted className="background-video">
          <source
            src={
              "https://ovir-files.xdevs.uz/immigrant-media/media/videos/registon.gif"
            }
            type="video/mp4"
          />
          {t("login.video")}
        </video>
        <div className="z-20 absolute mx-auto w-full ">
          <section className="bg-transparent text-white">
            <div className="flex flex-col items-center justify-center md:h-screen lg:py-0">
              <div className="w-full rounded-2xl sm:max-w-[570px] xl:p-01">
                <div className="space-y-45 md:space-y-6 wrapper p-[100px]">
                  <div className="flex items-center justify-center gap-3">
                    <img src={gerb} alt="logo" className={"w-10 h-10"} />
                   Cyber
                  </div>
                  <div>
                    <h4 className="text-[28px] font-semibold text-center">
                      {t("login.new_password")}
                    </h4>
                    <h4 className="text-base mt-4 font-light text-center">
                      {t("placeholder.new_password")}
                    </h4>
                  </div>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="relative">
                      <label
                        htmlFor="floating_login"
                        className="text-sm font-medium"
                      >
                        {t("login.new_password")}
                      </label>
                      <Controller
                        name="password"
                        control={control}
                        rules={{
                          required: `${t("errors.password_confirmation")}`
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            status={errors.password ? "error" : ""}
                            id="floating_password"
                            className="!bg-transparent mt-2.5 px-4 py-3.5 placeholder:text-lighter placeholder:text-[18px] text-[15px] text-white font-medium border border-lighter  rounded-lg shinput"
                            placeholder={t("placeholder.password")}
                            type={eyeShow ? "text" : "password"}
                          />
                        )}
                      />
                      <img
                        src={eyeShow ? eyemyo : eyemy}
                        alt={eyeShow ? "Hide password" : "Show password"}
                        className={`text-xl text-white absolute bottom-5 right-4 cursor-pointer `}
                        onClick={() => setEyeShow((prev) => !prev)}
                      />
                      {errors.password && (
                        <span className="text-rose-500">
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="floating_password"
                        className="font-medium text-sm"
                      >
                        {t("login.password_confirm")}
                      </label>
                      <Controller
                        name="cpassword"
                        control={control}
                        rules={{
                          required: `${t("errors.password_confirmation")}`
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            status={errors.cpassword ? "error" : ""}
                            id="floating_cpassword"
                            className="!bg-transparent    mt-2.5 px-4 py-3.5 placeholder:text-lighter placeholder:text-[18px] text-[15px] text-white font-medium border border-lighter  rounded-lg shinput"
                            placeholder={t("placeholder.password")}
                            type={eyeShow2 ? "text" : "password"}
                          />
                        )}
                      />
                      <img
                        src={eyeShow2 ? eyemyo : eyemy}
                        alt={eyeShow2 ? "Hide password" : "Show password"}
                        className={`text-xl text-white absolute bottom-5 right-4 cursor-pointer `}
                        onClick={() => setEyeShow2((prev) => !prev)}
                      />
                      {errors.cpassword && (
                        <span className="text-rose-500">
                          {errors.cpassword.message}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={!watch("cpassword") || !watch("password")}
                      className="w-full text-white disabled:cursor-not-allowed bg-bluePrimary hover:bg-mediumBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-lighter disabled:hover:bg-lighter disabled:focus:ring-lighter"
                    >
                      {t("login.password_save")}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className={"absolute z-10 blur-sky"} />
    </div>
  );
}
