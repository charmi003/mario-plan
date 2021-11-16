import { CREATE_PROJECT, DELETE_PROJECT, SET_PROJECTS } from "./projectTypes"

const initialState={
    projects:[]
}


const projectReducer=(currState=initialState, action)=>{
    switch(action.type){
        case CREATE_PROJECT:
            // console.log("Project created!");  //browser
            action.alert.show("Project Created!!",{ type:"success" });
            return currState

        case SET_PROJECTS:
            return{
                ...currState,
                projects:[...action.payload]
            }
        case DELETE_PROJECT:
            action.alert.show("Project Deleted!!",{ type:"success" });
            return currState
    
        default:
            return currState;
    }
}

export default projectReducer