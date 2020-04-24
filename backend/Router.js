const bcrypt = require("bcrypt");
const fs = require("fs");
const nodemailer = require("nodemailer");
const _ = require("underscore");
const contract = require("./Contract").contract;
const accounts = require("./Contract").accounts;
const register = require("./Contract").register;
const Web3 = require("web3");
const random = require("random-int");
const object_hash = require("object-hash");

const columns = [
  "candidate_id",
  "first_name",
  "last_name",
  "dob",
  "candidate_info",
  "candidate_short_desc",
  "candidate_long_desc",
  "candidate_awards",
  "voteCount",
];


const imageDir = "./Images/";

const transConfig = {
  from: accounts,
  gasPrice: Web3.utils.asciiToHex("0.01"),
  gas: 6721975,
};

var otp;
const high = 999999;
const low = 111111;
var email;
class Router {
  constructor(app, db) {
    this.login(app, db);
    this.isLoggedIn(app, db);
    this.otpPost(app, db);
    this.registerPost(app, db);
    this.getCandidates(app, db);
    this.getCandidateImage(app, db);
    this.castVote(app, db);
    this.getElectionResult(app, db);
    this.registerVoter(app, db);
  }

  registerPost(app, db) {
    app.post("/registerpost", function (req, res) {
      email = req.body.email;
      var username = req.body.username;
      var fname = req.body.fname;
      var lname = req.body.lname;
      var dob = req.body.dob;
      var gender = req.body.gender;
      var salt = bcrypt.genSaltSync(10);
      var encryptedpassword = bcrypt.hashSync(req.body.password, salt);
      console.log(
        email,
        username,
        encryptedpassword,
        fname,
        lname,
        dob,
        gender
      );
      var sql = `INSERT INTO users(username,gender, password, firstname, lastname, emailid, dob, emailverified) VALUES(?,?,?,?,?,?,?,?)`;

      db.query(
        sql,
        [username, gender, encryptedpassword, fname, lname, email, dob, 0],
        function (error, results) {
          if (error) {
            console.log("An error ocurred...", error);
            res.json({
              code: 400,
              sucees: false,
              msg: "An error ocurred..",
            });
            return;
          } else {
            console.log("Success");

            otp = Math.floor(Math.random() * (high - low) + low);
            console.log(otp);
            const data = "Please Verify your email with the the One-time password given: ".concat(
              otp.toString()
            );
            console.log(data);
            var transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "electronicballet@gmail.com",
                pass: "25623360",
              },
            });

            var mailOptions = {
              from: "electronicballet@gmail.com",
              to: email,
              subject: "Email Verification - ElectronicBallet",
              text: data,
            };
            var successflag = true;
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
                successflag = false;
                // res.json({
                //     code: 400,
                //     sucees:false,
                //     msg: 'An error ocurred..'
                // });
                // return;
              } else {
                // res.json({
                //     code: 200,
                //     sucees:true,
                //     msg: 'An error ocurred..'
                // });
                console.log("Email sent: " + info.response);
                res.json({
                  code: 200,
                  success: true,
                  msg: "success",
                });
                console.log("Success sign-up");

                return;
                console.log("hello high bye bye");
                // return;
              }
            });

            console.log("hello high bye bye2");
            if (successflag) {
              res.json({
                code: 200,
                success: true,
                msg: "success",
              });
              console.log("Success sign-up");

              return;
            } else {
              res.json({
                code: 400,
                success: false,
                msg: "An error occured",
              });
              console.log("an error occured sign-up");
              return;
            }
          }
        }
      );
    });
  }

  otpPost(app, db) {
    app.post("/otppost", function (req, res) {
      var otpposted = req.body.otp;
      if (otpposted == otp) {
        console.log("here");

        var sql = `UPDATE users SET emailverified = '1' WHERE emailid = ?`;
        email = req.body.email;
        db.query(sql, [email], function (error, results) {
          if (error) {
            console.log("error occurred", error);
            res.json({
              code: 400,
              success: false,
              msg: "An error occured..",
            });
            return;
          } else {
            console.log("usernaame" + req.body.username);
            res.json({
              code: 200,
              success: true,
              username: req.body.username,
              msg: "Otp successfully verified..",
            });
            console.log("Success sign-up");
            return;
          }
        });
      } else {
        res.json({
          success: false,
          msg: "An error occured..",
        });
        return;
      }
    });
  }

  isLoggedIn(app, db) {
    app.post("/isLoggedIn", (req, res) => {
      if (req.session.userID) {
        let cols = [req.session.userID];
        db.query(
          "select * from users where id =? LIMIT 1",
          (err, data, fields) => {
            if (data && data.length === 1) {
              res.json({
                success: true,
                username: data[0].username,
                userid: data[0].id,
              });
              return true;
            } else {
              res.json({
                success: false,
                msg: "An error occured..",
              });
              return;
            }
          }
        );
      } else {
        res.json({
          success: false,
          msg: "An error occured..",
        });
        return;
      }
    });
  }

  login(app, db) {
    app.post("/login", (req, res) => {
      let username = req.body.username;
      let password = req.body.password;
      username = username.toLowerCase();

      let cols = [username];
      db.query(
        "SELECT * FROM users where username = ? LIMIT 1",
        cols,
        (err, data, fields) => {
          if (err) {
            res.json({
              success: false,
              msg: "An error occured..",
            });
            return;
          }
          if (data && data.length === 1) {
            bcrypt.compare(password, data[0].password, (bcryptErr, verfied) => {
              if (verfied) {
                req.session.userID = data[0].id;
                res.json({
                  success: true,
                  username: data[0].username,
                  userid: data[0].id,
                });
                return;
              } else {
                res.json({
                  success: false,
                  msg: "Invalid password",
                });
                return;
              }
            });
          } else {
            res.json({
              success: false,
              msg: "User not found",
            });
          }
        }
      );
    });
  }

  getCandidates(app, db) {
    app.get("/candidate/all", (req, res) => {
      console.log(contract.methods);

      console.log("Loading Candidates from Contract");
      contract.methods
        .getCandidates()
        .call(transConfig)
        .then((result) => {
          console.log("Candidate Loaded!!Sending");
          let candidates = [];
          for (let r of result) {
            if (r[columns[0]] != "0") {
              candidates.push({
                id: r[columns[0]],
                first_name: r[columns[1]],
                last_name: r[columns[2]],
                dob: r[columns[3]],
                candidate_info: r[columns[4]],
                candidate_short_desc: r[columns[5]],
                candidate_long_desc: r[columns[6]],
                candidate_awards: r[columns[7]],
              });
            }
          }
          res.json({
            success: true,
            msg: "Candidates Info Loaded",
            data: candidates,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            success: false,
            msg: "An error occured..",
          });
        });
    });
  }

  getCandidateImage(app, db) {
    app.get("/candidate/image/:name", (req, res) => {
      console.log("Calling Image Api");
      if (_.isEmpty(req.params.name)) {
        res.status(500).json({
          success: false,
          msg: "Missing Candidate Name",
        });
      } else {
        console.log("Downloading Image for " + req.params.name);
        const fileName = imageDir + req.params.name + ".jpg";
        fs.readFile(fileName, (err, items) => {
          if (err) {
            throw new Error(err);
            res.status(500).json({
              success: false,
              msg: err,
            });
          } else {
            res.json({
              image: items,
              success: true,
              msg: "Candidates Image Loaded",
            });
          }
        });
      }
    });
  }

  castVote(app, db) {
    app.post("/vote", (req, res) => {
      const candidate = parseInt(req.body.candidate);
      const voter = parseInt(req.body.voter);
      console.log("Candidate" + candidate);
      console.log("Voter" + voter);
      if (candidate < 0 || voter < 0) {
        res.status(500).json({
          success: false,
          msg: "Missing or Invalid Candidate or Voter Info!!!Cannot vote",
        });
      } else {
        contract.methods
          .vote(candidate, voter)
          .send(transConfig)
          .then((f) => {
            console.log(f);
            res.json({
              success: true,
              msg: "Voter " + voter + " successfully casted vote",
            });
          })
          .catch((e) => {
            console.log(e.message);
            res.status(500).json({
              success: false,
              msg: "Voter already voted",
            });
          });
      }
    });
  }

  getElectionResult(app, db) {
    app.get("/result/:date", (req, res) => {
      const date = new Date(req.params.date);
      const resultDate = new Date("2020-04-10");
      console.log("Loading Election Result");
      if (date <= resultDate) {
        res.status(500).json({
          msg: "Voting counting is in progress!!We will update you soon",
        });
      } else {
        contract.methods
          .getElectionResult()
          .call(transConfig)
          .then((result) => {
            let elecResult = [];
            for (let r of result) {
              if (r[columns[0]] != "0") {
                elecResult.push({
                  id: r[columns[0]],
                  first_name: r[columns[1]],
                  last_name: r[columns[2]],
                  voteCount: r[columns[8]],
                });
              }
            }
            res.json({
              success: false,
              elecResult: elecResult,
            });
          })
          .catch((e) => {
            console.log(e.message);
            res.status(500).json({
              success: false,
              msg: e.message,
            });
          });
      }
    });
  }

  registerVoter(app, db) {
    app.post("/register", (req, res) => {
      const id = random(1, 1000);
      var obj = fs.readFileSync("./MOCK_DATA.json", "utf8");
      var encrypted = Web3.utils.sha3(obj);
      
      console.log(encrypted);
      register.methods
        .register(id, encrypted)
        .send(transConfig)
        .then((f) => {
          console.log(f);
          res.json({
            hash:encrypted,
            id: id,
            success: true,
            msg: "Voter " + id + " successfully registered",
          });
        })
        .catch((e) => {
          console.log(e.message);
          res.status(500).json({
            success: false,
            msg: e.message,
          });
        });
        
    });
  }
}

module.exports = Router;
