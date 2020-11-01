import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class SoilDataNewPrimaryColumn1604228516878
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'soil_data',
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('soil_data', 'id');
  }
}
