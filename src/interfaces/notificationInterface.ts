import * as Sequelize from 'sequelize';
import { ModelTimeStampExtend } from '.';
import { NotificationEnum } from '../enums';

export interface InputNotificationInterface {
  title: string;
  description: string;
  userId: string;
  eventId?: string;
  notificationType: NotificationEnum;
}

export interface NotificationInterface extends ModelTimeStampExtend {
  id: string;
  title: string;
  description: string;
  userId: string;
  eventId: string;
  notificationType: NotificationEnum;
}

export interface NotificationModelInterface
  extends Sequelize.Model<
      NotificationInterface,
      Partial<InputNotificationInterface>
    >,
    NotificationInterface {}
