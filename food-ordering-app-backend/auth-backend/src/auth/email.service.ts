import * as nodemailer from 'nodemailer';

export const sendOtpEmail = async (toEmail: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yasarahasini61@gmail.com',
      pass: 'YOUR_APP_PASSWORD_HERE',
    },
  });

  await transporter.sendMail({
    from: '"Auth App" <yasarahasini61@gmail.com>',
    to: toEmail,
    subject: 'Your OTP Code',
    html: `<h2>Your verification code</h2><h1>${otp}</h1>`,
  });

  console.log(`OTP sent to ${toEmail}: ${otp}`);
};
