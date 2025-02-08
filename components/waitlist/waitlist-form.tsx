import { Button } from '@/components/ui/buttons/button';
import { trackWaitlistEvent } from '@/lib/services/waitlist-analytics';
import type { WaitlistEventType } from '@/types/waitlist-analytics';
import { gradientStyles } from '@/utils/styles';
import { Box, TextField } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, Check } from 'react-feather';
import { toast } from 'sonner';

interface WaitlistFormProps {
  onSuccess?: () => void;
  className?: string;
}

export function WaitlistForm({ onSuccess, className }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const referralCode = searchParams.get('ref');
      const source = searchParams.get('utm_source') || 'direct';

      const response = await fetch('/api/waitlist/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          referral_code: referralCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      // Track signup event
      await trackWaitlistEvent(email, 'signup' as WaitlistEventType, {
        source,
        referral_code: referralCode,
        position: data.data.position,
      });

      // Track referral event if applicable
      if (referralCode) {
        await trackWaitlistEvent(
          email,
          'referral_created' as WaitlistEventType,
          {
            referral_code: referralCode,
          },
        );
      }

      setIsSubmitted(true);
      toast.success('Thanks for joining our waitlist!');
      onSuccess?.();
    } catch (error) {
      console.error('Error joining waitlist:', error);
      toast.error('Failed to join waitlist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className={className}
      sx={{
        display: 'flex',
        gap: 2,
        maxWidth: 500,
        mx: 'auto',
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      <TextField
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isLoading || isSubmitted}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
        }}
      />
      <Button
        type="submit"
        disabled={isLoading || isSubmitted}
        className={`h-14 min-w-[150px] rounded-lg ${
          isSubmitted ? 'bg-green-500' : gradientStyles.background
        }`}
      >
        {isSubmitted ? (
          <>
            <Check size={20} />
            Joined
          </>
        ) : (
          <>
            Join Now
            <ArrowRight size={20} />
          </>
        )}
      </Button>
    </Box>
  );
}
