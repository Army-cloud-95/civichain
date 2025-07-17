import React from 'react';

const IssueCategorySelect = ({ value, onChange, name }) => (
  <div>
    <label 
      className="block font-medium mb-2 text-gray-700" 
      htmlFor="category"
    >
      Issue Category
    </label>
    <select
      id="category"
      name={name}
      value={value}
      onChange={onChange}
      className="form-input"
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