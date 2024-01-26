import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('Cannot find MONGO_URI');
} else {
  mongoose
    .connect(MONGO_URI, {
      dbName: 'yachtsea',
    })
    .then(() => console.log('Connected to Mongo DB.'))
    .catch((err) => console.log(err));
}

const Schema = mongoose.Schema;

const statsSchema = new Schema({
  email: String,
  gamesPlayed: Number,
});

export const StatsModel = mongoose.models.stats || mongoose.model('stats', statsSchema);
