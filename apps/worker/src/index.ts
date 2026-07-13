import amqp from 'amqplib';
import { sendEmail } from './jobs/sendEmail';
import { sendSMS } from './jobs/sendSMS';

async function start() {
  const conn = await amqp.connect(process.env.RABBITMQ_URL!);
  const channel = await conn.createChannel();
  await channel.assertQueue('email_queue');
  await channel.assertQueue('sms_queue');
  channel.consume('email_queue', async (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      await sendEmail(data);
      channel.ack(msg);
    }
  });
  // similar for SMS
  console.log('Worker started');
}
start();// Placeholder: index.ts
