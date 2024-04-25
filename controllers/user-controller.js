const { selectProjectsByUserID } = require("../models/user-model");

exports.getProjectsByUserID = (request, response, next) => {
  const { user_id } = request.params;
  selectProjectsByUserID(user_id)
    .then((projects) => {
      response.status(200).send({ projects });
    })
    .catch((err) => {
      next(err);
    });
};
