import nodemailer from 'nodemailer';

// Configure the nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Named export for the POST method
export async function POST(req) {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Parse the JSON body of the request
  const { to, subject, text } = await req.json(); // Ensure you're using 'text' instead of 'body'

  try {
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to,
      subject,
      text, // Changed to 'text'
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent:', info.messageId);
    return new Response(JSON.stringify({ message: 'Email sent successfully', info }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Error sending email', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
