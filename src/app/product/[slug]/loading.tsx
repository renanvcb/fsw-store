import { RotateCwIcon } from "lucide-react";

function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <RotateCwIcon className="animate-spin" size={32} />
    </div>
  );
}

export default Loading;
