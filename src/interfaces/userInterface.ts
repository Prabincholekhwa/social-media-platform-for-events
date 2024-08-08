import * as Sequelize from 'sequelize';
import { ModelTimeStampExtend } from '.';

export interface InputUserInterface {
  name: string;
  email: string;
  password: string;
  profile: string;
  accessToken: string | null;
}

export interface UserInterface extends ModelTimeStampExtend {
  id: string;
  name: string;
  email: string;
  password: string;
  profile: string;
  accessToken: string | null;
}

export interface UserModelInterface
  extends Sequelize.Model<UserInterface, Partial<InputUserInterface>>,
    UserInterface {}
