import React from 'react';

const TextInput = ({ label, id, name, value, onChange, placeholder }) => (
  <div>
    <label 
      className="block font-medium mb-2" 
      htmlFor={id}
      style={{ color: '#212121' }}
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
      className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all"
      style={{ 
        backgroundColor: '#F6F5FA', 
        border: '2px solid #DBDFE9',
        color: '#212121'
      }}
      onFocus={(e) => e.target.style.borderColor = '#EFF0A3'}
      onBlur={(e) => e.target.style.borderColor = '#DBDFE9'}
    />
  </div>
);

export default TextInput; 