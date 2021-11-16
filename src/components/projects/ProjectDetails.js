import React from 'react'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../layouts/Loading';
import { getAuth } from '@firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import {  Redirect,useHistory } from 'react-router-dom';
import moment from 'moment'
import { deleteProject } from '../../redux';
import { useAlert } from 'react-alert';



const ProjectDetails = () => {

    const history=useHistory();
    const alert=useAlert();

    const params=useParams();
    // console.log(params.id);
    //alternatively, props.match.params.id
    const dispatch=useDispatch();

    const projectId=params.id;
    const projects = useSelector(state => state.project.projects);
    const project=projects.find( (p)=> p.id===projectId );

    const auth=getAuth();
    const [user,loading,error] = useAuthState(auth); 
    if(!user)
        return <Redirect to="/sign-in" />

    return ( (!loading && project) ? (

        <div className="container section project-details">

            <div className="card z-depth-4">
                <div className="card-content">
                    <span className="card-title">{project.title}</span>
                    <p>{project.content}</p>
                </div>

                <div className="card-action grey lighten-4 grey-text">
                    <div>Posted by {project.authorFirstName} {project.authorLastName} </div>
                    <div>{moment(project.createdAt.toDate()).format('MMMM Do YYYY, h:mm a')}</div>
                </div>
            </div>

            {/* show the delete and edit options only to the author of this project */}
            {
                user.uid===project.authorId ?

                <div className="mt-6">
                    <button 
                    onClick={(e)=>dispatch(deleteProject(project.id,alert,history))}
                    className="bg-yellow-300 text-indigo-900 font-semibold px-4 py-2.5 ml-3 border shadow-md transform scale-100 hover:scale-110">
                        Delete
                    </button>
                </div>  

                : null
            }
            

        </div>
    ) : <Loading/>
    )
}

export default ProjectDetails
