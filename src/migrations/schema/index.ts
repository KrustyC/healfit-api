import mongoose from 'mongoose';

const MigrationSchema = new mongoose.Schema({
  ran: Date,
  version: { type: Number, unique: true },
});

export default mongoose.model('migration', MigrationSchema);
