// src/components/ui/card.js
import React from 'react';

export const Card = ({ children, className }) => (
  <div className={`card ${className}`}>{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className="card-header">{children}</div>
);

export const CardContent = ({ children }) => (
  <div className="card-content">{children}</div>
);

export const Slider = ({ min, max, value, onChange }) => (
  <input
    type="range"
    min={min}
    max={max}
    value={value}
    onChange={onChange}
    className="slider"
  />
);
