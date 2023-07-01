// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectMongoDB } from "@/libs/mongoConnect";
// import Task from "@/models/TaskModel";
import Article from "@/models/ArticleModel";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      await connectMongoDB();
      const article = await Article.deleteOne(req?.query);
      res.status(200).send(article);
    } catch (err) {
      // console.log(err);
      res.status(500).send({ err: err });
    }
  }
  if (req.method === "GET") {
    try {
      await connectMongoDB();
      let article = await Article.findOne(req?.query);

      article = await Article.findOneAndUpdate(
        req?.query,
        {
          viewsCount: article?.viewsCount ? article?.viewsCount + 1 : 1,
        },
        {
          new: true,
        }
      );

      res.status(200).send(article);
    } catch (err) {
      // console.log(err);
      res.status(500).send({ err: err });
    }
  }
}
