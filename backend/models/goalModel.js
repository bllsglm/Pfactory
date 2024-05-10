import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    image : {
      type : String,
      required : [true, 'Please add an image']
    },
    file: String,  
    tags: [{ type: String }],
}, {
  timestamps: true
});

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
