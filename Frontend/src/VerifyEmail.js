import React, { Component } from "react";
import axios from 'axios';
import renderHTML from 'react-render-html';
import { Link, Redirect } from 'react-router-dom';
// import './Register.css';
// import './takephoto.css';
import './verifyemail.css';
import RegisterStorage from "./stores/RegisterStorage";
import swal from "sweetalert2";
const notifier = require('node-notifier');

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            email: RegisterStorage.email,
            username:RegisterStorage.username
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    togglefunc() {
        var temp = document.getElementById("otp");
        if (temp.type === "password") {
            temp.type = "text";
        }
        else {
            temp.type = "password";
        }
    }
    showfunc() {
        window.alert("OTP Sent To Email!!");
    }

    setInputValue(property, val) {
        val = val.trim();
        if (val.length > 12) {
            return;
        }
        this.setState({
            [property]: val
        })
    }

    async doOtpPost() {
        if (!this.state.otp)
            return;
        try {
            let res = await fetch('http://localhost:3002/otppost', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    otp: this.state.otp,
                    email: this.state.email,
                    username: this.state.username
                })
            });

            let result = await res.json();
            if (result && result.success) {
                // let redirectVar = null;

                swal.fire({
                    icon: 'success',
                    title: 'Congrats!! Email Verfied!',
                    text: 'Continue to upload your image!',
                    confirmButtonText: "OK"
                });
                // notifier.notify({
                //     title: 'Congrats!! Email Verfied!',
                //     message: 'Continue to upload your image!',
                //     icon: 'dwb-logo.png',
                //     contentImage: 'blog.png',
                //     sound: 'ding.mp3',
                //     wait: true
                // });
                console.log("username" + result.username);
                this.props.history.push("/takeregisterphoto");
                
                // redirectVar = <Redirect to="/welcome" />
            }

            else if (result && result.success === false) {
                // notifier.notify({
                //     title: 'Email Verification failed',
                //     message: 'Entered OTP is incorrect. Please try again!',
                //     icon: 'dwb-logo.png',
                //     contentImage: 'blog.png',
                //     sound: 'ding.mp3',
                //     wait: true
                // });
                swal.fire({
                    icon: 'error',
                    title: 'Email Verification failed',
                    text: 'Entered OTP is incorrect. Please try again!',
                    confirmButtonText: "OK"
                });
                this.props.history.push("/verifyemail");
            }
        }
        catch (e) {

        }
    }

    render() {
        return (
            <div className="container">
                <div className="header">
                    <div className="navigationclass row">
                        <ul className="navbar-nav" id="navg">
                            <li className="nav-item">
                                <Link to="/RegisterInfo" className="nav-link register" id="reg" >Register
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Login" className="nav-link" id="log" >Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" id="hom" >Hi there</a>
                            </li>
                            <li className="nav-item">
                                <a className="brand">Electronic</a>
                            </li>
                            <li className="nav-item">
                                <a className="colorb">Ballot</a>
                            </li>
                        </ul>
                    </div>
                </div>

        <div className="row">
                <div className="pitchline" id="pitch">
                    <div id="Main">Online election perfection!</div>
                    <div id="about">Our E-Voting solution is here for you.</div>
                </div>
        </div>

        <div className="maps">
<div className="overlaying ">
        <div className="bckimage " id="bck"> </div>
        <div className="qoute">
            <div className ="h3" className="since-title"> HelpingPeopleConnect
                    {/* <span></span> */}
                    <br></br>
                    Since 2020
                    <br></br>
                    Security & Trust
            </div>
        </div>
     </div>
     <div className="otpform otpdetails ">
                    Email Verification
                    
                <input type="password" className="loginclass inputFields input" value={this.state.otp} onChange={this.onChange} id="otp" name="otp" placeholder="Enter the One-time Password" required>
                 </input>
                <br></br>
                <br></br>
                <input type="checkbox" id="otpcheckbox" onClick={() => this.togglefunc()}></input>
                <span className="otpblock ">Check to show password></span>
                <br></br>
                <br></br>
                <input  text='Submit OTP' type="submit" className="btn" onClick={() => this.doOtpPost()} ></input>
                </div>
                </div>

            </div>

        );
    }
}
//Export The Main Component
export default VerifyEmail;