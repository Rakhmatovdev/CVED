import HandPhotoUpload from "@/pages/immigrants/identify/modal/handupload/HandUpload.tsx";
import { HandUploadProps } from "@/pages/immigrants/type";
import { FingerLeft, FingerRight } from "./FingersIcon";

const HandUploader = ({ control }: HandUploadProps) => {
  return (
    <div className="flex justify-center gap-4">
      <div className="border dark:border-[#3A405A] p-4 rounded-2xl w-1/2 ">
        <h2 className="text-lg font-semibold mb-4">
          Отпечаток пальца (Левая рука)
        </h2>
        <div className="flex items-center justify-center relative">
          <HandPhotoUpload
            control={control}
            name="left_thumb"
            className="left-8 top-[100px]"
          />
          <HandPhotoUpload
            control={control}
            name="left_index"
            className="left-[102px] top-2"
          />
          <HandPhotoUpload
            control={control}
            name="left_middle"
            className="left-[155px] -top-2"
          />
          <HandPhotoUpload
            control={control}
            name="left_ring"
            className="left-[202px] top-2"
          />
          <HandPhotoUpload
            control={control}
            name="left_little"
            className="left-[244px] top-10"
          />
          <FingerLeft />
        </div>
      </div>
      <div className="relative border dark:border-[#3A405A] p-4 rounded-2xl w-1/2">
        <h2 className="text-lg font-semibold mb-4">
          Отпечаток пальца (Правая рука)
        </h2>
        <div className="flex items-center justify-center relative">
          <HandPhotoUpload
            control={control}
            name="right_thumb"
            className="right-8 top-[100px]"
          />
          <HandPhotoUpload
            control={control}
            name="right_index"
            className="right-[102px] top-2"
          />
          <HandPhotoUpload
            control={control}
            name="right_middle"
            className="right-[155px] -top-2"
          />
          <HandPhotoUpload
            control={control}
            name="right_ring"
            className="right-[202px] top-2"
          />
          <HandPhotoUpload
            control={control}
            name="right_little"
            className="right-[244px] top-10"
          />
          <FingerRight />
        </div>
      </div>
    </div>
  );
};

export default HandUploader;
