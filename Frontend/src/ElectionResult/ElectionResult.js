import React, { Component } from "react";
import axios from "axios";
import _ from "underscore";
import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";
import Button from "@material-ui/core/Button";
import Spinner from "../UI/Spinner/Spinner";
import Footer from "../Footer";
import './ElectionResult.css';


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

    sortData(e, sortColumn, sortOrder) {
        let { result } = this.state;
        if (sortColumn === "vote") {
            result = result.sort((a, b) => {
                let vote1 = parseInt(a.voteCount);
                let vote2 = parseInt(b.voteCount);
                return sortOrder === "asc" ? vote1 - vote2 : vote2 - vote1;
            });
        }
        this.setState({
            result: result,
        });
    }

  render() {
    const { result, error, loading } = this.state;
    let ui = null;
    if (loading) {
      ui = <Spinner />;
    }
    if (!loading && result.length > 0) {
      ui = (
          <table id="Table">
            <thead>
            <tr>
              <th>Candidate Name</th>
              <th>Total Votes Received
                  <Button onClick={(e) => this.sortData(e, "vote", "asc")}>
                      <FaSortUp />
                  </Button>
                  <Button onClick={(e) => this.sortData(e, "vote", "desc")}>
                      <FaSortDown />
                  </Button>
              </th>
            </tr>
            </thead>
            <tbody>
            {result.map((cand) => {
              let id = cand.id;
              let voteCount = cand.voteCount;
              const name = cand.first_name + " " + cand.last_name;
              return (
                  <tr>
                    <td>{name}</td>
                    <td>{voteCount}</td>
                  </tr>
              );
            })}
            </tbody>
          </table>
      );
    }
    if (!loading && error) {
      ui = (
          <span>
          <h2>{error}</h2>
        </span>
      );
    }
    return (
        <div className="container election">
          <div className="ElectionResult">{ui}</div>
          <Footer />
        </div>
    );
  }
}

export default ElectionResult;
