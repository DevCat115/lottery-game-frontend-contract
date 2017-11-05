import { ReactNode } from "react";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  Spinner,
} from "@material-tailwind/react";

interface IProps extends IPropsOfComponent {
  visible: boolean;
  setVisible: Function;
}

export default function LoadingDialog({ visible, setVisible }: IProps) {
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
      <DialogHeader className="flex items-center bg-[#fff] rounded-t-md text-[#444]">
        <h5>Participating</h5>
      </DialogHeader>
      <DialogBody>
        <p className="text-[18px]">You are participating lottery game now.</p>
      </DialogBody>
      <Spinner />
    </Dialog>
  );
}
