import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TenantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  domain: string;

  @Column()
  schemaName: string;
}
