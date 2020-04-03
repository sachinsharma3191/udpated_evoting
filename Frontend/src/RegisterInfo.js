import React, { Component } from "react";
import renderHTML from 'react-render-html';
import { Link, Redirect } from 'react-router-dom';
import './RegisterInfo.css';

class RegisterInfo extends Component {
    render() {
      return (
       
 <div className ="container">
     <div className= "header">
            <div className="navigationclass row">
                    <ul className="navbar-nav" id="navg">
                        <li className="nav-item">
                        <Link to="/Register">
                            <a className="nav-link register" id="reg" >Register</a>
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/Login">
                        <a className="nav-link" id="log" >Login</a>
                        </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" id="hom" >Home</a>
                        </li>
                        <li className="nav-item">
                            <a className=" brand">Electronic</a>
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
<div className="row registerimage">
<div className="qoutereg">
            <div className ="h3" class="since-title"> Help.Us.Help.You
                    <br></br>
                    Security & Trust
            </div>
        </div>
    <div className="overlayingreg col-md-6">
        <div className="regimage " id="reg"> </div>
        
        <div class="resgitrationdetails">Create account
                    <input type="text" className= "registerclass" id="fname" name="fname" placeholder="Please enter your first name" required>
                    </input>
                    <br></br>
                    <input type="text" className= "registerclass" id="lname" name="lname" placeholder="Please enter your Last name" required>
                    </input>
                    <br></br>
                    <input type="text" className= "registerclass" id="email" name="email" placeholder="Please enter your Email" required>
                    </input>
                    <br></br>
                    <input type="password" className= "registerclass" oninput="pwstrength()" id="password"  name="password" placeholder="Please enter a password" required>
                    </input>
                    <br></br>
                    <input type="text" placeholder="Please Enter your Date of Birth" 
                    onfocus="(this.type='date')" className= "registerclass" id="dob" name="dob" placeholder="Please provide your DoB in mm/dd/yyyy format" required>
                    </input>
                    <br></br>
                    <input type="list" list="genderoptions" className="registerclass" id="gender" name="gender" placeholder="Please select your gender" required>
                    </input>
                    <datalist id="genderoptions">
                        <option value="Female"></option>
                        <option value="Male"></option>
                    </datalist>
                    {/* <br><br></br></br> */}
                    <span className="pwdstrength" id="pwmsg"> Password Strength: </span><br></br>
                    <meter className="meter " id="strength"></meter>
                    <button className="rg" id="rg" onclick="location.href='takephoto.html';">Register</button>
        </div>

    </div>
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

</div>
      );
    }
  }
  //Export The Main Component
  export default RegisterInfo;
  