import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    page: {
      type: String,
      enum: ['home', 'shop', 'about'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Banner = mongoose.model('Banner', bannerSchema);
export default Banner;
