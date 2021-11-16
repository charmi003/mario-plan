import React,{ useState } from 'react'
import { useDispatch } from 'react-redux';
import { signUp } from '../../redux';
import { useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert'

const SignUp = () => {
    const history=useHistory();
    const alert = useAlert();

    const dispatch=useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    
    const submitHandler=async (e)=>{
        e.preventDefault();
        document.querySelector('.signup-btn').disabled=true;
        const credentials={
            email,
            password,
            firstName,
            lastName
        }
        dispatch(signUp(credentials,alert,history));
    }

    return (
        <div className="container">

            <form action="" className="white" onSubmit={submitHandler}>
                <h5 className="grey-text text-darken-3">Sign Up</h5>

                <div className="input-field">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" required onChange={(e)=>setFirstName(e.target.value)} />
                </div>

                <div className="input-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" required onChange={(e)=>setLastName(e.target.value)} />
                </div>


                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" required onChange={(e)=>setEmail(e.target.value)} />
                </div>

                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required onChange={(e)=>setPassword(e.target.value)} />
                </div>

                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0 transform scale-100 hover:scale-110 signup-btn">
                        Sign Up
                    </button>
                </div>
            </form>

        </div>
    )
}

export default SignUp
