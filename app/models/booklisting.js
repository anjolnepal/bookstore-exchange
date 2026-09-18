import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    description: String,
    price: Number,
    coverImageUrl: String,
    stock: Number,
    genre: String,
    status: {
      type: String,
      enum: ['open', 'pending', 'closed'],
      default: 'open',
    },
    coverImagePublicId: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['new', 'exchange'],
      required: true,
    },
    wantedInReturn: String,
  },
  { timestamps: true }
);

export default mongoose.models.Book || mongoose.model('Book', BookSchema);
