const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router();

const userService = require('./user.service');
const { id, user } = require('../../utils/validation/schemas');
const {
  validator,
  userIdValidator
} = require('../../utils/validation/validator');
const multiData = require('../../utils/multiData');
const saveImage = require('../../utils/saveImage');

router.post('/', multiData(), validator(user, 'body'), async (req, res) => {
  const profileImg = saveImage(
    req.files,
    req.body.email.slice(0, req.body.email.lastIndexOf('.')),
    'users/',
    'profileImg'
  );
  const userEntity = await userService.save({
    ...req.body,
    profileImg
  });
  res.status(OK).send(userEntity.toResponse());
});

router.get(
  '/:id',
  userIdValidator,
  validator(id, 'params'),
  async (req, res) => {
    const userEntity = await userService.get(req.params.id);
    res.status(OK).send(userEntity.toResponse());
  }
);

router.put(
  '/:id',
  userIdValidator,
  validator(id, 'params'),
  validator(user, 'body'),
  async (req, res) => {
    const userEntity = await userService.update(req.userId, req.body);
    res.status(OK).send(userEntity.toResponse());
  }
);

router.delete(
  '/:id',
  userIdValidator,
  validator(id, 'params'),
  async (req, res) => {
    await userService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  }
);

module.exports = router;
