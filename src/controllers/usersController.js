import usersRepository from "../repositories/usersRepository.js";

export async function getUser(req,res){
    const {name, followedId} = req.query
    const followerId = res.locals.userId;

    try{
        const following = await usersRepository.getUserFollow(followerId,followedId); 
        const users = await usersRepository.findUser(name, followerId, followedId);
        res.status(200).send({user:users.rows,following:following.rowCount});
    }
    catch(err){
        res.status(500).send(err);
    }
}

export async function follow(req,res){
    const followerId = res.locals.userId
    const {followedId} = req.params

    if (Number(followerId) < 1 || Number(followedId) < 1) {
        return res.sendStatus(404)
    }
    if (Number(followerId) === Number(followedId)){
        return res.status(409).send("Can't follow yourself")
    }
      try {
        const result = await usersRepository.follow(followerId, followedId);
        if(result.command !== 'INSERT'){
            return res.sendStatus(409)
        }
        res.sendStatus(201);
      } catch (err) {
        return res.send(err);
      }

}

export async function unfollow(req,res){
    const followerId = res.locals.userId;
    const { followedId } = req.params;

    if (Number(followerId) < 1 || Number(followedId) < 1) {
      return res.sendStatus(404);
    }
    if (Number(followerId) === Number(followedId)) {
      return res.status(409).send("Can't unfollow yourself");
    }
    try{
        const result = await usersRepository.unfollow(followerId,followedId)
        if (result.command !== "DELETE") {
          return res.sendStatus(409);
        }
        res.sendStatus(204)
    }catch(err){
      res.send(err)
    }
}

export async function getUserFollowed(req, res) {
  try {
      const userFollowed = await usersRepository.getUserFollowed();
      res.status(200).send(userFollowed.rows)
  } catch (e) {
      return res.status(422).send("Unable to get the re-post name!")
  }
}