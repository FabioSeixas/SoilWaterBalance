import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/User/services/UpdateProfileService';
import ShowProfileService from '@modules/User/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute(user_id);

    delete user.password;

    return response.json(user);
  }

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
