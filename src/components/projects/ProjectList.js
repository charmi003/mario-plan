import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom'

const ProjectList = ({projects}) => {
    
    return (
        <div className="project-list">
          {
              projects.length ? projects.map((project)=>
                <Link to={ "/project/"+ project.id } key={project.id}>
                    <ProjectSummary  project={project} />
                </Link>
              )
              : null
          }
        </div>
    )
}

export default ProjectList
