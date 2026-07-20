import React from 'react'

/**
 * AppLogo Component for BIZZ
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg' | 'xl'} props.size - Controls the dimension scale of the logo block
 * @param {boolean} props.animated - Enables the smooth continuous loop float effect
 * @param {string} props.className - Additional Tailwind utility classes for layout overrides
 */
function AppLogo({ size = 'md', animated = true, className = '' }) {
  // Dimension maps for the gradient box icon
  const boxSizes = {
    sm: 'h-8 w-8 text-base rounded-lg shadow-sm',
    md: 'h-10 w-10 text-lg rounded-xl shadow-md',
    lg: 'h-16 w-16 text-3xl rounded-2xl shadow-xl shadow-blue-500/10',
    xl: 'h-20 w-20 text-4xl rounded-2xl shadow-2xl shadow-blue-500/25 border border-blue-400/20'
  }

  // Dimension maps for the accompanying typography text
  const textSizes = {
    sm: 'text-lg font-bold tracking-tight',
    md: 'text-2xl font-black tracking-wider',
    lg: 'text-4xl font-black tracking-widest mt-2',
    xl: 'text-3xl font-black tracking-widest mt-2'
  }

  // Determine if it should display as side-by-side or stacked layout
  const isLargeLayout = size === 'lg' || size === 'xl'

  return (
    <div 
      className={`flex select-none items-center ${
        isLargeLayout ? 'flex-col justify-center' : 'flex-row gap-2.5'
      } group/logo cursor-pointer ${className}`}
    >
      {/* 3D Gradient Icon Box */}
      <div 
        className={`
          flex items-center justify-center 
          bg-gradient-to-tr from-blue-600 to-indigo-500 
          font-black tracking-tighter text-white 
          transition-all duration-500 ease-out 
          group-hover/logo:rotate-[360deg] group-hover/logo:scale-105
          ${boxSizes[size]}
          ${animated && size === 'xl' ? 'animate-bounce' : ''}
        `}
      >
        B
      </div>
      
      {/* Custom Typography Reveal Text */}
      <span 
        className={`
          bg-gradient-to-r from-white via-slate-200 to-slate-400 
          bg-clip-text text-transparent opacity-90
          transition-colors duration-300 group-hover/sidebar:text-slate-100
          ${textSizes[size]}
        `}
      >
        BIZZ
        {size === 'xl' && (
          <span className="text-blue-500 animate-ping inline-block ml-1">.</span>
        )}
      </span>
    </div>
  )
}

export default AppLogo