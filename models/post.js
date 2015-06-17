var mongoose = require("mongoose");
var Comment = require("./comment");

var postSchema = new mongoose.Schema({
	title: String,
	media: String,
	date: String,
	// user: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "User"
	// }
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}]
});

//The following code deletes all comments when deleting a post
commentSchema.pre('remove', function(next) {
    Comment.remove({post: this._id}).exec();
    next();
});

var Post = mongoose.model("Post", postSchema);
module.exports = Post;