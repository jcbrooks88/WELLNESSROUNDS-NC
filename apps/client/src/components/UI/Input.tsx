type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 rounded-md border border-inputBorder bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-accentGreen ${className}`}
    />
  );
}
