'use client';

import { useState, useEffect } from 'react';

export default function CreateCape() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check user rank
    const checkRank = async () => {
      // TODO: Fetch user from session/API
      const response = await fetch('/api/user');
      const data = await response.json();
      if (data.rank in ['Caper', 'Free+', 'Creator', 'Owner']) {
        setUser(data);
      } else {
        setMessage('Insufficient rank to create capes');
      }
    };
    checkRank();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('userId', user.id);

    const response = await fetch('/api/createCape', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    setMessage(result.message);
  };

  if (!user) return <div>{message}</div>;

  return (
    <div>
      <h1>Create Cape</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Cape Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="file" accept="image/png" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}