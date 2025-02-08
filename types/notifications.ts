import { sendEmail } from '../components/emails/templates/emails';

export interface WebhookUser {
  id: string;
  email_addresses: { email_address: string }[];
  first_name: string;
  last_name: string;
}

export const notifyAdminsOfNewUser = async (userData: WebhookUser) => {
  // Send email to admins by passing three arguments separately
  await sendEmail(process.env.ADMIN_EMAIL as string, 'New User Registration', {
    template: 'admin-new-user',
    data: {
      userId: userData.id,
      email: userData.email_addresses[0].email_address,
      name: `${userData.first_name} ${userData.last_name}`,
    },
  });
};
