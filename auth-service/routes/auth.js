var express = require('express');
var router = express.Router();
var AuthService = require('../services/auth-service');
var { expressjwt: jwt } = require("express-jwt");
const secret = process.env.TOKEN_SECRET || "ABCDEFGH";
const algo = process.env.TOKEN_ALGO ?  [process.env.TOKEN_ALGO] : ["HS256"];
router.post('/signup', async (req, res, next) => {
    try {
        const body = req.body;
        const signupData = await AuthService.signUp(req.body);
        return res.status(200).json(signupData);
    } catch (error) {
        return res.status(400).json({error: error.message});
        // next(error);
    }
    
});

router.post('/signin', async (req, res, next) => {
    try {
        const body = req.body;
        const signinData = await AuthService.signIn(req.body);
        return res.status(200).json(signinData);
    } catch (error) {
        if(error.code == 401) {
            return res.status(401).json({error: error.message});
        }
        // console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
        
        next(error);
    }
    
});

router.get('/profile', jwt({ secret: secret, algorithms: algo }), async (req, res, next) => {
    try {
        console.log("req.auth ", req.auth);
        const profileData = await AuthService.getProfile(req.auth);
        return res.status(200).json(profileData);
    } catch (error) {
        if(error.code == 401) {
            return res.status(401).json({error: error.message});
        }
        // console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
        
        next(error);
    }
    
});
router.patch('/profile', jwt({ secret: secret, algorithms: algo }), async (req, res, next) => {
    try {
        console.log("req.auth ", req.auth);
        const profileData = await AuthService.updateProfile(req.auth, req.body);
        return res.status(200).json(profileData);
    } catch (error) {
        if(error.code == 401) {
            return res.status(401).json({error: error.message});
        }
        // console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
        
        next(error);
    }
    
});

router.patch('/change-password', jwt({ secret: secret, algorithms: algo }), async (req, res, next) => {
    try {
        console.log("req.auth ", req.auth);
        const profileData = await AuthService.changePassword(req.auth, req.body);
        return res.status(200).json(profileData);
    } catch (error) {
        if(error.code == 401) {
            return res.status(401).json({error: error.message});
        }
        // console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
        
        next(error);
    }
    
});

router.put('/profile-image', jwt({ secret: secret, algorithms: algo }), async (req, res, next) => {
    try {
        console.log("req.auth ", req.auth);
        const profileData = await AuthService.updateProfileImage(req.auth, req.files);
        return res.status(200).json(profileData);
    } catch (error) {
        if(error.code == 401) {
            return res.status(401).json({error: error.message});
        }
        // console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
        
        next(error);
    }
    
});

module.exports = router;
