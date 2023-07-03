// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectMongoDB } from "@/libs/mongoConnect";
import JournalDatas from "@/models/JournalDataModel";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      await connectMongoDB();
      const data = await JournalDatas.deleteOne(req?.query);
      res.status(200).send(data);
    } catch (err) {
      // console.log(err);
      res.status(500).send({ err: err });
    }
  }
  if (req.method === "POST") {
    try {
      await connectMongoDB();
      let newData = await JournalDatas.create(req.body);
      res.status(201).send(newData);
    } catch (err) {
      console.log(err);
      res.status(500).send({ err: err });
    }
  }
  if (req.method === "GET") {
    try {
      await connectMongoDB();
      let data = await JournalDatas.find(req.query);
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send({ err: err });
    }
  }
}
