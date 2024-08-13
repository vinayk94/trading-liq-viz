// src/components/ui/card.js
import React,  { useState }  from 'react';
//import { Popover, PopoverTrigger, PopoverContent } from './components/ui/popover';
import { HelpCircle } from 'lucide-react';


export const Card = ({ children, className }) => (
    <div className={`shadow-lg rounded-lg p-4 bg-white ${className}`}>{children}</div>
  );
  
  export const CardHeader = ({ children }) => (
    <div className="border-b pb-2 mb-4">
      {children}
    </div>
  );
  
  export const CardContent = ({ children }) => (
    <div>
      {children}
    </div>
  );

export const Slider = ({ min, max, value, onChange, className }) => (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      className={`slider ${className}`}
    />
);

// Add the other components here
export const Button = ({ children, onClick }) => (
  <button className="btn" onClick={onClick}>
    {children}
  </button>
);

export const Tabs = ({ children }) => <div className="tabs">{children}</div>;
export const TabsList = ({ children }) => <div className="tabs-list">{children}</div>;
export const TabsTrigger = ({ children, onClick }) => (
  <button className="tabs-trigger" onClick={onClick}>
    {children}
  </button>
);
export const TabsContent = ({ children }) => <div className="tabs-content">{children}</div>;



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


export const InfoPopover = ({ title, content }) => (
  <Popover>
    <PopoverTrigger>
    {/* Use a simple text character to test */}
    <span className="inline-block ml-2 w-4 h-4 text-gray-500 cursor-help">?</span>
    </PopoverTrigger>

    <PopoverContent>
      <h4 className="font-bold mb-2">{title}</h4>
      <p className="text-sm">{content}</p>
    </PopoverContent>
  </Popover>
);

//export default InfoPopover;

