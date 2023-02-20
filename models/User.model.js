const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
    myCollection: [
      {type: Schema.Types.ObjectId,
        ref:'Cards'
    }],
    lastpack: {
      type: Date,
      default: Date.now
    },
    coins: Number,
    GOAT: {
      type: String,
      enum: ["Lebron James", "Michael Jordan"],
      required: true
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;