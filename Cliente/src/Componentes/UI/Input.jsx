import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="w-full bg-lime-10 text-lime-900 px-5 py-2 mb-5 rounded-lg text-xl"
  />
));