import React from "react";

interface InputProps {
  Icon?: React.ElementType;
  placeholder?: string;
  styles?: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  Icon,
  placeholder,
  styles,
  onChange,
  type,
  value,
}: InputProps) => {
  return (
    <div
      // Removed {styles} from this div
      className={`flex gap-2 focus-within:ring-2 px-2 py-1 focus-within:ring-primary rounded-full border-b-1 focus-within:border-0 mb-5`}
    >
      {Icon ? <Icon className="text-secondary" /> : null}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        className={`outline-none placeholder-text w-full ${styles}`}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
