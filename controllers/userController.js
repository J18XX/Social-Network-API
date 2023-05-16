const { users, thoughts } = require("../models");

module.exports = {
    getUser(req, res) {
        users.find({})
            .then((user) => res.json(user))
            .catch((user) => res.json(500).json(err));
    },

    getSingleUser(req, res) {
        users.findOne({ _id: req.params.userId })
            .populate("thoughts")
            .populate("friends")
            .select("-__v")
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "Not found with this ID"})
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        users.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    updateUser(req, res) {
        users.findOneAndUpdate(
            { _id: req.parasm.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: "Not found with this ID"})
                    : res.json(user))
            .catch((err) => res.status(500).json(err))
    },

    deleteUser(req, res) {
        users.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "Not found with this ID"})
                    : thoughts.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: "User and Thought Deleted"})
            .catch((err) => res.status(500).json(err)));
    },

    addFriend(req, res) {
        users.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendsId }},
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "Not found with this ID"}) 
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        users.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { new: true }
        )
            .then(
                (user) =>
                    !user
                        ? res.status(404).json({ message: "Not found with this ID"}) 
                        : res.json(user)
                )
                .catch((err) => res.status(500).json(err));
    },
};