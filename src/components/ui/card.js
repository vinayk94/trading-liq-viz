// src/components/ui/card.js
import React, { useState } from 'react';
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

export const Button = ({ children, onClick, className }) => (
  <button className={`btn ${className}`} onClick={onClick}>
    {children}
  </button>
);

export const InfoPopover = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="relative inline-block">
        <HelpCircle
          className="inline-block ml-2 w-4 h-4 text-gray-500 cursor-help"
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div className="absolute z-10 w-64 p-2 mt-2 text-sm leading-tight text-gray-700 transform -translate-x-1/2 bg-white border rounded shadow-lg">
            <h4 className="font-bold mb-1">{title}</h4>
            <p>{content}</p>
          </div>
        )}
      </div>
    );
  };
  