import React from 'react';

export const Button = ({ children, onClick, style, hoverStyle }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...style,
        ...(isHovered && hoverStyle)
      }}
    >
      {children}
    </button>
  );
}; 