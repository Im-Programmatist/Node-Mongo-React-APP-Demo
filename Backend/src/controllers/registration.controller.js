import { create as _create } from '../services/registration.service.js';

async function create(req, res, next) {
    //Checking middleware
    //console.log("controller ",req.body);
    //console.log("request time is : ",req.requestTime);
    try {
        const result = await _create(req.body,res);
        if(result.status>200){
            return res.render("registration",{flashMessage:{"message":result.error,isFlash:ture}});
        }else{
            let fullName = `${result.result.fname} ${result.result.lname}`;
            res.cookie('fullName',fullName,{
                expires:new Date(Date.now() + 300000),
                httpOnly:true
            });
            //res.status(200).render("index");
            res.status(200).redirect("/");
        }
    } catch (err) {
        console.error(`Error while creating user(controller)`, err.message);
        next(err);
    }
}

export default {
    create
};
