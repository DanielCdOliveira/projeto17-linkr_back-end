import connection from "../config/db.js"

async function createHashtag(hashtags) {
    console.log(hashtags)
    try {
        for(let hashtag of hashtags){
            let verification = await connection.query(`
                    SELECT 
                        * 
                    FROM 
                        hashtags 
                    WHERE 
                        "name" = ($1)
                `, [hashtag])
                console.log("select")
                console.log(verification)
            if(verification.rowCount > 0){
                console.log("update")
                await connection.query(`
                    UPDATE 
                        hashtags
                    SET 
                        ranking = (ranking + 1)
                    WHERE 
                        name = ($1)
                `, [hashtag])

            } else {
                console.log("insert")
                await connection.query(`
                    INSERT INTO  
                        hashtags (name)
                    VALUES 
                        ($1)
                `, [hashtag])
            }
        }
    } catch {
        res.status(500).send(err)
    }
    return 
}


export default createHashtag