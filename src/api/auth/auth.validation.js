const { query } = require("express");
const yup = require("yup");

const registerValidate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
    });
    return next();
  } catch (error) {
    return res.status(400).json({ type: error.name, message: error.message });
  }
};

const loginValidate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
    });
    return next();
  } catch (error) {
    return res.status(400).json({ type: error.name, message: error.message });
  }
};

const refreshTokenValidate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
    });
    return next();
  } catch (error) {
    return res.status(400).json({ type: error.name, message: error.message });
  }
};

module.exports = {
  loginValidate,
  registerValidate,
  refreshTokenValidate,
};
