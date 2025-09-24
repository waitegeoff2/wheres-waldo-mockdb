const prisma = require('./prisma');

async function getUrls() {
    //add to find by id
    try {
        const photoUrls = await prisma.photo.findMany({
            select: {
                id: true,
                url: true,
            }
        })
        return photoUrls;
    } catch(error) {
        console.error("Couldn't find photo details: ", error);
    }
}

async function getPhotoDetails(photoId) {
    //add to find by id
    try {
        const photoIdentity = parseInt(photoId)
        const photoDetails = await prisma.photo.findFirst({
            where: {
                id: photoIdentity,
            },
            include: {
                character: true,
            }
        })
        return photoDetails;
    } catch(error) {
        console.error("Couldn't find photo details: ", error);
    }
}

async function getTopScores(photoId){
    try {
        const photoIdentity = parseInt(photoId)
        const scores = await prisma.highscore.findMany({
            where: {
                photoId: photoIdentity,
            },
            orderBy: {
                score: 'asc' //smallest (best) score would come first, then you take 10
            },
            take: 10,
        })
        return scores;
    } catch(error) {
        console.error("Couldn't find score details: ", error);
    }
}

async function getAllScores(photoId){
    try {
        const photoIdentity = parseInt(photoId)
        const scores = await prisma.highscore.findMany({
            where: {
                photoId: photoIdentity,
            },
            orderBy: {
                score: 'asc' 
            },
        })
        return scores;
    } catch(error) {
        console.error("Couldn't find score details: ", error);
    }
}

async function addScore(name, score, photoId){
    try {
        await prisma.highscore.create({
            data: {
                name: name,
                score: score,
                photoId: photoId,
            }
        })
    } catch(error) {
        console.error("Couldn't find score details: ", error);
    }
}

module.exports = {
    getUrls,
    getPhotoDetails,
    getTopScores,
    getAllScores,
    addScore
}