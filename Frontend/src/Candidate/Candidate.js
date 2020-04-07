import React from "react";
import './Candidate.css';

const Candidate = (props) => {
  const candidate = props.candidate;
  const full_name = candidate.first_name + " " + candidate.last_name;
  return (
    <div className="row">
      <div className="col-md-3">
        <img
          className="card-img-top"
          src={candidate["image"]}
          alt=""
        />
      </div>
      <div className="col-md-3">
        <h2>{full_name}</h2>
      </div>
      <div className="col-md-3">
        <h2>{candidate.candidate_info}</h2>
      </div>
      <div className="col-md-3">
        <button
          className="Button btn btn-primary"
          onClick={(id) => props.showDetails(candidate.id)}
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default Candidate;
