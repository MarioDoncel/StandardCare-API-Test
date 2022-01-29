import { sign } from 'jsonwebtoken';

import { environmentVariables } from '../../../config/environment';
import { sendEmailVerification } from '../../../utils/sendEmailVerification';

export const sendVerificationEmailService = (id: string, email: string) => {
  const verificationToken = sign(
    {},
    environmentVariables.VERIFICATION_EMAIL_SECRET,
    {
      subject: id,
      expiresIn: '1d',
    }
  );
  sendEmailVerification(email, verificationToken);
};
