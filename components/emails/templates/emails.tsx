export const WelcomeEmail = () => (
  <EmailTemplate>
    <h1>Welcome to Property Pro!</h1>
    <p>You're #[position] on our waitlist.</p>
    <p>Early access begins July 2025.</p>
    <Features />
  </EmailTemplate>
);

export const EarlyAccessEmail = () => (
  <EmailTemplate>
    <h1>Early Access Now Available!</h1>
    <p>As promised, you get:</p>
    <ul>
      <li>50% off first 6 months</li>
      <li>Priority support</li>
      <li>Feature request priority</li>
    </ul>
    <Button href='[signup-link]'>Claim Your Spot</Button>
  </EmailTemplate>
);

export const SpotAvailableEmail = () => (
  <EmailTemplate>
    <h1>Your Spot is Ready!</h1>
    <p>A spot has opened in our early access program.</p>
    <p>You have 48 hours to claim it before we move to the next person.</p>
    <Button href='[claim-link]'>Join Now</Button>
  </EmailTemplate>
);

export const LaunchReminderEmail = () => (
  <EmailTemplate>
    <h1>We're Launching Tomorrow!</h1>
    <p>Your special pricing ends in 24 hours.</p>
    <Features />
    <Pricing />
    <Button href='[signup-link]'>Get Started</Button>
  </EmailTemplate>
);

// Email sending service
export const sendEmail = async (to: string, template: EmailTemplate, data: Record<string, any>) => {
  const templates = {
    [EmailTemplate.WELCOME]: WelcomeEmail,
    [EmailTemplate.EARLY_ACCESS]: EarlyAccessEmail,
    [EmailTemplate.SPOT_AVAILABLE]: SpotAvailableEmail,
    [EmailTemplate.LAUNCH_REMINDER]: LaunchReminderEmail,
  };

  return resend.emails.send({
    from: 'PropertyPro <hello@propertypro.com>',
    to,
    subject: getSubject(template),
    react: templates[template](data),
  });
};
