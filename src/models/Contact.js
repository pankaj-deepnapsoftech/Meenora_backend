import mongoose from 'mongoose';

const contactschema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['unread', 'read', 'archived'],
    default: 'unread',
  },
  dateAdded: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactschema);
export default Contact;
