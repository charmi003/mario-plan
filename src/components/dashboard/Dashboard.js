import React from 'react'
import ProjectList from '../projects/ProjectList'
import { getAuth } from '@firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux'

const Dashboard = () => {
    
    const auth=getAuth();
    const [user,loading,error] = useAuthState(auth);

    const projects = useSelector(state => state.project.projects);

    if(!user)
        return <Redirect to="/sign-in" />

    return (
        <div className="dashboard">
                {/* Project List */}
                <div className="w-5/6 mx-auto mt-4">
                    <ProjectList projects={projects} />
                </div>
        </div>
        
    )
}

export default Dashboard
