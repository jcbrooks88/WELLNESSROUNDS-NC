type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary';
  };
  
  export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
    const base = 'rounded-2xl px-4 py-2 font-medium shadow-md transition-colors';
    const variants = {
      primary: 'bg-accentGreen hover:bg-paleMossHover text-white',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-neutralDark',
    };
  
    return (
      <button {...props} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </button>
    );
  }
  