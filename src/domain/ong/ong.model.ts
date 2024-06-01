import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class Ong extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  cnpj: string;

  @Column()
  name: string;

  @Column({ length: 500 })
  description: string;

  @Column({ nullable: true, length: 500 })
  image: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  uf: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  aditional_information: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}

export default Ong;
