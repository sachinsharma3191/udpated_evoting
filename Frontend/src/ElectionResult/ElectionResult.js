import React, { Component } from "react";
import axios from "axios";
import _ from "underscore";
import Spinner from "../UI/Spinner/Spinner";
import Footer from '../Footer';

class ElectionResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      error: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.loadResult();
  }

  loadResult = async () => {
    this.setState({ loading: true });
    axios
      .get("http://localhost:3002/result/ " + new Date())
      .then((res) => {
        if (!_.isEmpty(res.data.elecResult)) {
          this.setState({ result: res.data.elecResult, loading: false });
        }
      })
      .catch((err) => {
        if (!_.isEmpty(err.response)) {
          this.setState({ error: err.response.data.msg, loading: false });
        } else {
          this.setState({ error: err, loading: false });
        }
      });
  };

  render() {
    const { result, error, loading } = this.state;
    let ui = null;
    if (loading) {
      ui = <Spinner />;
    }
    if (!loading && result.length > 0) {
      ui = result.map((cand) => {
        let id = cand.id;
        let voteCount = cand.voteCount;
        const name = cand.first_name + " " + cand.last_name;
        return (
          <div key={id} className="row">
            <div className="col-md-6">
              <span>
                <h2>{name}</h2>
              </span>
            </div>
            <div className="col-md-6">
              <span>
                <h4>{voteCount}</h4>
              </span>
            </div>
          </div>
        );
      });
    }
    if (!loading  && error) {
      ui = (
        <span>
          <h2>{error}</h2>
        </span>
      );
    }
    return (
      <div className="container">
        <div className="row">
        {ui}  
        </div>
      <Footer/>
      </div>
    );
  }
}

export default ElectionResult;