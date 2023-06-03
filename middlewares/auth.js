import jwt from 'jsonwebtoken';

import response from '../helpers/response.js'

const { verify } = jwt;

const middlewaresAuthor = {
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      const accessToken = token.split(" ")[1];
      verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) response.error(res, 'Token is not valid', 403);
        req.user = user;
        next();
      });
    } else {
      return response.error(res, 'Unauthorized', 401)
    }
  },
  verifyAdmin: (req, res, next) => {
    if (req.user.user.role === 2) {
      next();
    } else {
      return response.error(res, 'Forbiden', 403)
    }
  },
};

export default middlewaresAuthor;
