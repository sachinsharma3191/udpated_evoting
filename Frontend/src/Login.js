import { connect } from "react-redux";
import React from "react";
import { Redirect } from "react-router-dom";
import "./App.css";
import * as actions from "./redux/actions/index";
import InputFields from "./inputFields";
import SubmitButton from "./submitButton";

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username : '',
            password : '',
            buttonDisabled : false
        }
    }

    setInputValue(property, val)
    {
        //~val = val.trim();
        if(val.length > 12)
        {
            return ;
        }
        this.setState({
         [property]: val
        })
    }

async doLogin() {
    this.props.onAuth(this.state.username, this.state.password);
  }


  render() { 
    let redirectVar = null;
    if (this.props.isAuthenticated) {
      redirectVar = <Redirect to="/Home" />;
    }
    return (
      

<div className = 'container'>
{redirectVar} 
        {/* <div className="body"> */}
<div className="row">
        <div className="pitchline" id="pitch">
            <div id="Main">Online election perfection!</div>
            <div id="about">Our E-Voting solution is here for you.</div>
        </div>
</div>
                
<div className="maps"></div>
<div className="qoute">
            <div className ="h3" className="since-title"> Helping People Connect
                    <br></br>Since 2020
                    <p>Security & Trust</p>
            </div>
</div>
<div className="logindetails">Enter credentials
           <InputFields type='text' placeholder='Username'
           value={ this.state.username ? this.state.username:''}
           onChange = {(val)=> this.setInputValue('username',val)}
           />
           <InputFields type='password' placeholder='Password'
           value={ this.state.password ? this.state.password:''}
           onChange = {(val)=> this.setInputValue('password',val)}
           />
           <SubmitButton
           text='Login'
           disabled = {this.state.buttonDisabled}
           onClick={()=> this.doLogin()}
           />
</div>

<div className= "row">
    < div className ="reviews">
            <div className="reviewtitle">
                    <div className=" h3 titlemessage"> Straight from the horses mouth! </div>
                        <span></span>
                    <p>ElectronicBallot has been rated 4.8 out of 5 stars with 430000+ reviews</p>
            </div>
            <div className="col-md-4 customer">
                <div className="photoandstar">
                    <div className="custname">Vrushali</div>
                    <div className="custphoto1"></div>
                    <div className="stars">
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                    </div>
                </div>
                <div className="review">
                    When nothing else worked, ElectronicBallot came to the rescue.
                </div>
            </div>
            <div className="col-md-4 customer">
                <div className="photoandstar">
                    <div className="custname">Nistha</div>
                    <div className="custphoto2"></div>
                    <div className="stars">
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                    </div>
                </div>
                <div className="review">
                    Easy and hassle free.
                </div>
            </div>
            <div className="col-md-4 customer">
                <div className="photoandstar">
                    <div className="custname">Aditya</div>
                    <div className="custphoto3"></div>
                    <div className="stars">
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                    </div>
                </div>
                <div className="review">
                    ElectronicBallot has reduced the voting time by 90%.
                </div>
            </div>
            </div>
    </div>
    {/* </div> */}
        </div>
          
    );
  }
}

const mapStateToProps = (state) => {
    return {
      loading: state.auth.loading,
      error: state.auth.error,
      isAuthenticated: state.auth.token !== null,
      authRedirectPath: state.auth.authRedirectPath,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onAuth: (email, password) => dispatch(actions.auth(email, password)),
      onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
  
