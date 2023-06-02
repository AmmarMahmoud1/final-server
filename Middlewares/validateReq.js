const { body } = require("express-validator");

const checkErrors = (req, res, next) => {
  const errors = validationResult(req);
  const errorList = errors.array().map((err) => err.msg);
  return errors.isEmpty() ? next() : next(errorList);
};

const checkAskPost = [
  body("input")
    .notEmpty()
    .withMessage("No input sent")
    .isString()
    .withMessage("Input must be a string."),
  checkErrors,
];

module.exports = { checkAskPost };
