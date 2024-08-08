import * as Sequelize from 'sequelize';
import { ModelTimeStampExtend } from '.';

export interface InputLikeInterface {
  eventId: string;
  userId: string;
}

export interface LikeInterface extends ModelTimeStampExtend {
  id: string;
  eventId: string;
  userId: string;
}

export interface LikeModelInterface
  extends Sequelize.Model<LikeInterface, Partial<InputLikeInterface>>,
    LikeInterface {}
