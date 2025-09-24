//This is a full stack app that works by fetching from a NodeJS Express backend
//however, so I don't have to pay for a Render db, am adding a mock database here so the app is functional

//CLONE ENTIRE FRONTEND AND THEN ALTER CODE
//get rid of high score data??

//start screen imagedata
export const imageData = [
    {
        id: 2,
        url: "/src/assets/waldo-1-town.jpeg",
        character: [{character: 'waldo', xCoord: 100,}, {}],
    },
    {
        id: 3,
        url: "/src/assets/waldo-2-beach.jpg",
        character: [],
    },
    {
        id: 4,
        url: '/src/assets/waldo-3-convention.jpeg',
        character: [],
    }
]

//photo screen objects
//if statement, check photo screen above useeffect
//TOWN
export const townData = {
    id: 2,
    url: '/src/assets/waldo-1-town.jpeg',
    character: [{id: 3, character: 'Waldo', xCoord: 414, yCoord: 479, photoId: 2}, {id: 4, character: 'Wizard', xCoord: 638, yCoord: 484, photoId: 2}, {id: 5, character: 'Wanda', xCoord: 420, yCoord: 387, photoId: 2}, {id: 6, character: 'Odlaw', xCoord: 566, yCoord: 597, photoId: 2}]
}
//BEACH
export const beachData = {
    id: 3,
    url: '/src/assets/waldo-2-beach.jpg',
    character: [{id: 7, character: 'Waldo', xCoord: 594, yCoord: 246, photoId: 3}, {id: 8, character: 'Wizard', xCoord: 262, yCoord: 228, photoId: 3}, {id: 9, character: 'Odlaw', xCoord: 102, yCoord: 232, photoId: 3}]
}

//CONVENTION
export const conventionData = {
    id: 4,
    url: '/src/assets/waldo-3-convention.jpeg',
    character: [{id: 10, character: 'Waldo', xCoord: 405, yCoord: 135, photoId: 4}, {id: 11, character: 'Wizard', xCoord: 661, yCoord: 49, photoId: 4}, {id: 12, character: 'Wanda', xCoord: 287, yCoord: 467, photoId: 4}, {id: 13, character: 'Odlaw', xCoord: 189, yCoord: 463, photoId: 4}]
}

//high scores
//map this on highscore page

export const townHighScores = [
    {
        name: 'geoff',
        username: 'geoff',
        score: 50,
    }
]

export const beachHighScores = [
    {
        name: 'geoff',
        username: 'geoff',
        score: 50,
    }
]

export const conventionHighScores = [
    {
        name: 'geoff',
        username: 'geoff',
        score: 50,
    }
]

//use to add new values (instead of post request)
export function addScore(playerName, uName, highScore) {
    const newData = { name: playerName, username: uName, score: highScore }
    highScoreData.push(newData)
}

