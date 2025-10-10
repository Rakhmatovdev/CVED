import type { FlexProps } from "antd";
import { Flex } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { CommonPageWrapperCard } from "@/shared/ui/CommonPageWrapperCard.tsx";
import DeleteIcon from "@/shared/ui/icons/DeleteIcon.tsx";

interface IProps extends FlexProps {
  title: string;
  onClear?: VoidFunction;
  hideClearButton?: boolean;
}

export function CommonPageFilterComponent({
  children,
  className,
  onClear,
  title,
  hideClearButton,
  ...props
}: IProps) {
  const { t } = useTranslation();

  return (
    <CommonPageWrapperCard vertical justify="end" className="border gap-4 p-4">
      <Flex justify="space-between" className="h-10">
        <h4 className="text-xl transition dark:text-white font-semibold">
          {title}
        </h4>
        <AnimatePresence>
          {!hideClearButton && (
            <motion.button
              onClick={onClear}
              className={`flex transition justify-center w-fit items-center my-border px-4 py-2 rounded-lg gap-2 shadow-sm dark:border-[#3A405A] `}
              initial={{ opacity: 0, x: -10 }} // Start slightly to the left and invisible
              animate={{ opacity: 1, x: 0 }} // Slide in and fade in
              exit={{ opacity: 0, x: -10 }} // Slide out and fade out
              transition={{ duration: 0.1, ease: "easeInOut" }} // Smooth transition
            >
              <DeleteIcon className="text-[#777E90]" />
              <p className="font-semibold text-[#777E90]">
                {t("statics.clear_filter")}
              </p>
            </motion.button>
          )}
        </AnimatePresence>
      </Flex>
      <Flex
        {...props}
        className={twMerge("grid gap-4  grid-cols-4", className)}
      >
        {children}
      </Flex>
    </CommonPageWrapperCard>
  );
}
