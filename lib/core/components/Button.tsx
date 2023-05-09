'use client';

interface ButtonProps {
  style: 'primary' | 'secondary' | 'link';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  style,
  onClick,
  disabled
}: ButtonProps) {
  if (style === 'secondary') {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
        {children}
      </button>
    );
  }

  if (style === 'link') {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className="text-black background-transparent"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
      {children}
    </button>
  );
}
