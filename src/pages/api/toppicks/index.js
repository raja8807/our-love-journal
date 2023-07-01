// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectMongoDB } from "@/libs/mongoConnect";
// import Task from "@/models/TaskModel";
import Article from "@/models/ArticleModel";

export default async function handler(req, res) {
  const categoryName = req.query.category;

  if (req.method === "GET") {
    try {
      let articles = [];
      await connectMongoDB();
        articles = await Article.find().sort({viewsCount:'desc'}).limit(10);
     
      res.status(200).send(articles);
    } catch (err) {
      res.status(500).send({ err: err });
    }
  }
}
