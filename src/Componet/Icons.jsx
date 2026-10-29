const paths = {
  arrowDown: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />,
  arrowUpRight: <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H9.75m9.75 0v9.75" />,
  check: <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />,
  arrowUturn: <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 6 6v3" />,
}

function Icon({ name, size = 16, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={`icon ${className}`}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="1.8">{paths[name]}</g>
    </svg>
  )
}

export default Icon
