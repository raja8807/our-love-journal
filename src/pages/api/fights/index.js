import fights from "../../../test-data/fights";

export default async function handler(req, res) {
    res.status(200).send(fights);
    // console.log(req.url);
}
