import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  price: Number,
  coverImageUrl: String,
  stock: Number,
  genre: String,
  type: {
    type: String,
    enum: ["new", "exchange"],
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Book || mongoose.model('Book', BookSchema);