import * as Sequelize from 'sequelize';
import { ModelTimeStampExtend } from '.';

export interface InputEventInterface {
  title: string;
  description: string;
  time: string;
  location: string;
  image: string;
  userId: string;
  categoryId: string;
}

export interface EventInterface extends ModelTimeStampExtend {
  id: string;
  title: string;
  description: string;
  time: string;
  location: string;
  image: string;
  userId: string;
  categoryId: string;
}

export interface EventModelInterface
  extends Sequelize.Model<EventInterface, Partial<InputEventInterface>>,
    EventInterface {}
