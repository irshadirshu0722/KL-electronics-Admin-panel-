
import "./login.css"
import {SignInForm} from "./component/signInForm"
export const SignIn  = ()=>{
    
    return (
        <section className="signin-body">
          <div className="container">
            <span className="borderline"></span>
    
            <SignInForm />
          </div>
        </section>
      );
}