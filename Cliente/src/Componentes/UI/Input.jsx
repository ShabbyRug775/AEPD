import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="w-full bg-lime-900 text-lime-50 px-4 py-2 rounded-md"
  />
));