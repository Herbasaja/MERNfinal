import Customer from '../models/customer.js'
import createError from '../utils/createError.js';

export const createCustomer = async (req, res, next) => {
    try {
        const newCustomer = new Customer({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            user: req.user.id
        });
        const savedCustomer = await newCustomer.save();
        return res.status(201).json(savedCustomer);
    } catch (error) {
        return next(error);
    }
};

export const getAllCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find({});
        return res.status(200).json(customers);
    } catch (error) {
        return next(error);
    }
};

export const getCurrentUserCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find({user: req.user.id})
        return res.status(200).json(customers)
    } catch (error) {
        return next(error);
    }

};

export const updateCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.params.customerId).exec();
        if(!customer) return next(createError({status: 404, message: "Customer not found"}));
        if(customer.user.toString() !== req.user.id) return next(createError({status: 401, message: "Unauthorized"}));

        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.customerId, {name: req.body.name,
            email: req.body.email,
            age: req.body.age}, {new: true});

        return res.status(200).json(updatedCustomer)
    } catch (error) {
        return next(error)
    }
};

export const deleteCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.params.customerId).exec();
        if(!customer) return next(createError({status: 404, message: "Customer not found"}));
        if(customer.user.toString() !== req.user.id) return next(createError({status: 401, message: "Unauthorized"}));

        await Customer.findByIdAndDelete(req.params.customerId);
        return res.status(200).json('Customer removed');
    } catch (error) {
        return next(error);
    }
}