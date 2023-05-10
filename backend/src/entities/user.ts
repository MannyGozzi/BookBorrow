import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from "bcryptjs"

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id

  @Column({ type: 'varchar', unique: true })
  email

  @Column({ type: 'varchar', nullable: false })
  password

  isValidPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }
}
