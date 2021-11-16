import { onSnapshot,collection, query,where, doc, serverTimestamp, setDoc, getDoc } from "@firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";
import { db } from "../../config/firebase";
import { LOGIN_SUCCESS, SIGNUP_SUCCESS, LOGOUT_SUCCESS, SET_USER } from "./authTypes";


export const signIn=(email,password,alert,history)=>{

    return (dispatch,getState)=>{
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then( async (userCredential) => {
            //Signed in 
            const userCollectionRef=collection(db,"users");
            const q=query(userCollectionRef,where("email","==",email));

            onSnapshot(q, async (snapshot)=>{
                let res=snapshot.docs.map( (doc) => ({...doc.data(), id:doc.id}) );
                await dispatch({ type:LOGIN_SUCCESS, payload:res[0], alert:alert});
                history.push("/");
            })
        })
        .catch((error) => {
            document.querySelector('.login-btn').disabled=false;
            alert.show(error.message,{
                type:"error"
            })
        });
    }
}


export const signUp=(credentials,alert,history)=>{

    return (dispatch,getState)=>{
        const auth = getAuth();
        
        createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then( async (userCredential) => {
            // Signed in 
            await setDoc( doc(db,"users",userCredential.user.uid),{
                ...credentials,
                createdAt:serverTimestamp()
            } )
            await dispatch({ type:SIGNUP_SUCCESS, alert:alert });
            history.push("/sign-in");
        })
        .catch((error) => {
            document.querySelector('.signup-btn').disabled=false;
            alert.show(error.message,{
                type:"error"
            })
        });
    }
}


export const logOut=(alert)=>{

    return (dispatch,getState)=>{
        const auth=getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch({ type:LOGOUT_SUCCESS, alert:alert })
          }).catch((error) => {
            // An error happened.
            alert.show(error.message,{
                type:'error'
            })
          });
    }

}


export const setUser=(email)=>{
    return (dispatch,getState)=>{
        const userCollectionRef=collection(db,"users");
        const q=query(userCollectionRef,where("email","==",email));

        onSnapshot(q, (snapshot)=>{
            let res=snapshot.docs.map( (doc) => ({...doc.data(), id:doc.id}) );
            dispatch({ type:SET_USER, payload:res[0]});
        })
    }
}