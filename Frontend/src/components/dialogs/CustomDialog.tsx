import { ReactNode } from "react";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import TextIconButton from "../buttons/TextIconButton";

interface IProps extends IPropsOfComponent {
  title: string | ReactNode;
  visible: boolean;
  setVisible: Function;
}

export default function CustomDialog({
  title = "",
  visible,
  setVisible,
  children,
}: IProps) {
  const closeDialog = () => {
    setVisible(false);
  };

  const handleVisible = () => {
    setVisible(!visible);
  };

  return (
    <Dialog
      open={visible}
      handler={handleVisible}
      className="flex flex-col items-center bg-[#fff] w-[500px] py-5"
    >
      <DialogHeader className="justify-between bg-[#fff] rounded-t-md text-[#444]">
        <h5>{title}</h5>
        <TextIconButton onClick={closeDialog}>
          <Icon icon="akar-icons:cross" className="text-xl" />
        </TextIconButton>
      </DialogHeader>
      <DialogBody className="w-full">{children}</DialogBody>
    </Dialog>
  );
}
