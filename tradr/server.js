/*
       Copyright 2018 IBM Corp All Rights Reserved

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var session = require('express-session')

//var tokenGen = require('./jwt/token')

//var passport = require('passport');

//console.log(process.env);
// var client_id = process.env.OIDC_ID;
// var client_secret = process.env.OIDC_SECRET;
// var authorization_url = process.env.OIDC_AUTH;
// var token_url = process.env.OIDC_TOKEN;
// var issuer_id = process.env.OIDC_ISSUER;

//TODO this needs to become a kube environment variable or secret
//var callback_url = 'https://'+process.env.PROXY_HOST+'/tradr/auth/sso/callback';

// var OpenIDConnectStrategy = require('passport-idaas-openidconnect').IDaaSOIDCStrategy;
// var Strategy = new OpenIDConnectStrategy({
//         authorizationURL: authorization_url,
//         tokenURL: token_url,
//         clientID: client_id,
//         scope: 'email',
//         response_type: 'code',
//         clientSecret: client_secret,
//         callbackURL: callback_url,
//         skipUserProfile: true,
//         issuer: issuer_id,
//         addCACert: true,
//         CACertPathList: ['/certs/blueid-root.crt', '/certs/blueid-intermediate.crt', '/certs/blueid-server.crt', '/certs/prepiam.toronto.ca.ibm.com.pem', '/certs/idaas.iam.ibm.com.pem', '/certs/digicert.crt', '/certs/idaas-digicert.crt', '/certs/digicert-root.pem', '/certs/digicert-subca.pem', '/certs/idaas_iam_ibm_com.crt', '/certs/IBMid-server.crt', '/certs/prepiam_toronto_ca_ibm_com.crt']
//     },
//     function (iss, sub, profile, accessToken, refreshToken, params, done) {
//         process.nextTick(function () {
//             profile.accessToken = accessToken;
//             profile.refreshToken = refreshToken;
//             done(null, profile);
//         });
//     })

// passport.use(Strategy);

var app = express();

// view engine setup
app.set('view engine', 'jade')
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({resave: 'true', saveUninitialized: 'true' , secret: 'keyboard cat', maxAge: 3600000}));
//app.use(passport.initialize());
//app.use(passport.session());

// app.get('/tradr/auth/sso/callback', function (req, res, next) {
//     var redirect_url = req.session.originalUrl;
//     // var redirect_url = '/#/';
//     console.log(req.session);
//     //console.log(req.session.passport.user.accessToken);
//     passport.authenticate('openidconnect', {
//         successRedirect: redirect_url,
//         failureRedirect: '/failure',
//     })(req, res, next);
// });

// app.get('/tradr/failure', function (req, res) {
//     console.log('login failed');
//     // res.send('login failed');
// });

// app.get('/tradr/user', function (req, res) {
//     console.log(">>>>>");
//     // res.send({token: tokenGen.generateAccessToken(req.session.passport.user._json), session: req.session.passport});
//     // //res.send(req.session.passport);
// });


//app.get('/tradr/login', passport.authenticate('openidconnect', {}));
app.use('/tradr', ensureAuthenticated, express.static(path.join(__dirname, 'dist')));

// Allow CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/***************************************************************/

// Authentication


function ensureAuthenticated(req, res, next) {
    // console.log(req.session);
    // if (!req.isAuthenticated()) {
    //     console.log('user not authenticated, logging in')
    //     req.session.originalUrl = req.originalUrl;
    //     res.redirect('/tradr/login');
    // } else {
    //     console.log("user is authenticated");
    //     return next();
    // }
    return next();
}

app.get('/tradr/hello', ensureAuthenticated, function (req, res) {
    console.log(req.session.passport.user.accessToken);
    res.send('Hello, ' + req.user['id'] + '!');
});

//passport.serializeUser((user, done) => done(null, user));
//passport.deserializeUser((obj, done) => done(null, obj));
// Done Authenticating
/***************************************************************/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log({
        message: err.message,
        error: {}
    });
});


module.exports = app;
