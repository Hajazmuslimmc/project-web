'use client';

import { useState, useEffect } from 'react';

export default function OwnersOnly() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkOwner = async () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData && userData.rank === 'Owner') {
        setUser(userData);
      } else {
        setUser(null);
      }
    };
    checkOwner();
  }, []);

  if (!user) return <div>Access denied</div>;

  return (
    <div>
      <h1>Owner Panel</h1>
      {/* Admin functions */}
    </div>
  );
}