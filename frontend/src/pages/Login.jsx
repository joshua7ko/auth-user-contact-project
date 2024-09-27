import React from "react";
import { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";

function Login(){
     const [users, setUsers] = useState([])
     const [username, setUsername] = useState('')
     const [password, setPassword] = useState('')
     const navigate = useNavigate()


     useEffect(() => {
        fetchUsers()


   }, []);

   const fetchUsers = () => {
       axios.get('http://localhost:3001/register')
       .then((res) => {
        //    console.log(res.data)
       })

   }

   const handleLogin = async (event) => {
      event.preventDefault();
        try {
           const response = await axios.post('http://localhost:3001/login', { username, password })
            const token = response.data.token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            alert('User Login Succesful');
            setUsername('')
            setPassword('')
            fetchUsers()
            navigate('/account')
            window.location.reload()
            // localStorage.setItem('token', token)
        } catch(error) {
            // alert('Wrong User Credentials')
            // console.log('Login Error')
            if (error.response) {
                alert('Invalid User Credentials'); 
              } else {
                alert(error.response.data.message);
              }
        }
   }


   const [showPassword, setShowPassword] = useState(false);
   const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

    return(
        <div className="w-full h-screen flex">

            <div className="w-1/2 h-full flex justify-center items-center rounded-3xl bg-gradient-to-r from-teal-500 via-blue-600 to-purple-700">
                <h2 className="text-5xl text-white font-extrabold 
                \tracking-wider hover:text-black hover:text-7xl">LOGIN</h2>
            </div>

            <div className="w-1/2 h-full bg-[#020617] rounded-3xl text-white flex justify-center items-center">
                <form className="text-center bg-[#171717] text-1xl font-bold border-teal-300 
                border-4  rounded-xl w-[600px] h-[400px] p-9"
                onSubmit={handleLogin} >
                  
                     {/* Username Input*/ }
                     <label>Username</label>
                     <br />
                     <input className="w-[400px] h-[40px] rounded-xl
                     bg-zinc-700 p-4 mb-4 border-2 border-transparent focus:border-teal-400 focus:border-3 outline-none transition duration-300 ease-in-out"   
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
                     bg-zinc-700 p-4 mb-4 border-2 border-transparent focus:border-teal-400 focus:border-3 outline-none transition duration-300 ease-in-out"   
                     type={showPassword ? 'text' : 'password'}
                     placeholder="Password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     />
                     <span className="absolute top-1/2 right-8 -translate-y-1/2 cursor-pointer" onClick={toggleShowPassword}>
                      {showPassword ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
                      </span>
                      </div>
                     <br />
                     <br />
                     {/* Button */ }
                     <button className="w-[200px] h-[50px] bg-gradient-to-r from-teal-500 via-blue-600 to-purple-700 
                     text-white font-bold text-xl rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-700 hover:via-blue-600 hover:to-teal-500"
                     type="submit">LOGIN</button>

                </form>
            </div>
            
        </div>
    )
}

export default Login