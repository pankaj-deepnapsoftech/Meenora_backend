import Contact from '../models/Contact.js';

// POST: Add new contact message
export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = new Contact({ name, email, subject, message });
    const saved = await contact.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

import Contact from '../models/Contact.js'; 

// // GET: All contacts
// export const getAllContacts = async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ dateAdded: -1 });
//     res.json(contacts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // GET: Single contact
// export const getContactById = async (req, res) => {
//   try {
//     const contact = await Contact.findById(req.params.id);
//     if (contact) res.json(contact);
//     else res.status(404).json({ message: 'Contact Not Found' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // PUT: Update contact
// export const updateContact = async (req, res) => {
//   try {
//     const { name, email, subject, message } = req.body;
//     const contact = await Contact.findById(req.params.id);

//     if (!contact) return res.status(404).json({ message: 'Contact Not Found' });

//     contact.name = name || contact.name;
//     contact.email = email || contact.email;
//     contact.subject = subject || contact.subject;
//     contact.message = message || contact.message;

//     const updated = await contact.save();
//     res.json(updated);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // DELETE: Remove contact
// export const deleteContact = async (req, res) => {
//   try {
//     const contact = await Contact.findById(req.params.id);
//     if (!contact) return res.status(404).json({ message: 'Contact Not Found' });

//     await contact.remove();
//     res.json({ message: 'Contact Deleted' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };
