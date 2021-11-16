import { db } from "../../config/firebase"
import { CREATE_PROJECT, DELETE_PROJECT, SET_PROJECTS } from "./projectTypes"
import { collection, addDoc,deleteDoc, serverTimestamp, doc } from "firebase/firestore"


export const createProject=(project,alert,history)=>{

    return async function( dispatch,getState){
        //async code (halting the dispatch)

        try{
            let data={
                ...project,
                authorFirstName:getState().auth.user.firstName,
                authorLastName:getState().auth.user.lastName,
                authorId:getState().auth.user.id,
                createdAt: serverTimestamp()
            }
            
            const projectCollectionRef=collection(db,"projects");
            const docRef=await addDoc(projectCollectionRef, data);
            dispatch({ type:CREATE_PROJECT, payload:project, alert:alert});

            history.push('/');
    
        }
        catch(error){
            document.querySelector(".create-project-btn").disabled=false;
            alert.show("Something Went Wrong!!",{
                type:'error'
            })

        }
    }
}




export const setProjects=(projects)=>{

    return { type:SET_PROJECTS, payload:projects }
}




export const deleteProject=(projectId,alert,history)=>{

    return async (dispatch,getState)=>{
        try{
            const docRef=doc(db,"projects",projectId);
            await deleteDoc(docRef);
            dispatch({ type:DELETE_PROJECT, alert:alert });
            history.go(-1);
        }
        catch(error){
            alert.show("Something Went Wrong!!",{
                type:'error'
            })
        }
    }

}