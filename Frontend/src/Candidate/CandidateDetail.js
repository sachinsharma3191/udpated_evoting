import React from "react";
import { useHistory } from "react-router";
import "./Candidate.css";

const CandidateDetail = (props) => {
  const history = useHistory();
  const candidate = props.history.location.state.candidateDetails[0];
  return (
    <div className="row">
      <div className="col-md-4">
        <img className="card-img-top" src={candidate["image"]}
        alt=""/>
      </div>
      <div className="col-md-4">
        <h2 className="label">
          <label htmlFor="long">Info</label>
        </h2>
        <div><span className="candidate">{candidate.candidate_info}</span></div>
      </div>
      <div className="col-md-4">
        <h2>
          <label htmlFor="long">Career</label>
        </h2>
        <div><span className="candidate">{candidate.candidate_short_desc}</span></div>
      </div>
      <div className="Button">
        <button className="btn btn-primary" onClick={() => history.goBack()}>
          Go Back
        </button>
      </div>
    </div>
  );
};
export default CandidateDetail;
