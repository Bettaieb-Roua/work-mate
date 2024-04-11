import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        due_date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        priority: {
            type: String,
            required: true
        },
        assigned_to: {
            type: String,
            required: true
        },
        files: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Override the _id field to be a number
taskSchema.set('autoIndex', false); // Disable automatic indexing to avoid the warning
taskSchema.add({
    _id: {
        type: Number,
        unique: true
    }
});

// Add a pre-save hook to generate sequential IDs
taskSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }

    try {
        const lastTask = await this.constructor.findOne({}, {}, { sort: { _id: -1 } });
        this._id = lastTask ? lastTask._id + 1 : 1;
        next();
    } catch (error) {
        next(error);
    }
});

export default mongoose.model('Task', taskSchema);
