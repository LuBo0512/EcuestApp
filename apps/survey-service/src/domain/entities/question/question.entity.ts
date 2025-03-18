import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Survey } from '../survey/survey..entity';
import { Option } from '../option/option.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column({
    type: 'enum',
    enum: ['single', 'multiple', 'open'],
    default: 'single',
  })
  type: 'single' | 'multiple' | 'open';

  @ManyToOne(() => Survey, (survey) => survey.questions, {
    onDelete: 'CASCADE',
  })
  survey: Survey;

  @OneToMany(() => Option, (option) => option.question, { cascade: true })
  options: Option[];
}
