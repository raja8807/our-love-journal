import { Schema, model, models } from "mongoose";

const journalSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [String],
  },
  {
    timestamps: true,
  }
);

const JournalDatas =
  models.JournalDatas || model("JournalDatas", journalSchema);

export default JournalDatas;
