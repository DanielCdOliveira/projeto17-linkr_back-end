import connection from "../config/db.js"

async function verificateHashtag(hashtag) {
    try{
    let verification = connection.query(`
        SELECT 
            * 
        FROM 
            hashtags 
        WHERE 
            "name" = ($1)
    `, [hashtag])
    }
    catch (err){
        console.log(err)
    }
}

async function updateHashtag(hashtag) {
    return connection.query(`
        UPDATE 
            hashtags
        SET 
            ranking = (ranking + 1)
        WHERE 
            name = ($1)
    `, [hashtag])
}

async function insertHashtag(hashtag) {
    return connection.query(`
        INSERT INTO  
            hashtags (name)
        VALUES 
            ($1)
    `, [hashtag]) 
}

const hashtagsRepository = {
    verificateHashtag,
    updateHashtag,
    insertHashtag
}

export default hashtagsRepository