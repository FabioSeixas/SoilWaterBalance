import { Router } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/User/services/SendForgotPasswordEmailService';
import ResetPasswordService from '@modules/User/services/ResetPasswordService';

const passwordRouter = Router();

passwordRouter.post('/forgot', async (request, response) => {
  const { email } = request.body;

  const sendForgotPassword = container.resolve(SendForgotPasswordEmailService);

  await sendForgotPassword.execute({
    email,
  });

  return response.status(204).json();
});

passwordRouter.post('/reset', async (request, response) => {
  const { token, password } = request.body;

  const resetPassword = container.resolve(ResetPasswordService);

  await resetPassword.execute({
    password,
    token,
  });

  return response.status(204).json();
});

export default passwordRouter;
