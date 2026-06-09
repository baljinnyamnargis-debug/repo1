import Image from "next/image";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {} 

const Input = ({ ...props }: InputProps) => {
  return (
    
    <input
 
      {...props}
  
      className={`border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className}`}
    />
  );
};

export default Input;