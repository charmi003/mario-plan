import React ,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { createProject } from '../../redux';
import { useHistory } from 'react-router-dom'
import { getAuth } from '@firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect } from 'react-router-dom';
import { useAlert } from 'react-alert';


const CreateProject = () => {
    const history=useHistory();
    const alert=useAlert();

    const [projectTitle, setProjectTitle] = useState("");
    const [projectContent, setProjectContent] = useState("");

    const dispatch=useDispatch();

    const submitHandler=(e)=>{
        e.preventDefault();
        document.querySelector(".create-project-btn").disabled=true;
        dispatch(createProject({
            title:projectTitle,
            content:projectContent
        },alert,history))
    }

    const auth=getAuth();
    const [user,loading,error] = useAuthState(auth);
    if(!user)
        return <Redirect to="/sign-in" />

    return (
        <div className="container">

            <form action="" className="white" onSubmit={submitHandler}>
                <h5 className="grey-text text-darken-3">Create A New Project</h5>

                <div className="input-field">
                    <label htmlFor="title">Project Title</label>
                    <input type="text" id="title" required onChange={(e)=>setProjectTitle(e.target.value)} />
                </div>

                <div className="input-field">
                    <label htmlFor="content">Project Content</label>
                    <input type="text" id="content" required onChange={(e)=>setProjectContent(e.target.value)} />
                </div>

                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0 transform scale-100 hover:scale-110 create-project-btn">
                        Create
                    </button>
                </div>
            </form>

        </div>
    )
}

export default CreateProject
