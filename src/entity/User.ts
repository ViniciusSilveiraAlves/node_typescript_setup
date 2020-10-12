/* eslint-disable @typescript-eslint/no-unused-vars */
import { BeforeInsert, Entity, PrimaryGeneratedColumn, Column, BaseEntity, DeleteDateColumn } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
@Entity()
export class User extends BaseEntity {
    @BeforeInsert()
    private encryptPass = async () => {
        console.log('chamou o encrypt');
        const user = this;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        console.log(hash);
        user.password = hash;
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ length: 255, unique: true })
    gamerTag: string

    @Column({ length: 500, unique: true })
    email: string;

    @Column({ length: 255 })
    password: string

    @Column({ default: () => '"src/static/user/default.png"' })
    avatar: string;

    @Column({ length: 255, nullable: true })
    resetPasswordToken: string;

    @Column({ nullable: true })
    resetPasswordExpires: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    createToken() {
        return jwt.sign({ id: this.id, email: this.email }, process.env.JWT_SECRET, {
            expiresIn: 86400
        });
    }

    async checkPassword(password: string): Promise<Boolean> {
        return await bcrypt.compare(password, this.password);
    }

    async generateResetToken() {
        const salt = await bcrypt.genSalt(10);
        const resetToken = await bcrypt.hash(this.password, salt);
        this.resetPasswordToken = resetToken;
        this.resetPasswordExpires = new Date(Date.now() + 86400000);
        return resetToken;
    }
}
