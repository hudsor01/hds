'use client';

import { Loader2, Shield } from '-react';
import { Button } from 'components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog';
import { Input } from 'components/ui/input';
import { toast } from 'sonner';

import { useState } from 'react';

import Image from 'next/image';

export function TwoFactorSetup() {
  const [isOpen, setIsOpen] = useState(false);
  const [setupStep, setSetupStep] = useState<'initial' | 'qr' | 'verify'>('initial');
  const [qrCode, setQrCode] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handle2FASetup = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/2fa/setup', {
        method: 'POST',
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setQrCode(data.qrCode);
      setSetupStep('qr');
    } catch (error) {
      toast.error(
        `Failed to setup 2FA: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify2FA = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: verificationCode }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      toast.success('Two-factor authentication enabled');
      setIsOpen(false);
      setSetupStep('initial');
    } catch (error) {
      toast.error(
        `Invalid verification code: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button variant='outline' onClick={() => setIsOpen(true)}>
        <Shield className='mr-2 h-4 w-4' />
        Setup 2FA
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Setup Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Enhance your account security with two-factor authentication
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-4'>
            {setupStep === 'initial' && (
              <div className='space-y-4'>
                <p className='text-sm text-muted-foreground'>
                  Two-factor authentication adds an extra layer of security to your account. Once
                  enabled, you will need to enter a code from your authenticator app when signing
                  in.
                </p>
                <Button onClick={handle2FASetup} disabled={isLoading}>
                  {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                  Begin Setup
                </Button>
              </div>
            )}

            {setupStep === 'qr' && (
              <div className='space-y-4'>
                <div className='mx-auto w-64'>
                  <Image
                    src={qrCode}
                    alt='2FA QR Code'
                    width={256}
                    height={256}
                    className='rounded-lg'
                  />
                </div>
                <p className='text-sm text-center'>Scan this QR code with your authenticator app</p>
                <div className='flex justify-center'>
                  <Button onClick={() => setSetupStep('verify')}>Next</Button>
                </div>
              </div>
            )}

            {setupStep === 'verify' && (
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <p className='text-sm text-center'>
                    Enter the verification code from your authenticator app
                  </p>
                  <Input
                    type='text'
                    placeholder='Enter 6-digit code'
                    value={verificationCode}
                    onChange={e => setVerificationCode(e.target.value)}
                    maxLength={6}
                  />
                </div>
                <div className='flex justify-center'>
                  <Button
                    onClick={handleVerify2FA}
                    disabled={isLoading || verificationCode.length !== 6}
                  >
                    {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                    Verify
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
