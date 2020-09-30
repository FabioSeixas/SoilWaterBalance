import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}

export default Soil;
