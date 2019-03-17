import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Stream } from './stream';

@Entity('Services')
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Stream, stream => stream.service, {
        cascade: true,
    })
    streams: Stream[];
}
