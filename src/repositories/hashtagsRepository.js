import connection from "../config/db.js"

async function verificateHashtag(hashtag) {
    return connection.query(`
        SELECT 
            * 
        FROM 
            hashtags 
        WHERE 
            "name" = ($1)
    `, [hashtag])
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
        name, SUM(ranking) as ranking 
    FROM 
        hashtags
    GROUP BY
        name
    ORDER BY
        SUM(ranking) DESC
    LIMIT 
        10
    `)
}

async function deleteHashtag(id) {
    return connection.query(`
        DELETE FROM 
            hashtags
        WHERE
            id = ($1)
    `, [id])
}

async function updateRanking(hashtag) {
    return connection.query(`
        UPDATE 
            hashtags
        SET 
            ranking = (ranking - 1)
        WHERE 
            name = ($1)
        `, [hashtag])
}

const hashtagsRepository = {
    verificateHashtag,
    updateHashtag,
    insertHashtag,
    hashtagList,
    deleteHashtag,
    updateRanking
}

export default hashtagsRepository