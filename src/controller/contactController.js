import Contact from '../models/Contact.js';
// POST: Add new contact message
export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = new Contact({
      name,
      email,
      subject,
      message,
    });
    const saved = await contact.save();
    res.status(201).json({
      message: 'Message sent successfully!',
      contact: saved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET: All contacts
export const getAllContacts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const { page, limit } = req.query;
    const currentPage = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (currentPage - 1) * pageSize;

    const contacts = await Contact.find(filter)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(pageSize);
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET: Single contact
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (contact) res.json(contact);
    else res.status(404).json({ message: 'Contact Not Found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// PUT: Update contact
export const updateContact = async (req, res) => {
  try {
    const { name, email, subject, message, status } = req.body;
    const contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ message: 'Contact Not Found' });

    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.subject = subject || contact.subject;
    contact.message = message || contact.message;
    contact.status = status || contact.status;

    const updated = await contact.save();
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// DELETE: Remove contact
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact Not Found' });

    await contact.deleteOne();
    res.json({ message: 'Contact Deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
