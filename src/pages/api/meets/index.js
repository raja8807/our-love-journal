import meets from "../../../test-data/meets";

export default async function handler(req, res) {
    res.status(200).send(meets);
    // console.log(req.url);
}
