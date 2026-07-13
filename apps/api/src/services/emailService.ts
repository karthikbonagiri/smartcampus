import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendOTP = async (email: string) => {
  const msg = { to: email, from: 'noreply@smartcampus.com', subject: 'OTP Verification', text: 'Your OTP is 1234' };
  await sgMail.send(msg);
};
// other email functions// Placeholder: emailService.ts
