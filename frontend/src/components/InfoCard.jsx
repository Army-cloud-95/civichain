import React from 'react';

const InfoCard = ({ title, children }) => (
  <div 
    className="rounded-2xl p-6"
    style={{ backgroundColor: '#DBDFE9' }}
  >
    <h3 className="text-xl font-semibold mb-4" style={{ color: '#212121' }}>
      {title}
    </h3>
    {children}
  </div>
);

export default InfoCard; 