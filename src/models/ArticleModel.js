import { Schema, model, models } from "mongoose";

const imageSchema = new Schema({
  src: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: false,
  },
});

const bannerImageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
});

const articleSchema = new Schema(
  {
    // article: {
    title: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // --------------

    bannerImage: {
      type: bannerImageSchema,
      required: true,
    },

    images: {
      type: [imageSchema],
      required: false,
    },
    // ----------------
    youtubeLink: {
      type: String,
      required: false,
    },
    instagramLink: {
      type: String,
      required: false,
    },
    tags: {
      type: [String],
      required: false,
    },
    viewsCount: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Article = models.Article || model("Article", articleSchema);

export default Article;
