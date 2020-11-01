import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Soil from '@modules/Project/infra/typeorm/entities/Soil';

@Entity('soil_data')
class SoilData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  soil_id: string;

  @Column('integer')
  start_depth: number;

  @Column('integer')
  end_depth: number;

  @Column('decimal')
  field_cap: number;

  @Column('decimal')
  wilt_point: number;

  @Column('decimal')
  saturation: number;

  @ManyToOne(() => Soil)
  @JoinColumn({ name: 'soil_id' })
  soil: Soil;
}

export default SoilData;
