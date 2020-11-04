import { Router } from 'express';

import ResetPasswordController from '@modules/User/infra/http/controllers/ResetPasswordController';
import SendForgotPasswordEmailController from '@modules/User/infra/http/controllers/SendForgotPasswordEmailController';

const passwordRouter = Router();

const resetPasswordController = new ResetPasswordController();
const sendForgotPasswordEmailController = new SendForgotPasswordEmailController();

passwordRouter.post('/forgot', sendForgotPasswordEmailController.create);

passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
