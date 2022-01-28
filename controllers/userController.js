const User = require('../models/User');

module.exports = {
    // finds all users
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },
    // find one user based on id 
    getOneUser(req, res) {
        User.findOne({_id: req.params.userId})
            .select('-__v')
            // .populate('thougts')
            // .populate('friends')
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'User with provided Id does not exist!'})
                }
                res.json(user)
            })
            .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
          .then((newUser) => res.json(newUser))
          .catch((err) => res.status(500).json(err));
      },

}