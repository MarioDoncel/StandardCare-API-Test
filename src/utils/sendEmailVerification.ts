import sgMail from '@sendgrid/mail';

import { environmentVariables } from '../config/environment';

sgMail.setApiKey(environmentVariables.SENDGRID_API_KEY);

export const sendEmailVerification = async (
  userEmail: string,
  verificationToken: string
) => {
  const msg = {
    to: userEmail,
    from: environmentVariables.SENDGRID_EMAIL_FROM,
    subject: 'Email Verification',
    text: 'Please click on the link to confirm your email.',
    html: `<html>
    <p>Please click on the link to confirm your email</p>
    <a href="${environmentVariables.DOMAIN}users/validation/${verificationToken}">Confirm Email</a>
    <p>Link to confirm email:</br> ${environmentVariables.DOMAIN}/users/validation/${verificationToken}</p></html>`,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent');
  } catch (error) {
    console.error(error);
  }
};
