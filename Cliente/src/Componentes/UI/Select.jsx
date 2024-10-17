import { forwardRef } from "react";

export const Select = forwardRef(({ options, ...props }, ref) => (
  <select
    {...props}
    ref={ref}
    className="w-full bg-lime-900 text-lime-50 px-4 py-2 rounded-md"
  >
  </select>
));
