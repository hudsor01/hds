import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log('Webhook received:', payload.type);

    if (payload.type === 'user.created') {
      const userData = payload.data;
      console.log('Creating user:', userData);

      await prisma.user.create({
        data: {
          id: userData.id,
          email: userData.email_addresses[0].email_address,
          name: `${userData.first_name} ${userData.last_name}`,
          image: userData.image_url || userData.profile_image_url,
        },
      });
      console.log('User created successfully');
    }

    return new Response('Webhook received', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Webhook error', { status: 500 });
  }
}
