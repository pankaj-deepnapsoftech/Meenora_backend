import express from 'express';
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} from '../controller/contactController.js';

const router = express.Router();

router.route('/').get(getAllContacts).post(createContact);

router
  .route('/:id')
  .get(getContactById)
  .put(updateContact)
  .delete(deleteContact);

export default router;
