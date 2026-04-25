'use client';

import { useState, useEffect } from 'react';

export default function OwnersOnly() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkOwner = async () => {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        setUser(null);
        return;
      }
      const userData = JSON.parse(userStr);
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