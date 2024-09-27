import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig'
import { Modal } from '../Modal';

const AddContact = ({isOpen, closeModal, onContactAdded}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState({
    city: '',
    state: '',
    zip: '',
    country: ''
  });
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);
  



         

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newContact = {
      name,
      phone,
      email,
      address,
      notes
    };
    try {
      const token = localStorage.getItem('token');
      if(!token){
        setError("No Token Found In LocalStorage");
        return;
      }
      const response = await axios.post('http://localhost:3001/contacts', newContact, {
        headers: {
           Authorization: `Bearer ${token}`
        }
      })
      console.log(response);
      onContactAdded(response.data.contact);
      closeModal();
    } catch (error) {
       console.error('Error Adding Contact', error, error.message);
       setError('Failed to Add Contact. Please Try Again')
    };
    // console.log(newContact);
    
  };

  return (
<Modal isOpen={isOpen} toggleOpen={closeModal}>
  <div className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Contact</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block mb-4 text-gray-700">
        Contact Name:
        <input
          type="text"
          placeholder="Enter Contact Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 text-lg text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="block mb-4 text-gray-700">
        Contact Phone Number:
        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 text-lg text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="block mb-4 text-gray-700">
        Email:
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 text-lg text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="block mb-4 text-gray-700">
        Address:
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="w-full p-3 text-lg text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter State"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            className="w-full p-3 text-lg text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter Zip"
            value={address.zip}
            onChange={(e) => setAddress({ ...address, zip: e.target.value })}
            className="w-full p-3 text-lg text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter Country"
            value={address.country}
            onChange={(e) => setAddress({ ...address, country: e.target.value })}
            className="w-full p-3 text-lg text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </label>
      <label className="block mb-4 text-gray-700">
        Notes:
        <input
          type="text"
          placeholder="Notes about Contact"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-3 text-lg text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <button
        type="submit"
        className="bg-orange-600 hover:bg-orange-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
      >
        Add Contact
      </button>
    </form>
  </div>
</Modal>

    );
  };
  
  export default AddContact;
               


// const AddContact = () => {
//             const [name, setName] = useState('')
//             const [phone, setPhone] = useState('')
//             const [email, setEmail] = useState('')
//             const [address, setAddress] = useState({
                
//             })
//             const [notes, setNotes]  = useState('') 



//     return(
//         <div className="container mx-auto p-5">
//             <h2>Add New Contact</h2>
//             <label>Contact Name :</label>
//             <input type="text"
//             placeholder="Enter Contact Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)} />
//             <label>Contact Phone Number :</label>
//             <input type="Number"
//             placeholder="Enter Phone Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)} />
//             <label>Email :</label>
//             <input type="text"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)} />
//             <label>Address:</label>
//             <span>
//             <input type="text"
//             placeholder="Enter City"
//             value={city}
//             onChange={(e) => e.target.value} />
//             <input type="text"
//             placeholder="Enter State"
//             value={state}
//             onChange={(e) => e.target.value} />
//             <input type="Number"
//             placeholder="Enter Zip"
//             value={zip}
//             onChange={(e) => e.target.value} />
//             <input type="text"
//             placeholder="Enter Country"
//             value={country}
//             onChange={(e) => sete.target.value} />
//             </span>
//             <label>Notes :</label>
//             <input type="text"
//             placeholder="Notes about Contact"
//             value={name}
//             onChange={(e) => setNotes(e.target.value)} />
            
//         </div>
//     )
// }

