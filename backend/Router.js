const bcrypt = require('bcrypt');
class Router {
    constructor(app,db){
        this.login(app,db);
        this.isLoggedIn(app,db);
    }

    isLoggedIn(app,db)
    {
        app.post('/isLoggedIn', (req,res) => {
            if(req.session.userID){
                let cols = [req.session.userID];
                db.query('select * from users where id =? LIMIT 1', (err,data,fields) => {
                    if(data && data.length===1)
                    {
                        res.json({
                            success: true,
                            username: data[0].username
                        });
                       return true;
                    }
                    else{
                        res.json({
                            success: false,
                           msg: 'An error occured..'
                       });
                       return;
                    }
                });
            }
            else{
                res.json({
                    success: false,
                   msg: 'An error occured..'
               });
               return;
            }
        });
    }

    login(app,db)
    {
        app.post('/login', (req,res) => {
            let username = req.body.username;
            let password = req.body.password;
            username = username.toLowerCase();

            let cols= [username];
             db.query('SELECT * FROM users where username = ? LIMIT 1', cols, (err, data, fields)=> 
             {
                if(err)
                {
                    res.json({
                         success: false,
                        msg: 'An error occured..'
                    });
                    return;
                }
                if(data && data.length===1)
                {
                     bcrypt.compare(password, data[0].password, (bcryptErr, verfied) => {
                        if(verfied){
                            req.session.userID = data[0].id;
                            res.json({
                                success: true,
                                username: data[0].username
                            });
                            return;
                        }
                        else
                        {
                            res.json({
                                success: false,
                                msg: 'Invalid password'
                            });
                            return;
                        }
                    });
                }
                else{
                    res.json({
                        success: false,
                        msg: 'User not found'
                    });
                }
            });
        });
    }
}
module.exports = Router;
