import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { signIn } from '../../redux';
import { useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';


const SignIn = () => {
    const history=useHistory();
    const alert=useAlert();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch=useDispatch();

    const submitHandler=(e)=>{
        e.preventDefault();
        document.querySelector('.login-btn').disabled=true;
        dispatch(signIn(email,password,alert,history));
    }


    return (
        <div className="container">

            <form action="" className="white" onSubmit={submitHandler}>
                <h5 className="grey-text text-darken-3">Log In</h5>

                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" required onChange={(e)=>setEmail(e.target.value)} />
                </div>

                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required onChange={(e)=>setPassword(e.target.value)} />
                </div>

                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0 transform scale-100 hover:scale-110 login-btn">
                        Login
                    </button>
                </div>
            </form>

        </div>
    )
}

export default SignIn
