import User from './user';
import Category from './category';
import Event from './event';
import Comment from './comment';
import Like from './like';
import Notification from './notification';
import Follower from './follower';

//Associations
User.hasMany(Follower, {
  foreignKey: 'hostId',
  as: 'hosts',
});
Follower.belongsTo(User, {
  foreignKey: 'hostId',
  as: 'host',
});

User.hasMany(Follower, {
  foreignKey: 'followerId',
  as: 'followers',
});
Follower.belongsTo(User, {
  foreignKey: 'followerId',
  as: 'follower',
});

User.belongsToMany(Event, {
  through: Like,
  foreignKey: 'userId',
  as: 'likedEvents',
});
Event.belongsToMany(User, {
  through: Like,
  foreignKey: 'eventId',
  as: 'likers',
});

User.hasMany(Event, {
  foreignKey: 'userId',
  as: 'events',
});
Event.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

Event.hasMany(Comment, {
  foreignKey: 'eventId',
  as: 'comments',
});
Comment.belongsTo(Event, {
  foreignKey: 'eventId',
  as: 'event',
});

Category.hasMany(Event, {
  foreignKey: 'categoryId',
  as: 'events',
});
Event.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});

User.hasMany(Comment, {
  foreignKey: 'userId',
  as: 'comments',
});
Comment.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

const Model = {
  User,
  Category,
  Event,
  Comment,
  Like,
  Notification,
  Follower,
};

export default Model;
