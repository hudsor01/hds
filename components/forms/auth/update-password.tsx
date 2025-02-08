'use client';

import { Button } from '@/components/ui/buttons/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function UpdatePassword() {
  const [password, setPassword] = useState('');

  const handleSubmitAction = async () => {
    // Implement password update logic
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmitAction}>
      <Input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Update Password</Button>
    </form>
  );
}
