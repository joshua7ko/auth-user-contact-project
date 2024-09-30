import React, { useState, useEffect, useCallback } from 'react';
import axios from "../axiosConfig";
import AddContact from './AddContact';
import UpdateContact from './updateContact'



const Account = () => {
    const [contacts, setContacts] = useState([])
    const [showAddContact, setShowAddContact] = useState(false);
    const [showAddedContact, setShowAddedContact] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [contactToUpdate, setContactToUpdate] = useState(null);
    
    const apiUrl = import.meta.env.VITE_API_URL

useEffect(() => {
    const fetchContacts = async () => {
        try {
            const token = localStorage.getItem('token')
            console.log(token)
            if(!token){
                console.error('No token found in Local Storage')
                return;

            }
            const response = await axios.get(`${apiUrl}/contacts`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response);
            // setContacts(response.data.contacts || [])
            if (response.data && Array.isArray(response.data.contacts)) {
              setContacts(response.data.contacts);
            } else {
              console.error('Unexpected response structure', response.data);
            }

        } catch (error) {
             console.error('Error Fetching Contacts', error, error.message)
        }
    }
    fetchContacts()
}, [])


const handleAddContact = () => {
  setShowAddContact(true);
};

const handleContactAdded = (newContact) => {
  setContacts((prevContacts) => {
    const updatedContacts = [...prevContacts, newContact];
    setShowAddedContact(true); // Set showAddedContact to true here
    return updatedContacts;
  });
};
  
// Close the modal


const handleUpdateContact = (contact) => {
  setContactToUpdate(contact);
  setShowContactModal(true);
};

const handleContactUpdated = (contactId, updatedContact) => {
  setContacts((prevContacts) =>
    prevContacts.map(contact => contact._id === contactId ? updatedContact : contact)
  );
  setShowContactModal(false);
};

const handleDeleteContact = async (contactId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${apiUrl}/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const deletedContact = contacts.find((contact) => contact._id === contactId);
      setContacts((contacts) => contacts.filter((contact) => contact._id !== contactId));
      alert(`"${deletedContact.name}" has been deleted successfully!`);
    } else {
      console.error('Error deleting contact', response);
    }
  } catch (error) {
    console.error('Error deleting contact', error);
  }
};


return (
  <div className="min-h-screen p-8 bg-gradient-to-br from-gray-700 via-gray-500 to-gray-700">
    <h2 className="text-3xl font-extrabold mb-6 text-center text-white">Contact List</h2>

    <div className="flex justify-center mb-6">
      <button
        onClick={handleAddContact}
        className="p-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out"
      >
        Add Contact +
      </button>
    </div>

    <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {contacts.map((contact) => {
        if (!contact) return null;
        return (
          <li
            key={contact._id}
            className="bg-gray-800 text-white rounded-2xl p-6 border-4 border-gray-700 hover:border-white transition duration-500 ease-in-out glow-effect"
          >
            <div className="flex flex-col items-center mb-4">
              <div className="relative w-24 h-24">
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-solid z-0 border-pink-500"></div>
              <img
                src={
                  contact?.image ||
                  '/profile-image.webp' ||
                  './src/images/profile-image.webp' ||
                  'No image'
                }
                alt="Profile Image"
                className="w-full h-full rounded-full object-cover border-[6px] border-transparent relative z-10 p-1"
              />
              </div>
              <h2 className="text-2xl font-bold ml-4 text-white">{contact?.name}</h2>
            </div>

            <div className="text-gray-300">
              <p className="mb-2"><strong>Phone:</strong> {contact?.phone}</p>
              <p className="mb-2"><strong>Email:</strong> {contact?.email}</p>
              <p className="mb-2"><strong>Notes:</strong> {contact?.notes}</p>
              <p className="mb-2">
                <strong>Address:</strong> {contact.address?.city}, {contact.address?.state}, {contact.address?.country} - {contact.address?.zip}
              </p>
              <p><strong>Date Added:</strong> {contact?.dateAdded}</p>
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl hover:rotate-1"
                onClick={() => handleUpdateContact(contact)}
              >
                Update Contact
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl hover:animate-bounce"
                onClick={() => handleDeleteContact(contact._id)}
              >
                Delete Contact
              </button>
            </div>
          </li>
        );
      })}
    </ul>

    {showAddContact && (
      <AddContact
        key={contacts.length}
        isOpen={showAddContact}
        closeModal={() => setShowAddContact(false)}
        onContactAdded={handleContactAdded}
      />
    )}

    {showContactModal && (
      <UpdateContact
        isOpen={showContactModal}
        closeModal={() => setShowContactModal(false)}
        contact={contactToUpdate}
        onUpdate={handleContactUpdated}
      />
    )}
  </div>
);



}
export default Account;

