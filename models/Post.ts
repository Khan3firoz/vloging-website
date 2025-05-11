import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this post.'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    excerpt: {
        type: String,
        required: [true, 'Please provide an excerpt for this post.'],
        maxlength: [200, 'Excerpt cannot be more than 200 characters'],
    },
    content: {
        type: String,
        required: [true, 'Please provide content for this post.'],
    },
    category: {
        type: String,
        required: [true, 'Please provide a category for this post.'],
    },
    author: {
        type: String,
        required: [true, 'Please provide an author for this post.'],
    },
    image: {
        type: String,
        required: [true, 'Please provide an image URL for this post.'],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);