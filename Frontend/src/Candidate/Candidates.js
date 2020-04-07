import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import _ from "underscore";
import Spinner from "../UI/Spinner/Spinner";
import Candidate from "./Candidate";
import * as actions from "../redux/actions/index";

const style = {
  width: "30%",
  marginLeft: "30%",
  height: "50px",
  marginTop: "40px",
  marginBottom: "30px",
  fontSize: "20px"
};

class Candidates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidates: [],
      error: null,
      voter: 0,
      candidate: 0,
      loading: true,
      success: null,
    };
    this.showDetails = this.showDetails.bind(this);
    this.vote = this.vote.bind(this);
    this.handleCandidateChange = this.handleCandidateChange.bind(this);
  }

  componentDidMount = async () => {
    this.props.onFetchCandidates();
    axios
      .get("http://localhost:3002/candidate/all")
      .then((res) => {
        this.setState({ candidates: res.data.data, loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: error, loading: false });
      });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.candidates !== nextProps.candidates) {
      return {
        candidates: nextProps.candidates,
      };
    }
    return null;
  }

  arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  showDetails = (id) => {
    if (!_.isEmpty(id)) {
      const candidate = this.state.candidates.filter(
        (candidate) => candidate.id === id
      );
      this.props.history.push({
        pathname: "/CandidateDetail",
        state: { candidateDetails: candidate },
      });
    }
  };

  handleCandidateChange(event) {
    this.setState({ candidate: event.target.value });
  }

  vote() {
    console.log(this.state.candidate);
    if (this.state.candidate !== 0) {
      let formData = {
        voter: localStorage.getItem("userid"),
        candidate: this.state.candidate,
      };
      console.log(formData);
      axios
        .post("http://localhost:3002/vote", formData)
        .then((res) => {
          console.log(res);
          alert(res.data.msg);
        })
        .catch((err) => {
          alert(err.response.data.msg);
          this.setState({error : err.response.data.msg});
        });
    } else {
      alert("Select Candidate");
    }
  }

  render() {
    const { loading, candidates } = this.state;
    let dropDown = null;
    let button = null;
    let ui = null;
    if (loading && _.isEmpty(candidates)) {
      ui = <Spinner />;
    }
    if (!_.isEmpty(candidates)) {
      ui = candidates.map((candidate) => {
        return (
          <Candidate
            showDetails={this.showDetails}
            key={candidate.id}
            candidate={candidate}
          />
        );
      });

      dropDown = (
        <select style={style} onChange={this.handleCandidateChange}>
          <option>Select Candidate for Vote</option>
          {candidates.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.first_name + " " + candidate.last_name}
            </option>
          ))}
        </select>
      );

      button = (
        <div style={style}>
          <button className="btn btn primary" onClick={this.vote}>
            Vote
          </button>
        </div>
      );
    }
    return (
      <div className="row">
        {dropDown}
        {button}
        {ui}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.candidate.loading,
    error: state.candidate.error,
    candidates: state.candidate.candidates,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchCandidates: () => dispatch(actions.fetchCandidate()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Candidates)
);
