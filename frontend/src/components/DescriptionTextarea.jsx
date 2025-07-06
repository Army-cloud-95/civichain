import React from 'react';

const DescriptionTextarea = ({ label, id, name, value, onChange, rows, placeholder }) => (
  <div>
    <label 
      className="block font-medium mb-2" 
      htmlFor={id}
      style={{ color: '#212121' }}
    >
      {label}
    </label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all resize-none"
      style={{ 
        backgroundColor: '#F6F5FA', 
        border: '2px solid #DBDFE9',
        color: '#212121'
      }}
      onFocus={(e) => e.target.style.borderColor = '#EFF0A3'}
      onBlur={(e) => e.target.style.borderColor = '#DBDFE9'}
    ></textarea>
  </div>
);

export default DescriptionTextarea; 