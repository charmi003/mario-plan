import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../layouts/Loading';
import { getAuth } from '@firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import ProjectList from './ProjectList';
import { Redirect } from 'react-router';

const MyProjects = () => {
    const projects=useSelector( (state)=> state.project.projects );

    const auth=getAuth();
    const [user,loading,error] = useAuthState(auth);

    const myProjects=projects.filter((p)=> p.authorId===user.uid );

    if(!user)
        return <Redirect to="/sign-in" />

    return (loading ? <Loading/> :(
            <div className="w-4/5 md:w-3/5 mx-auto mt-4">
                <ProjectList projects={myProjects} />
            </div>
        )
    )

}

export default MyProjects
