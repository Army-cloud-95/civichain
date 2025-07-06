import React from 'react';

const IssueCategorySelect = ({ value, onChange, name }) => (
  <div>
    <label 
      className="block font-medium mb-2" 
      htmlFor="category"
      style={{ color: '#212121' }}
    >
      Issue Category
    </label>
    <select
      id="category"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all"
      style={{ 
        backgroundColor: '#F6F5FA', 
        border: '2px solid #DBDFE9',
        color: '#212121'
      }}
      onFocus={(e) => e.target.style.borderColor = '#EFF0A3'}
      onBlur={(e) => e.target.style.borderColor = '#DBDFE9'}
    >
      <option value="">Select a category</option>
      <option value="infrastructure">Infrastructure</option>
      <option value="sanitation">Sanitation</option>
      <option value="safety">Public Safety</option>
      <option value="environment">Environment</option>
      <option value="other">Other</option>
    </select>
  </div>
);

export default IssueCategorySelect; 