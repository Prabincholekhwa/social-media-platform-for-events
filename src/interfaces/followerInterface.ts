import * as Sequelize from 'sequelize';
import { ModelTimeStampExtend } from '.';

export interface InputFollowerInterface {
  hostId: string;
  followerId: string;
}

export interface FollowerInterface extends ModelTimeStampExtend {
  id: string;
  hostId: string;
  followerId: string;
}

export interface FollowerModelInterface
  extends Sequelize.Model<FollowerInterface, Partial<InputFollowerInterface>>,
    FollowerInterface {}
