import mongoose from 'mongoose';

module.exports = () => {
  const schema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true }
  });
  return mongoose.model('clients', schema);
};
