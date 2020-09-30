import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreateSoilTablesRelation1601480476351
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'soil_data',
      new TableForeignKey({
        name: 'soilTablesRelation',
        columnNames: ['soil_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'soils',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('soil_data', 'soilTablesRelation');
  }
}
