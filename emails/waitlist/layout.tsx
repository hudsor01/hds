import {Body, Container, Head, Html, Preview, Section} from '@react-email/components';
import * as React from 'react';

interface EmailLayoutProps {
  preview: string;
  children: React.ReactNode;
}

export default function EmailLayout({preview, children}: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={content}>{children}</Section>
        </Container>
      </Body>
    </Html>
  );
}

export const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

export const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
};

export const content = {
  padding: '0',
};

export const text = {
  color: '#1a1a1a',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
};

export const button = {
  backgroundColor: '#007FFF',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

export const link = {
  color: '#007FFF',
  textDecoration: 'underline',
};

export const footer = {
  color: '#666666',
  fontSize: '14px',
  margin: '48px 0 0 0',
};
