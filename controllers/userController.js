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
                    return;
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

    // update user based on id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((updatedUser) => {
                if (!updatedUser) {
                    res.status(404).json({ message: 'User with provided Id does not exist!'})
                    return;
                }
                res.json(updatedUser)
            })
            .catch((err) => res.status(500).json(err));
    },
    // delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'User with provided Id does not exist!' })
                    return;
                }
                res.status(200).json({ message: `User with id: ${req.params.userId} has been deleted!` })
            })
            .catch((err) => res.status(500).json(err));

    },
    // add friend to user's friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body }},
            { runValidators: true, new: true}
        )
            .then((friend) => {
                if (!friend) {
                    res.status(400).json({ message: 'User with provided Id does not exist!' })
                    return;
                }
                res.status(201).json(friend)
            })
            .catch((err) => res.status(500).json(err));
    },

    // remove a friend from user's friend list
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            // $pull removes from an existing array all instances of a value
            { $pull: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
        .then((friend) => {
            if (!friend) {
                res.status(400).json({ message: 'User with provided Id does not exist!' })
                return;
            }
            res.status(200).json(friend)
        })
        .catch((err) => res.status(500).json(err));
    }
};