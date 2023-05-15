const { Schema, model, Types } = require('mongoose');

const moment = require('monent');

// reaction schema
const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },

        reactionBody: {
            type: String,
            required: true,
            maxlength: 300
        },

        username: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
        },
    },

    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
)

// thoughts schema
const thoughtsSchema = new Schema (
    {
        thoughtsText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 300,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
        },

        username: {
            type: String,
            required: true,
        },

        reactions: [reactionSchema],
    },

    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

thoughtsSchema.virtuals('reactionCount').get(
    function(){
        return this.reactions.length;
    })

const Thoughts = model('Thoughts', thoughtsSchema);

model.exports = Thoughts;