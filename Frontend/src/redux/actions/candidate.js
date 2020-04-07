import axios from "axios";
import _ from "underscore";
import * as actionTypes from "./actionTypes";
import { arrayBufferToBase64 } from "../../util/utility";

const base64Flag = "data:image/jpeg;base64,";

export const fetchCandidateStart = () => {
  return {
    type: actionTypes.FETCH_CANDIDATES_START,
  };
};

export const fetchCandidate =  () => {
  return async  (dispatch) => {
    dispatch(fetchCandidateStart());
    axios
      .get("http://localhost:3002/candidate/all")
      .then((res) => {
        let candidates = res.data.data;
        for (let candidate of candidates) {
          let candidate_id = candidate["id"];
          let name = candidate["first_name"] + "_" + candidate["last_name"];

          axios
            .get("http://localhost:3002/candidate/image/" + name)
            .then((res) => {
              let imageStr = null;
              imageStr = arrayBufferToBase64(res.data.image.data);
              candidate["image"] = base64Flag + imageStr;
            })
            .catch((err) => {
              console.log(candidate);
            });
        }
        dispatch(fetchCandidateSuccess(candidates));
      })

      .catch((error) => {
        dispatch(fetchCandidateFail(error));
      });
  };
};

export const fetchCandidateSuccess = (candidates) => {
  return {
    type: actionTypes.FETCH_CANDIDATES_SUCCESS,
    candidates: candidates,
  };
};

export const fetchCandidateFail = (error) => {
  return {
    type: actionTypes.FETCH_CANDIDATES_FAIL,
    error: error,
  };
};

export const fetchCandidateImageStart = (candidate_id) => {
  return {
    type: actionTypes.FETCH_CANDIDATE_IMAGE_START,
  };
};

export const fetchCandidateImage = (candidates, name) => {
  return (dispatch) => {
    dispatch(fetchCandidateImageStart());
    axios
      .get("http://localhost:3002/candidate/image/" + name)
      .then((res) => {
        let first_name = name.split("_")[0];

        let imageStr = null;
        imageStr = arrayBufferToBase64(res.data.image.data);
        for (let candidate of candidates) {
          if (candidate.first_name === first_name) {
            candidate["image"] = base64Flag + imageStr;
          }
        }
        dispatch(fetchCandidateImageSuccess(candidates));
      })
      .catch((err) => {
        dispatch(fetchCandidateFail(err.response));
      });
  };
};

export const fetchCandidateImageSuccess = (candidates) => {
  return {
    type: actionTypes.FETCH_CANDIDATE_IMAGE_SUCCESS,
    candidates: candidates,
  };
};

export const fetchCandidateImageFail = (error) => {
  return {
    type: actionTypes.FETCH_CANDIDATE_IMAGE_FAIL,
    error: error,
  };
};
