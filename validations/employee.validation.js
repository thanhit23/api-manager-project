import Joi from 'joi';
import { objectId } from './custom.validation.js';

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    status: Joi.boolean().required(),
    area: Joi.string().required(),
  }).unknown(true),
};

const getDetail = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }).unknown(true),
};

const deleteEmploy = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const update = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    status: Joi.boolean().required(),
    area: Joi.string().required(),
  }).unknown(true),
};

const getLists = {
  params: Joi.object().keys({
    page: Joi.string(),
  }).unknown(true),
};

export default {
  update,
  create,
  getLists,
  getDetail,
  deleteEmploy,
};
