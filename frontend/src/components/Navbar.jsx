import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../index.css';

function Navbar(){
  const isUserSIgnedIn = !!localStorage.getItem('token')
  const navigate = useNavigate()


  const handleSignout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

    return(
        <nav className='flex justify-around p-3 border-b-8 text-3xl font-bold
        items-center bg-[#1a1a1a]/90 text-zinc-300' >
            <Link to='/' className="drop-shadow-[0_0_20px_#ffd700]"><h1>NAV-BAR</h1></Link>
              <ul className="flex gap-6 drop-shadow-[0_0_20px_#ffd700]">
                { isUserSIgnedIn? (
                    <>
                    <Link to='/account'><h2>LOGIN</h2></Link>
                    <li><button onClick={handleSignout}>SIGNOUT</button></li>
                    </>
                  ) : (
                    <>
                    <Link to='/login'><h2>LOGIN</h2></Link>
                    <Link to='/signup'><h2>SIGN-UP</h2></Link>
                    </>
                  )

                  
                }
               
              </ul>
        </nav>
        
    )
}

export default Navbar