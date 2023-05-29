import Joi from 'joi';

import pick from '../utils/pick.js';
import response from '../helpers/response.js';

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { wrap: { label: false }, label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map(({ message }) => message).join(', ');
    return response.error(res, errorMessage);
  }
  Object.assign(req, value);
  return next();
};

export default validate;
