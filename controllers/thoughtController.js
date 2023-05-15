const { Users, Thoughts } = require("../models");

module.exports = {
    getUser(req, res) {
        Users.find({})
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        Users.findOne({ _id: req.params.userID })
            .populate("thoughts")
            .populate("friends")
            .select("-__v")
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "Not Found with this ID!"})
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        Users.create(req.body)
            .then((user) => res.json(user)
            .catch((err) => {
                console.log(err);
                return res.status((500).json(err));
            }));
    },

    updateUser(req, res) {
        Users.findOneUpdate(
            { _id: req.params.userID },
            { $set: req.body },
            { runValidators: true, new: true}
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "Not Found with this ID!"})
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        Users.findOneUpdate(
            { _id: req.params.userID },
            { $set: req.body },
            { runValidators: true, new: true}
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "Not Found with this ID!"})
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        Users.findOneUpdate(
            { _id: req.params.userID },
            { $set: req.body },
            { runValidators: true, new: true}
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "Not Found with this ID!"})
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
};