import './App.css';
import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/layouts/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import CreateProject from './components/projects/CreateProject';

import { useDispatch } from 'react-redux'
import { db  } from './config/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { setProjects } from './redux'

import { getAuth } from '@firebase/auth';
import {useAuthState} from "react-firebase-hooks/auth";
import Loading from './components/layouts/Loading';
import MyProjects from './components/projects/MyProjects';


//route guarding..
//dashboard, project details, create project


function App() {

    const dispatch=useDispatch();

    //generally, app cpm renders..then firebase auth initialized
    //we need to render our app only when authentication has been initialized else we'll get a flash of signedout links ..(bad user experience)
    const auth=getAuth();
    const [user,loading,error] = useAuthState(auth);


    //fetching all the projects
    useEffect(async () => {
        const projectCollectionRef=collection(db,"projects");
        const q= query( projectCollectionRef, orderBy("createdAt","desc") ); //desc for descending

        const unsub=onSnapshot(q,  (snapshot)=>{
          let res=snapshot.docs.map( (doc) => ({...doc.data(), id:doc.id}) );
          dispatch(setProjects(res));
        })
        
        return unsub;
    },[])

  

  return (loading? <Loading/> :(
      <Router>
        <div className="App">

          <Navbar/>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/project/:id" component={ProjectDetails} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/create-project" component={CreateProject} />
            <Route exact path="/my-projects" component={MyProjects} />
          </Switch>
    
        </div>
      </Router>
    )
  );
}

export default App;



//firebase
//database, server side , authentication, deployment --> all services provided
//firestore --> noSql database provided by firebase