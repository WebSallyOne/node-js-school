import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsPositive } from 'class-validator';
import { Service } from './service';

@Entity('Streams')
export class Stream {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    action: string;

    @Column()
    @IsPositive()
    queuePosition: number;

    @ManyToOne(type => Service, service => service.streams, { onDelete: 'CASCADE' })
    service: Service;
}
