import ICreateProjectDTO from '@modules/User/dtos/ICreateUserDTO';

import Project from '@modules/Project/infra/typeorm/entities/Project';

export default interface IProjectsRepository {
  findByName(username: string): Promise<Project | undefined>;
  create(data: ICreateProjectDTO): Promise<Project>;
}
