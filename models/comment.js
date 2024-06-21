
const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    author: { type: String, required: true },
    text: { type: String, required: true },
    isAdmin: { type: Boolean, default: true },
},
    { timestamps: true }
);

CommentSchema.virtual("date").get(function () {
    return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

// Export model
module.exports = mongoose.model("Comment", CommentSchema);
