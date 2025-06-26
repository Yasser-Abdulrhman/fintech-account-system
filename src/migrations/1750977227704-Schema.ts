import { MigrationInterface, QueryRunner } from "typeorm";

export class Schema1750977227704 implements MigrationInterface {
    name = 'Schema1750977227704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userName\` varchar(20) NOT NULL, \`accountId\` int NOT NULL, \`balance\` decimal(15,2) NOT NULL DEFAULT '0.00', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_1b7fb4e7266cfeee3e1248415e\` (\`userName\`), UNIQUE INDEX \`IDX_b1a9fdd281787a66a213f5b725\` (\`accountId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`transactionId\` int NOT NULL, \`type\` enum ('DEPOSIT', 'WITHDRAWAL') NOT NULL, \`amount\` decimal(15,2) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`accountId\` int NULL, UNIQUE INDEX \`IDX_bdcf2c929b61c0935576652d9b\` (\`transactionId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_3d6e89b14baa44a71870450d14d\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_3d6e89b14baa44a71870450d14d\``);
        await queryRunner.query(`DROP INDEX \`IDX_bdcf2c929b61c0935576652d9b\` ON \`transaction\``);
        await queryRunner.query(`DROP TABLE \`transaction\``);
        await queryRunner.query(`DROP INDEX \`IDX_b1a9fdd281787a66a213f5b725\` ON \`account\``);
        await queryRunner.query(`DROP INDEX \`IDX_1b7fb4e7266cfeee3e1248415e\` ON \`account\``);
        await queryRunner.query(`DROP TABLE \`account\``);
    }

}
