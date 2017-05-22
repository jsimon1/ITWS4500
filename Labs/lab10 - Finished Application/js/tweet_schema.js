//Schema contains all specifications from lab 6 needed for output. keyword is added since many tweets from different queries are going to be part of the collection
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetSchema = new Schema({
  keyword: {type: String, default: 'NULL'},
  created_at: { type: String, default: 'NULL'},
  id: { type: String, default: 'NULL'},
  text: { type: String, default: 'NULL'},
  user_id: { type: String, default: 'NULL'},
  user_name: { type: String, default: 'NULL'},
  user_screen_name: { type: String, default: 'NULL'},
  user_location: { type: String, default: 'NULL'},
  user_followers_count: { type: String, default: 'NULL'},
  user_friends_count: { type: String, default: 'NULL'},
  user_created_at: { type: String, default: 'NULL'},
  user_time_zone: { type: String, default: 'NULL'},
  user_profile_background_color: { type: String, default: 'NULL'},
  user_profile_image_url: { type: String, default: 'NULL'},
  geo: { type: String, default: 'NULL'},
  coordinates: { type: String, default: 'NULL'},
  place: { type: String, default: 'NULL'}
});
module.exports = mongoose.model('tweets',tweetSchema);