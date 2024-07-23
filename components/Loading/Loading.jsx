import { LoaderIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <LoaderIcon className="animate-spin" />
    </div>
  );
}
