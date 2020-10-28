import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSoilDataTable1601479987913
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'soil_data',
        columns: [
          {
            name: 'soil_id',
            type: 'uuid',
          },
          {
            name: 'start_depth',
            type: 'integer',
          },
          {
            name: 'end_depth',
            type: 'integer',
          },
          {
            name: 'field_cap',
            type: 'decimal',
          },
          {
            name: 'wilt_point',
            type: 'decimal',
          },
          {
            name: 'saturation',
            type: 'decimal',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('soil_data');
  }
}
