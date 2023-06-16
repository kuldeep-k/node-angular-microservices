const userModel = require("../models/UserModel");
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = process.env.TOKEN_SECRET || "ABCDEFGH";
const algo = process.env.TOKEN_ALGO ?  process.env.TOKEN_ALGO : "HS256";

class AuthService {
    async signUp(signupData) {
        let exUser = await userModel.findOne({username: signupData.username});
        if(exUser) {
            throw new Error("User already exists");
        }
        let userData = await userModel.create({
            username: signupData.username,
            password: signupData.password
        });
        userData = userData.toObject();
        delete userData.password;
        return userData;
    }

    async signIn(signinData) {
        let exUser = await userModel.findOne({username: signinData.username});
        if(!exUser) {
            let error = new Error("Invalid User");
            error.code = 401;
            throw error;
        }

        if(await bcrypt.compare(signinData.password, exUser.password)) {
            console.log([secret,  algo])
            exUser = exUser.toObject();
            delete exUser.password;
            let token = await jwt.sign({
                id: exUser._id,
                username: exUser.username,
                role: "USER",
                exp: Math.floor(Date.now() / 1000) + (60*60*3)
            }, secret, {algorithm: algo});
            return {token, userData: exUser };
        } else {
            let error = new Error("Invalid Credentials");
            error.code = 401;
            throw error;
        }
    }

    async getProfile(auth) {
        let userData = await userModel.findById(auth.id);
        if(!userData) {
            let error = new Error("Invalid User");
            error.code = 401;
            throw error;
        }
        userData = userData.toObject();
        delete userData.password;
        return userData;
    }

    async updateProfile(auth, update_data) {
        let userData = await userModel.findById(auth.id);
        if(!userData) {
            let error = new Error("Invalid User");
            error.code = 401;
            throw error;
        }
        console.log("11");
        const updateObject = {
            first_name:  update_data.first_name,
            last_name:  update_data.last_name,
            gender:  update_data.gender,
            dob:  update_data.dob,
            preferences: update_data.preferences
        }
        console.log("22");
        
        await userModel.findOneAndUpdate({_id: auth.id}, {$set: updateObject});
        console.log("33");
        let userData1 = await userModel.findById(auth.id);
        userData1 = userData1.toObject();
        delete userData1.password;
        return userData1;
    }

    async changePassword(auth, update_data) {
        let userData = await userModel.findById(auth.id);
        if(!userData) {
            let error = new Error("Invalid User");
            error.code = 401;
            throw error;
        }

        if(update_data.password != update_data.confirm_password) {
            throw new Error("Password/Confirm Password not same");
        }

        if(! await bcrypt.compare(update_data.current_password, userData.password)) {
            throw new Error("Current Password not correct");
        }

        updateObject = {
            password:  update_data.password
        }

        userData.password = update_data.password;
        await userData.save();
        
        let userData1 = await userModel.findById(auth.id);
        userData1 = userData1.toObject();
        delete userData1.password;
        return userData1;
    }


    async updateProfileImage(auth, filesToSave) {
        let userData = await userModel.findById(auth.id);
        if(!userData) {
            let error = new Error("Invalid User");
            error.code = 401;
            throw error;
        }
        console.log(filesToSave);

        const dirPath = "public/profile";
        if(filesToSave && filesToSave.profileImage) {
            try {
                console.log("In 1");
                if(!fs.existsSync(dirPath)) {
                    fs.mkdirSync(dirPath);
                }
                console.log("In 2");
                let fileNameToSave = +(new Date) + "-" + filesToSave.profileImage.name;
                await filesToSave.profileImage.mv(dirPath + "/" + fileNameToSave);
                console.log("In 3");
                let fileObj = {
                    name: filesToSave.profileImage.name,
                    size: filesToSave.profileImage.size,
                    path: "profile/" + fileNameToSave,
                    mime: filesToSave.profileImage.mimetype,
                    default: true
                } 
                console.log("In 4 ");
                console.log(fileObj);
                
                let saveData = { profile_picture: "profile/" + fileNameToSave };
                console.log("In 5 ");
                console.log(saveData);
                await userModel.findOneAndUpdate({_id: auth.id}, {$set: saveData});
            } catch (e) {
                console.log("ERRRO " + e.message);
                console.log(e);
            }
            
        }

        let userData1 = await userModel.findById(auth.id);
        userData1 = userData1.toObject();
        delete userData1.password;
        return userData1;
    }
}

module.exports = new AuthService;