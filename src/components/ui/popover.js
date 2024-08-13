import React, { useState } from 'react';

// PopoverTrigger component
export const PopoverTrigger = ({ children, onClick }) => (
  <div onClick={onClick} className="cursor-pointer">
    {children}
  </div>
);

// PopoverContent component
export const PopoverContent = ({ children }) => (
  <div>
    {children}
  </div>
);

// Popover component
export const Popover = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === PopoverTrigger) {
            return React.cloneElement(child, { onClick: () => setIsOpen(!isOpen) });
          }
          if (child.type === PopoverContent && isOpen) {
            return (
              <div className="absolute bg-white border p-4 rounded shadow-lg mt-2 z-50">
                {child.props.children}
              </div>
            );
          }
          return child;
        }
        return null; // Safely return null if the child is not valid
      })}
    </div>
  );
};
