import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/User/services/UpdateProfileService';

export default class ProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { email, password, username, old_password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      email,
      password,
      username,
      old_password,
    });

    delete user.password;

    return response.json(user);
  }
}
