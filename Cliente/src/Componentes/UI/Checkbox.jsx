import { forwardRef, useState, useEffect } from "react";

export const Checkbox = forwardRef(({ label, onChange, name, checked }, ref) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        ref={ref}
        name={name}
        className="hidden"
      />
      <span className="w-8 h-8 border border-lime-900 rounded-full flex items-center justify-center mr-2">
        {isChecked && (
          <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#003300"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 12l5 5l10 -10" />
        </svg>
        )}
      </span>
      {label}
    </label>
  );
});