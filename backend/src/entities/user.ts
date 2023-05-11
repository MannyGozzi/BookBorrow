import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from "bcryptjs"

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id

  @Column({ type: 'varchar', unique: true })
  email

  @Column({ type: 'varchar', unique: true , nullable: false})
  username

  @Column({ type: 'varchar', nullable: false })
  password

  @Column({ type: 'varchar', nullable: false })
  first_name

  @Column({ type: 'varchar', nullable: false })
  last_name

  @Column({ type: 'date', nullable: false })
  date_joined

  @Column({ type: 'boolean', nullable: true })
  is_staff

  @Column({ type: 'varchar', nullable: false })
  zip_code
  
  isValidPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }
}

// createUser(…args): boolean (success)
// updatePassword(string): boolean
// updateZip(int): boolean
// 
// Books:
// id (integer, primary key)
// title (string)
// author (string)
// isbn (string, unique, optional)
// publication_date (date, optional)
// genre (string, optional)
// cover_image (string, optional)
// description (text, optional)
// lender (foreign key, references Users)
// borrower (foreign key, references Users, nullable)
// available (boolean, default true)
// date_added (date)
// 
// addBook(…args): Boolean (success)
// deleteBook(): Boolean (success)
// 
// Reviews (of lenders):
// id (integer, primary key)
// reviewer (foreign key, references Users)
// reviewed_lender (foreign key, references Users)
// rating (integer, 1-5)
// comment (text, optional)
// date_created (date)
// 
// addReview(…args): boolean (success)
// 
// Checkout:
// id (integer, primary key)
// user (foreign key, references Users)
// book (foreign key, references Books)
// checkout_date (date)
// due_date (date)
// return_date (date, nullable)
// 
// checkout(userId, bookId): boolean
// checkIn(): Boolean