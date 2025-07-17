import React from 'react';

const TextInput = ({ label, id, name, value, onChange, placeholder }) => (
  <div>
    <label 
      className="block font-medium mb-2 text-gray-700" 
      htmlFor={id}
    >
      {label}
    </label>
    <input
      type="text"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="form-input"
    />
  </div>
);

export default TextInput; 