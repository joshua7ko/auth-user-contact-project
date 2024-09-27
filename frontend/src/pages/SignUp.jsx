import React from "react";
// import '../index.css'
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Signup(){
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
         fetchUsers()


    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:3001/register')
        .then((res) => {
            // console.log(res.data)
        })

    }

    const handleRegister = (event) => {
        event.preventDefault();

        if(!email || !username || !password ){
            alert('Please fill in all fields before registering.');
            return; 
        }

        axios.post('http://localhost:3001/register', {email, username, password})
        .then(() => {
            alert('User Registered Succesfully')
            setEmail('')
            setUsername('')
            setPassword('')
            fetchUsers()
            navigate('/login')
        })
        .catch((error) => {
            alert('Username Already exists')
            console.log('Unable to Register User', error)
        }) 
        }
        
        const [showPassword, setShowPassword] = useState(false);
        const toggleShowPassword = () => {
            setShowPassword(!showPassword);
          };
    

    return(
        <div className="w-full h-screen flex">
            <div className="w-1/2 h-full bg-[#020617] rounded-3xl text-white flex justify-center items-center">
                <form className="text-center bg-[#171717] text-1xl font-bold border-teal-300 
                border-4  rounded-xl w-[600px] h-[400px] p-9"
                onSubmit={handleRegister} >
                     {/* Email Input*/ }
                     <label>Email</label>
                     <br />
                     <input className="w-[400px] h-[40px] rounded-xl
                     bg-zinc-700 p-4 border-2 border-transparent focus:border-teal-400 focus:border-3 outline-none transition duration-300 ease-in-out"   
                     type='email'
                     placeholder="Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}/>
                     <br />
                     <br />
                     {/* Username Input*/ }
                     <label>Username</label>
                     <br />
                     <input className="w-[400px] h-[40px] rounded-xl
                     bg-zinc-700 p-4 border-2 border-transparent focus:border-teal-400 focus:border-3 outline-none transition duration-300 ease-in-out"   
                     type='text'
                     placeholder="Username"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}/>
                     <br />
                     <br />
                     {/* Password Input*/ }
                     <label>Password</label>
                     <br />
                     <div className="relative">
                     <input className="w-[400px] h-[40px] rounded-xl
                     bg-zinc-700 p-4 border-2 border-transparent focus:border-teal-400 focus:border-3 outline-none transition duration-300 ease-in-out"   
                     type={showPassword ? 'text' : 'password'}
                     placeholder="Password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}/>
                     <span className="absolute top-1/2 right-8 -translate-y-1/2 cursor-pointer" onClick={toggleShowPassword}>
                      {showPassword ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
                      </span>
                      </div>
                     <br />
                     <br />
                     {/* Button */ }
                     <button className="w-[200px] h-[50px] bg-gradient-to-r from-teal-500 via-blue-600 to-purple-700 
                     text-white font-bold text-xl rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-700 hover:via-blue-600 hover:to-teal-500"
                     type="submit">SUBMIT</button>
                    
                </form>
            </div>
            <div className="w-[50%] h-[100%] flex justify-center items-center rounded-3xl bg-gradient-to-r from-teal-500 via-blue-600 to-purple-700">
                <h2 className="text-5xl text-white 
                font-extrabold tracking-wider 
                hover:text-black hover:text-7xl">SIGNUP</h2>
            </div>
        </div>
    )
}

export default Signup