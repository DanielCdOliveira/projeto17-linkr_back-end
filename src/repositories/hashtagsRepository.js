import connection from "../config/db.js"

async function verificateHashtag(hashtag) {
    let verification = connection.query(`
        SELECT 
            * 
        FROM 
            hashtags 
        WHERE 
            "name" = ($1)
    `, [hashtag])
    return verification
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

async function hashtagList() {
    return connection.query(`
        SELECT 
            *
        FROM 
            hashtags
        ORDER BY
            ranking DESC
        LIMIT 
            10
    `)
}

const hashtagsRepository = {
    verificateHashtag,
    updateHashtag,
    insertHashtag,
    hashtagList
}

export default hashtagsRepository