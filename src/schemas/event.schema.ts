import { z } from 'zod';
import { emailField, ISODateTimeString, stringField } from './common.schema';

export const Event = z.object({
  id: stringField('ID'),
  title: stringField('Title'),
  description: stringField('Description'),
  time: ISODateTimeString('Time'),
  image: stringField('Image'),
  userId: stringField('User Id'),
  categoryId: stringField('Category Id'),
  location: stringField('Location'),
  inserted: stringField('Inserted'),
  updated: stringField('Updated'),
});

export const EventInsert = Event.omit({
  id: true,
  inserted: true,
  updated: true,
  userId: true,
  image: true,
});

export const EventUpdate = Event.omit({
  id: true,
  inserted: true,
  updated: true,
  userId: true,
  image: true,
});

export const FilterEvent = z.object({
  categoryId: stringField('Category Id').optional(),
  fromDateTime: ISODateTimeString('FromISODateTime').optional(),
  toDateTime: ISODateTimeString('ToISODateTime').optional(),
  searchKeyword: stringField('Search Keyword').optional(),
  page: stringField('Page').optional(),
  size: stringField('Size').optional(),
});

export const FilterUserEvent = z.object({
  userId: stringField('User Id'),
  categoryId: stringField('Category Id').optional(),
  fromDateTime: ISODateTimeString('FromISODateTime').optional(),
  toDateTime: ISODateTimeString('ToISODateTime').optional(),
  searchKeyword: stringField('Search Keyword').optional(),
  page: stringField('Page').optional(),
  size: stringField('Size').optional(),
});

export const FilterFeedEvent = z.object({
  categoryId: stringField('Category Id').optional(),
  fromDateTime: ISODateTimeString('FromISODateTime').optional(),
  toDateTime: ISODateTimeString('ToISODateTime').optional(),
  searchKeyword: stringField('Search Keyword').optional(),
  page: stringField('Page').optional(),
  size: stringField('Size').optional(),
});

export type Event = z.infer<typeof Event>;
export type EventInsert = z.infer<typeof EventInsert>;
export type EventUpdate = z.infer<typeof EventUpdate>;
export type FilterEvent = z.infer<typeof FilterEvent>;

export type FilterUserEvent = z.infer<typeof FilterUserEvent>;
export type FilterFeedEvent = z.infer<typeof FilterFeedEvent>;
