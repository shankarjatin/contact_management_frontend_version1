import { useState, useEffect } from 'react';
import { getContacts, deleteContact } from '../services/api';
import { toast } from 'react-toastify';
import ContactForm from './ContactForm';
import Header from './Header';
import { useAuth } from '../context/AuthContext';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState({ total: 0 });
  const { user } = useAuth();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await getContacts();
      setContacts(response.data);
      setStats({ total: response.data.length });
    } catch (error) {
      toast.error('Failed to fetch contacts');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      setContacts(contacts.filter(contact => contact._id !== id));
      setStats(prev => ({ ...prev, total: prev.total - 1 }));
      toast.success('Contact deleted successfully');
    } catch (error) {
      toast.error('Failed to delete contact');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userEmail={user?.email} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Total Contacts</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Quick Actions</h3>
              <button 
                className="btn btn-primary mt-2"
                onClick={() => setShowForm(true)}
              >
                Add New Contact
              </button>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800">Portal Info</h3>
              <p className="text-sm text-purple-600 mt-1">
                Manage your contacts efficiently with our secure contact management system.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map(contact => (
            <div key={contact._id} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{contact.name}</h3>
                <span className="text-xs text-gray-500">
                  ID: {contact._id.slice(-4)}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600 flex items-center">
                  <span className="material-icons-outlined text-gray-400 mr-2">email</span>
                  {contact.email}
                </p>
                <p className="text-gray-600 flex items-center">
                  <span className="material-icons-outlined text-gray-400 mr-2">phone</span>
                  {contact.phone}
                </p>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setEditingContact(contact)}
                  className="btn btn-secondary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {contacts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600">No contacts found</h3>
            <p className="text-gray-500 mt-2">Start by adding your first contact!</p>
          </div>
        )}

        {(showForm || editingContact) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">
                {editingContact ? 'Edit Contact' : 'Add New Contact'}
              </h2>
              <ContactForm
                contact={editingContact}
                onSuccess={() => {
                  fetchContacts();
                  setEditingContact(null);
                  setShowForm(false);
                }}
                onCancel={() => {
                  setEditingContact(null);
                  setShowForm(false);
                }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}