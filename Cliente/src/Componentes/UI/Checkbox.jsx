import { forwardRef } from "react";

export const Checkbox = forwardRef(({ label, checked, onChange }, ref) => (
    <label className="flex items-center cursor-pointer">
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            ref={ref}
            className="hidden"
        />
        <span className="w-4 h-4 border border-gray-300 rounded-md flex items-center justify-center mr-2">
            {checked && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-lime-900"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M7.293 10.293a1 1 0 011.414 0L10 11.586l1.293-1.293a1 1 0 011.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                    <path
                        fillRule="evenodd"
                        d="M2.293 5.293a1 1 0 011.414 0L10 12.586l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            )}
        </span>
        {label}
    </label>
));
