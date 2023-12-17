import { DataTypes } from 'sequelize';
import { Model, Column, Table, AllowNull, Index } from 'sequelize-typescript';

@Table
export class ContactRequest extends Model {
  @AllowNull(false)
  @Index({ name: 'senderId-receivedId', unique: true })
  @Column({ type: DataTypes.STRING })
  senderId: string;
  @AllowNull(false)
  @Index({ name: 'senderId-receivedId', unique: true })
  @Column({ type: DataTypes.STRING })
  receiverId: string;
}

export default ContactRequest;
