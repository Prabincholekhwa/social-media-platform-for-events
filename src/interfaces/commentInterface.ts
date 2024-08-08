import * as Sequelize from 'sequelize';
import { ModelTimeStampExtend } from '.';

export interface InputCommentInterface {
  description: string;
  userId: string;
  eventId: string;
}

export interface CommentInterface extends ModelTimeStampExtend {
  id: string;
  description: string;
  userId: string;
  eventId: string;
}

export interface CommentModelInterface
  extends Sequelize.Model<CommentInterface, Partial<InputCommentInterface>>,
    CommentInterface {}
