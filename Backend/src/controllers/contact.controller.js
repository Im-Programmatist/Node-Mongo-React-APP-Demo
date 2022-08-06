import { create as _create } from '../services/contact.service.js';

async function create(req, res, next) {
    //Checking middleware
    //console.log("request time is : ",req.requestTime);
    try {
        const result = await _create(req.body);
        if(result.status>200){
            return res.render("contact",{flashMessage:{"message":result.error,isFlash:true}});
        }else{
            //res.status(200).render("index");
            res.status(200).render("contact",{flashMessage:{"message":"Contact form submitted successfully!",isFlash:true}});
        }
    } catch (err) {
        console.error(`Error while submitting contact form - `, err.message);
        next(err);
    }
}

export default {
    create
};
