import React, { useState } from "react";
import axios from "../axiosConfig";
import { Modal } from "../Modal";

const UpdateContact = ({ isOpen, closeModal, contact, onUpdate }) => {
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);
  const [email, setEmail] = useState(contact.email);
  const [address, setAddress] = useState({
    city: contact.address?.city || '',
    state: contact.address?.state || '',
    zip: contact.address?.zip || '',
    country: contact.address?.country || '',
  });
  const [notes, setNotes] = useState(contact.notes);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const updatedContact = {
        name,
        phone,
        email,
        address,
        notes,
      };
      const res = await axios.put(`http://localhost:3001/contacts/${contact._id}`, updatedContact, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage(`Contact updated successfully!`);
      onUpdate(contact._id, updatedContact);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} toggleOpen={closeModal}>
      <div className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Update Contact</h2>
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
            Update Contact
          </button>
        </form>
        {successMessage && (
          <div className="text-green-600 font-bold mb-4">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="text-red-600 font-bold mb-4">
            {error}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UpdateContact;



















// import React, {useState, useEffect} from "react";
// import axios from "../axiosConfig"
// import { Modal } from "../Modal";


// const UpdateContact = (isOpen, closeModal, contact) => {
//     // const [name, setName] = useState('');
//     // const [phone, setPhone] = useState('');
//     // const [email, setEmail] = useState('');
//     // const [address, setAddress] = useState({
//     //   city: '',
//     //   state: '',
//     //   zip: '',
//     //   country: ''
//     // });
//     // const [notes, setNotes] = useState('');
//     // const [error, setError] = useState(null);
//     // const [successMessage, setSuccessMessage] = useState('');
//     const [name, setName] = useState(contact.name);
//   const [phone, setPhone] = useState(contact.phone);
//   const [email, setEmail] = useState(contact.email);
//   const [address, setAddress] = useState(contact.address);
//   const [notes, setNotes] = useState(contact.notes);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');



// const toUpdate = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     console.log(token);
//     if (!token) {
//       console.error("No Token Found In Local Storage");
//     }
//     const res = await axios.post(`http://localhost:3001/contacts/${contact._id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     console.log(res);
//     if (res.data && Array.isArray(res.data.contacts)) {
//       // setContacts(res.data.contacts); // Not sure what this does, but it's not used anywhere
//     } else {
//       console.error('Unexpected response structure', res.data);
//     }
//   } catch (error) {
//     console.error('Error Fetching Contacts', error, error.message);
//   }
// };

// toUpdate(); // Call the function directly

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const token = localStorage.getItem('token');
//     const res = await axios.post(`http://localhost:3001/contacts/${contact._id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     setSuccessMessage(`Contact updated successfully!`);
//   } catch (error) {
//     setError(error.message);
//   }
// };








// return (
//   <Modal isOpen={isOpen} toggleOpen={closeModal}>
//     <div className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">Update Contact</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <label className="block mb-4 text-gray-700">
//           Contact Name:
//           <input
//             type="text"
//             placeholder="Enter Contact Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-3 text-lg text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>
//         <label className="block mb-4 text-gray-700">
//           Contact Phone Number:
//           <input
//             type="text"
//             placeholder="Enter Phone Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full p-3 text-lg text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>
//         <label className="block mb-4 text-gray-700">
//           Email:
//           <input
//             type="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 text-lg text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>
//         <label className="block mb-4 text-gray-700">
//           Address:
//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Enter City"
//               value={address.city}
//               onChange={(e) => setAddress({ ...address, city: e.target.value })}
//               className="w-full p-3 text-lg text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <input
//               type="text"
//               placeholder="Enter State"
//               value={address.state}
//               onChange={(e) => setAddress({ ...address, state: e.target.value })}
//               className="w-full p-3 text-lg text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <input
//               type="text"
//               placeholder="Enter Zip"
//               value={address.zip}
//               onChange={(e) => setAddress({ ...address, zip: e.target.value })}
//               className="w-full p-3 text-lg text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <input
//               type="text"
//               placeholder="Enter Country"
//               value={address.country}
//               onChange={(e) => setAddress({ ...address, country: e.target.value })}
//               className="w-full p-3 text-lg text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </label>
//         <label className="block mb-4 text-gray-700">
//           Notes:
//           <input
//             type="text"
//             placeholder="Notes about Contact"
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             className="w-full p-3 text-lg text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>
//         <button
//           type="submit"
//           className="bg-orange-600 hover:bg-orange-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
//         >
//           Update Contact
//         </button>
//       </form>
//       {successMessage && (
//           <div className="text-green-600 font-bold mb-4">
//             {successMessage}
//           </div>
//         )}
//         {error && (
//           <div className="text-red-600 font-bold mb-4">
//             {error}
//           </div>
//         )}
//     </div>
//   </Modal>
  
//       );

//     }

// export default UpdateContact;












// useEffect (() => {
//   const  toUpdate = async () => {
//     try {
//         const token = localStorage.getItem('token')
//         console.log(token);
//         if(!token){
//             console.error("No Token FOund In Local Storage")

//         }
//         const res = await axios.post('http://loclhost:3001/contacts/:id', {
//             headers : {
//                 Authorization : `Bearer ${token}`
//             }
            
//         })
//         console.log(res)
//         if (response.data && Array.isArray(response.data.contacts)) {
//             setContacts(response.data.contacts);
//           } else {
//             console.error('Unexpected response structure', response.data);
//           }

//     } catch (error) {
//         console.error('Error Fetching Contacts', error, error.message)
//     }

//   }
//   toUpdate()
// }, [])









// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams} from 'react-router-dom';
// import axios from '../axiosConfig'

// const UpdateContact = () => {
//     const {id} = useParams()
//     const [name, setName] = useState('');
//     const [phone, setPhone] = useState('');
//     const [email, setEmail] = useState('');
//     const [address, setAddress] = useState({
//         city: '',
//         state: '',
//         zip: '',
//         country: ''
//     });
//     const [notes, setNotes] = useState('');
   
//     const navigate = useNavigate()

//     useEffect(() => {
//         console.log(id);
//         const fetchContact = async () => {
//             try{
//                 const response = await axios.get(`http://localhost:3001/contacts/${id}`);
//                 const {name, phone, email, address, notes} = response.data;
//                 setName(name)
//                 setPhone(phone);
//                 setEmail(email);
//                 setAddress(address);
//                 setNotes(notes);
//             } catch(error) {
//                 console.error("Error Fetching Contact: ", error)
//             }
//         }
       
//        fetchContact();
//     }, [id])

//     const update = async (e) => {
//         e.preventDefault(); 
//       try {
//         const response = await axios.put(`http://localhost:3001/contacts/${id}`, {
//             name, phone, email, address, notes
//         })
//         console.log(response.data)
//         navigate('/account')
//       } catch (error) {
//         console.error('Error updating contact:', error);
//       }
//     }
       

//     const handleAddressChange = (e) => {
//         const { name, value } = e.target;
//         setAddress(prevAddress => ({
//             ...prevAddress,
//             [name]: value
//         }));
//     };

//     return (
//         <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
//             <h2 className="text-2xl font-bold mb-4">Update Contact</h2>
//             <form onSubmit={update}>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Name:</label>
//                     <input 
//                         type="text" 
//                         value={name} 
//                         onChange={(e) => setName(e.target.value)}
//                         className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Phone:</label>
//                     <input 
//                         type="text" 
//                         value={phone} 
//                         onChange={(e) => setPhone(e.target.value)}
//                         className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Email:</label>
//                     <input 
//                         type="email" 
//                         value={email} 
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">City:</label>
//                     <input 
//                         type="text" 
//                         name="city"
//                         value={address.city} 
//                         onChange={handleAddressChange}
//                         className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">State:</label>
//                     <input 
//                         type="text" 
//                         name="state"
//                         value={address.state} 
//                         onChange={handleAddressChange}
//                         className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Zip:</label>
//                     <input 
//                         type="text" 
//                         name="zip"
//                         value={address.zip} 
//                         onChange={handleAddressChange}
//                         className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Country:</label>
//                     <input 
//                         type="text" 
//                         name="country"
//                         value={address.country} 
//                         onChange={handleAddressChange}
//                         className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Notes:</label>
//                     <input 
//                         type="text" 
//                         value={notes} 
//                         onChange={(e) => setNotes(e.target.value)}
//                         className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                     />
//                 </div>
//                 <button 
//                     type="submit"
//                     className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//                 >
//                     Update And Save
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default UpdateContact;



















// const updateContact =() => {
    
//          const[name, setName] = useState('')
//          const[phone, setPhone] = useState('')
//          const[email, setEmail] = useState('')
//          const[address, setAddress] = useState({
        
//             city:'',
//             state:'',
//             zip:'',
//             country:''
//         })
//         const[notes, setNotes] = useState('')
         

//         const handleAddressChange = () =>{
//             const {name, value} = e.target;
//             setAddress(prevAddress => ({
//                 ...prevAddress,
//                 [name]: value
//             }))
//         }

//     return (
//         <div>
//         <h2>Update Contact</h2>
//         <form action="">
//             <label>Name:</label>
//             <input type="text" value={name} 
//             onChange={(e) => setName(e.target.value)} />
//             <label>Phone:</label>
//             <input type="text" value={phone} 
//             onChange={(e) => setPhone(e.target.value)} />
//             <label>Email:</label>
//             <input type="text" value={email} 
//             onChange={(e) => setEmail(e.target.value)} />
//             <label>Address:</label>
//             <label>City:</label>
//             <input type="text" value={address.city} 
//             onChange={handleAddressChange} />
//             <label>State:</label>
//             <input type="text" value={address.state} 
//             onChange={handleAddressChange} />
//             <label>Zip:</label>
//             <input type="text" value={address.zip} 
//             onChange={handleAddressChange} />
//             <label>Country:</label>
//             <input type="text" value={address.country} 
//             onChange={handleAddressChange} />
//             <label>Notes:</label>
//             <input type="text" value={notes} 
//             onChange={(e) => setNotes(e.target.value)} />


//             <button type="submit">Update And Save</button>
//         </form>
//         </div>
//     )
// }

// export default updateContact