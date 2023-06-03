import Joi from 'joi';
import { objectId } from './custom.validation.js';

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

export default {
  deleteUser,
};
