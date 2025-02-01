// components/WaitlistForm.tsx
'use client';

import { Send as SendIcon } from '@mui/icons-material'
import { Button, IconButton, TextField } from '@mui/material'
import { useState } from 'react'
import { toast } from 'sonner'

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('You have been added to the waitlist!');
      setEmail('');
    } catch (error) {
      toast.error('Failed to join waitlist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Join Our Waitlist
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          fullWidth
          variant="outlined"
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-gray-50"
          InputProps={{
            endAdornment: (
              <IconButton
                type="submit"
                disabled={isLoading}
                className="text-blue-600"
                aria-label="Join waitlist"
              >
                <SendIcon />
              </IconButton>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={isLoading}
          className="h-12 text-lg font-semibold"
          startIcon={!isLoading && <SendIcon />}
        >
          {isLoading ? 'Joining...' : 'Get Early Access'}
        </Button>
      </form>
    </div>
  );
}
