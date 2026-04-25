'use client';

import { useState, useEffect } from 'react';
import { FormEvent, ChangeEvent } from 'react';

interface User {
  id: string;
  username: string;
  rank: string;
}

export default function CreateCape() {
  const [user, setUser] = useState<User | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check user rank
    const checkRank = async () => {
      // TODO: Fetch user from session/API
      const response = await fetch('/api/user');
      const data = await response.json();
      if (['Caper', 'Free+', 'Creator', 'Owner'].includes(data.rank)) {
        setUser(data);
      } else {
        setMessage('Insufficient rank to create capes');
      }
    };
    checkRank();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        <input type="file" accept="image/png" onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null)} />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}