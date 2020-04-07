import React from "react";
import "./App.css";

const Footer = () => {
  return (
    <div className="row">
      <div className="reviews">
        <div className="reviewtitle">
          <div className=" h3 titlemessage">
            Straight from the horses mouth!
          </div>
          <span></span>
          <p>
            ElectronicBallot has been rated 4.8 out of 5 stars with 430000+
            reviews
          </p>
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
          <div className="review">Easy and hassle free.</div>
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
  );
};

export default Footer;
