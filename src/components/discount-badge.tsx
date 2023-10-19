import { ArrowDownIcon } from "lucide-react";
import { Badge, BadgeProps } from "./ui/badge";
import { twMerge } from "tailwind-merge";

function DiscountBadge({ children, className, ...props }: BadgeProps) {
  return (
    <Badge className={twMerge("px-2 py-[0.125rem]", className)} {...props}>
      <ArrowDownIcon size={14} /> {children}%
    </Badge>
  );
}

export default DiscountBadge;
