import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  bio: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  contact: {
    email: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  skills: [
    {
      type: String,
      default: [],
    },
  ],
  projects: [
    {
      name: {
        type: String,
      },
      description: {
        type: String,
      },
      techStack: [
        {
          type: String,
        },
      ],
      githubLink: {
        type: String,
      },
      liveDemo: {
        type: String,
      },
    },
  ],
  experience: [
    {
      company: {
        type: String,
      },
      role: {
        type: String,
      },
      duration: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
});

const Porfolio = mongoose.model("Portfolio", portfolioSchema);
export default Porfolio;
