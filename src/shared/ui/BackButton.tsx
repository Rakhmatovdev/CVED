import { useNavigate } from "react-router";
import { cn } from "@/shared/lib/utils.ts";
import ArrowLeftIcon from "@/shared/ui/icons/pagination/ArrowLeft";
import Button, { type IButtonProps } from "./Button";

const BackButton = (props: IButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="ghost"
      onClick={() => navigate(-1)}
      {...props}
      className={cn("my-4 !transition", props.className)}
    >
      <ArrowLeftIcon className="text-bluePrimary transition" />
      Назад
    </Button>
  );
};

export default BackButton;
