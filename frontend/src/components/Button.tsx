import React from 'react'

interface ButtonProps {
  variant?: 'filled' | 'outlined'
  iconPosition?: 'left' | 'right'
  icon?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ variant = "filled", iconPosition, icon, children, onClick }) => {
  const baseClasses = 'px-4 py-2 h-10 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
  const variantClasses = variant === 'filled'
    ? 'bg-primary text-white hover:bg-primary'
    : 'border border-primary text-primary hover:bg-primary-50'

  return (
    <button
      className={`${baseClasses} ${variantClasses} flex items-center justify-center`}
      onClick={onClick}
    >
      {iconPosition === 'left' && icon && <span className="mr-2">{icon}</span>}
      {children}
      {iconPosition === 'right' && icon && <span className="ml-2">{icon}</span>}
    </button>
  )
}

export default Button