import { useState } from "react";
import { LuUser } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const Register = () => {
  const [login, setLogin] = useState(true);
  const [passwordVis, setPasswordVis] = useState(true);
  return <div>

    {!login && 
    // Register
      <form>

        <h2><span>Re</span><span>gistration</span></h2>

        <div>
          <LuUser />
          <input type="text" placeholder="Enter your name" name="name" required />
        </div>

        <div>
          <MdOutlineEmail />
          <input type="email" placeholder="Enter your email" name="email" />
        </div>

        <div>
          <IoLockClosedOutline />
          <input type="password" placeholder="Create password" name="password" />
        </div>

        <div>
          <IoLockClosedOutline />
          <input type={passwordVis ? "password" : "text"} placeholder="Confirm password" name="confirm password" />

          {
            passwordVis ? <FaRegEye onClick={() => setPasswordVis(false)}/> : <FaRegEyeSlash onClick={() => setPasswordVis(true)} />
          }

        </div>

        <button>Register Now</button>
        
        <div>Aready have an account <span onClick={() => setLogin(true)}>Login now</span></div>


      </form>
    }

    {login && 
    // Login 
      <form>

        <h2><span>Lo</span><span>gin</span></h2>

        <div>
          <MdOutlineEmail />
          <input type="email" placeholder="Enter your email" name="email" />
        </div>

        <div>
          <IoLockClosedOutline />
          <input type={passwordVis ? "password" : "text"} placeholder="Confirm a password" name="confirm password" />

          {
            passwordVis ? <FaRegEye onClick={() => setPasswordVis(false)}/> : <FaRegEyeSlash onClick={() => setPasswordVis(true)} />
          }

        </div>

        <button>Register Now</button>
        
        <div>Aready have an account <span onClick={() => setLogin(true)}>Login now</span></div>
      </form>
    }
    
    </div>;
};

export default Register;
