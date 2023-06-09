import Joi from 'joi';
import { objectId } from './custom.validation.js';

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    budget: Joi.number().required(),
    spending: Joi.number().required(),
    date_start: Joi.date().required(),
    team_size: Joi.number().required(),
  }).unknown(true)
}

const getDetail = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }).unknown(true)
};

const deleteEmploy = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  })
};

const getDetailEmploy = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  })
};

const update = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    team_size: Joi.number(),
  }).unknown(true)
};

const getLists = {
  params: Joi.object().keys({
    page: Joi.string(),
  }).unknown(true)
};


export default {
  create,
  update,
  getLists,
  getDetail,
  deleteEmploy,
  getDetailEmploy
}
