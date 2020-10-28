import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import User from '@modules/User/infra/typeorm/entities/User';
import Project from '@modules/Project/infra/typeorm/entities/Project';

@Entity('soils')
class Soil {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  text_class: string;

  @Column('integer')
  total_depth: number;

  @Column('uuid')
  author_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @OneToMany(() => Project, project => project.soil)
  project: Project;
}

export default Soil;
