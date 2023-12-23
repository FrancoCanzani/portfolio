'use server';

import { Resend } from 'resend';

export async function sendEmail(formData: FormData) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const inputs = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  const { data } = await resend.emails.send({
    from: 'francocanzani.site',
    to: ['francocanzani@gmail.com'],
    subject: 'New Message',
    html: `
      <h1>New message from ${inputs.name}!</h1>
      <p>${inputs.message}</p>
      <p>Can be reached at ${inputs.email}</p>
    `,
  });
}
