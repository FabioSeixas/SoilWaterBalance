import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class DeleteProjectColumnSoilId1604228192604
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('projects', 'soil_id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'projects',
      new TableColumn({
        name: 'soil_id',
        type: 'uuid',
      }),
    );
  }
}
