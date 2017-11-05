import { Button } from "@material-tailwind/react";


export default function TextButton({ className = '', children, ...others }: IPropsOfComponent) {
  return (
    <Button
      variant="text"
      className={`rounded-md normal-case text-sm font-normal text-gray-100 px-4 py-2 hover:bg-gray-100 hover:bg-opacity-10 active:bg-gray-100 active:bg-opacity-10 ${className}`}
      {...others}
    >
      {children}
    </Button>
  )
}