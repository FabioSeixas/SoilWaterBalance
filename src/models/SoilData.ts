import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

import Soil from './Soil';

@Entity('soil_data')
class SoilData {
  @PrimaryColumn('uuid')
  soil_id: string;

  @PrimaryColumn('integer')
  start_depth: number;

  @PrimaryColumn('integer')
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
