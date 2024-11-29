import { useState, useEffect } from 'react';
import { createContact, updateContact } from '../services/api';
import { toast } from 'react-toastify';

export default function ContactForm({ contact, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
      });
    }
  }, [contact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (contact) {
        await updateContact(contact._id, formData);
        toast.success('Contact updated successfully');
      } else {
        await createContact(formData);
        toast.success('Contact created successfully');
      }
      setFormData({ name: '', email: '', phone: '' });
      onSuccess?.();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label">Name</label>
        <input
          type="text"
          required
          className="input"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label className="label">Email</label>
        <input
          type="email"
          required
          className="input"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <label className="label">Phone</label>
        <input
          type="tel"
          required
          className="input"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>
      <div className="flex justify-end space-x-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="btn btn-primary"
        >
          {contact ? 'Update' : 'Create'} Contact
        </button>
      </div>
    </form>
  );
}