import React, { Component } from "react";
import axios from "axios";
import _ from "underscore";
import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";
import Button from "@material-ui/core/Button";
import Spinner from "../UI/Spinner/Spinner";
import Footer from "../Footer";
import "./ElectionResult.css";
import Flag from "./usa.jpg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

class ElectionResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            error: null,
            loading: false,
            winner: {
                vote: 0,
                name: ''
            },
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
                    let electionResult = res.data.elecResult;
                    let winner = Object.values(electionResult).sort(
                        (prev, next) => next["voteCount"] - prev["voteCount"]
                    )[0];
                    this.setState({
                        result: electionResult,
                        loading: false,
                        winner: winner,
                    });
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
        const { result, error, loading, winner } = this.state;
        let ui = null;
        if (loading) {
            ui = <Spinner />;
        }
        let winnerUI = null;
        if (!loading && result.length > 0) {
            winnerUI =  <span className="winner">
            <h3>
              Congratulations {winner.first_name + " " + winner.last_name}
            </h3>
          </span>
            ui = (
                <React.Fragment>
                    <table id="Table">
                        <thead>
                        <tr>
                            <th>Candidate Name</th>
                            <th>
                                Total Votes Received
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
                        {result.map((cand,index) => {
                            let id = cand.id;
                            let voteCount = cand.voteCount;
                            const name = cand.first_name + " " + cand.last_name;
                            return (
                                <tr key={index}>
                                    <td>{name}</td>
                                    <td>{voteCount}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    {
                        winnerUI
                    }
                </React.Fragment>
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
            <div className="container">
                <div className="ElectionResult">
                    <img className="us_flag" src={Flag} />
                    {ui}
                </div>
                {
                    winnerUI
                }
                <Footer />
            </div>
        );
    }
}

export default ElectionResult;
