import { FC, MouseEventHandler } from "react";
import { ArrowLeft } from "lucide-react";

interface ArrowButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ArrowButton: FC<ArrowButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
    >
      <ArrowLeft className="w-6 h-6 text-black" />
    </button>
  );
};

export default ArrowButton;
