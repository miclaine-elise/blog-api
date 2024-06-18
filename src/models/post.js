
const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    summary: { type: String },
    isPublished: { type: Boolean, default: false },
},
    { timestamps: true }
);

// Virtual for book's URL
PostSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/posts/${this._id}`;
});
PostSchema.virtual("date").get(function () {
    return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

// Export model
module.exports = mongoose.model("Post", PostSchema);
