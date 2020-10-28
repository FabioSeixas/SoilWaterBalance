import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/User/infra/typeorm/entities/User';
import Soil from '@modules/Project/infra/typeorm/entities/Soil';

@Entity('projects')
class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('uuid')
  soil_id: string;

  @Column('uuid')
  weather_id: string;

  @Column('uuid')
  author_id: string;

  @ManyToOne(() => User, user => user.project, { eager: true })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @OneToOne(() => Soil, soil => soil.project, { eager: true })
  @JoinColumn({ name: 'soil_id' })
  soil: Soil;
}

export default Project;
