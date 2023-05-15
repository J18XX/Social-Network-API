const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            unique: true,
            required: true,
            match:[
                /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
                "Please put a valid email address",
            ],
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thoughts",
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },

    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtuals("friendCount").get(
    function(){
        return this.friends.length;
    }
);

const User = model('User', userSchema);

module.exports = User;