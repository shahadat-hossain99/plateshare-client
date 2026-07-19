const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all duration-300 focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20 ${className}`}
      {...props}
    />
  );
};

export default Input;
