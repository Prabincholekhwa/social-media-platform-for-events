import { z } from 'zod';
import { ISODateTimeString, stringField } from './common.schema';

export const Comment = z.object({
  id: stringField('ID'),
  description: stringField('Description'),
  userId: stringField('User Id'),
  eventId: stringField('Event Id'),
  inserted: stringField('Inserted'),
  updated: stringField('Updated'),
});

export const CommentInsert = Comment.omit({
  id: true,
  inserted: true,
  updated: true,
  userId: true,
});

export const CommentUpdate = Comment.omit({
  id: true,
  inserted: true,
  updated: true,
  userId: true,
  eventId: true,
});

export type Comment = z.infer<typeof Comment>;
export type CommentInsert = z.infer<typeof CommentInsert>;
export type CommentUpdate = z.infer<typeof CommentUpdate>;
