'use client';

import { useState, useEffect } from 'react';

export default function Capes() {
  const [capes, setCapes] = useState([]);

  useEffect(() => {
    const fetchCapes = async () => {
      const response = await fetch('/api/capes');
      const data = await response.json();
      setCapes(data);
    };
    fetchCapes();
  }, []);

  return (
    <div>
      <h1>Capes</h1>
      {capes.map(cape => (
        <div key={cape.id}>
          <img src={cape.imageUrl} alt={cape.name} />
          <p>{cape.name} by {cape.creatorId}</p>
          <p>Status: {cape.status}</p>
          {cape.status === 'approved' && <p>Cape Number: {cape.capeNumber}</p>}
        </div>
      ))}
    </div>
  );
}