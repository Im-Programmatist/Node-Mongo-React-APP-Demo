import { create as _create } from '../services/registration.service.js';

async function create(req, res, next) {
    //Checking middleware
    //console.log("controller ",req.body);
    //console.log("request time is : ",req.requestTime);
    try {
        const result = await _create(req.body);
        res.status(200).render("index");
    } catch (err) {
        console.error(`Error while creating user(controller)`, err.message);
        next(err);
    }
}

export default {
    create
};
