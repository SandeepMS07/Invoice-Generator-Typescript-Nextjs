import React from "react";

type InputProps = {
  type: string;
  placeholder: string;
  name: string;
  id: string;
  title: string;
  value: string;
  onChange: any;
  error?: any;
};

const Input = ({
  type,
  placeholder,
  name,
  id,
  title,
  value,
  onChange,
  error,
}: InputProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-gray-700 text-xs font-bold mb-1"
      >
        {title}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        id={id}
        className="block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none border-gray-400 placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl"
      />
      <p className="text-red-600 text-xs mb-2">{error.message}</p>
    </div>
  );
};

export default Input;
