export const notifyAdminsOfNewUser = async (userData: WebhookUser) => {
 // Send email to admins
 await sendEmail({
   to: process.env.ADMIN_EMAIL,
   subject: 'New User Registration',
   template: 'admin-new-user',
   data: {
     userId: userData.id,
     email: userData.email_addresses[0].email_address,
     name: `${userData.first_name} ${userData.last_name}`
   }
 })
}
