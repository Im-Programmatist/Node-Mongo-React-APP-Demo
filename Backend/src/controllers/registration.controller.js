import { create as _create } from '../services/registration.service.js';

async function create(req, res, next) {
    try {
        res.status(200).json(await _create(req.body));
    } catch (err) {
        console.error(`Error while creating user(controller)`, err.message);
        next(err);
    }
}

export default {
    create
};
