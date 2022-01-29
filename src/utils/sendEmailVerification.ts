import sgMail from '@sendgrid/mail';

import { environmentVariables } from '../config/environment';

sgMail.setApiKey(environmentVariables.SENDGRID_API_KEY);

export const sendEmailVerification = async (
  userEmail: string,
  verificationToken: string
) => {
  const msg = {
    to: userEmail,
    from: '88mario.doncel@gmail.com',
    subject: 'Email Verification',
    text: 'Please click on the link to confirm your email.',
    html: `<a href="${process.cwd()}/users/validation/${verificationToken}">Confirm Email</a>`,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent');
  } catch (error) {
    console.error(error);
  }
};
