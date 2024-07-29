const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY052U3pmcHZPamdmVmxMcXBySVVSOGZNM08xWnFFSjFObitKWXZoTEFWRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY1llZUJJMXR3K1gwRHA5bFB2bytheFFFdGcrdzNyZGNhejJRenY5V0dEUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvS0Q0d1dMSVd6N3Q2WnpUVjhBeDJ5NXBVUTN2N3F3MVBRTGdqZUlRNjBBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFRUg1elVIdi9HN0VCdnZjOTBmSWxPakpLejhIR3Q0TlJlKzg1WmNKY2x3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFHMkhwMXZVOHlOQ0Uxd1liQ2NBRnUwbFNkY1NwakllKzhJdGhES1c2SFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ims3RVozOHJoNE9YOGJrVVNldXJ6SVcySFJqVHRmQkszU3NNWk0vWno4M1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0V1TFlSckhTUFBjMTZJL1lyTFFQUVJBSzczRlRsdDM1YTNidUkvcWZrOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUg0RVVQYkpVTWtpblVQc1k2dG0xNFFNMC80WHdZZ1Q4alhEamdrZnIxaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNHNzg2SFRHcjBVWjRtOFhlV2NkeEcwdUJxS1FOb3M3VjJyWVg5OXhEZ3BkQUtSQ1J5OHpwa0pReVpGbWY3UEIvRkJQLzR5bDJ4OWpVTkxtaTR4YUF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTUsImFkdlNlY3JldEtleSI6IkhGVVRONU5uMkpxUzAxenkwbWJlU0VhYTlObjgwOTkyZVF5eHRDUGNpU2M9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3NjI4NTI4MzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQzk3QjYyMUY0QjgzNUZFMUE0QzBGNEE4QzY3Q0QyM0YifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMjIzMDM4OX0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3NjI4NTI4MzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTEyQ0FBOUZCOThDQzA4QzcxMjI4REMyRDk4M0JBRTMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMjIzMDM4OX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiRUdhVGl2ZGNUa3F2WFA5Y0ZyVWhwUSIsInBob25lSWQiOiJiMTUzZTFmOS1kYTJlLTQ0MjgtOTdmOS0yMGVhZTM5NGNlZjciLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRDVoY3I1enh6eUR6YVgvRDN2Sm5DVUw5dFNrPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImwxaVRHYklreHFobS82UzJIYTZnQXhaQkJYST0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJBU1QyQ0NWUyIsIm1lIjp7ImlkIjoiOTQ3NjI4NTI4MzM6OUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiIqVElHRVIgTUlORCoifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0t2aXU2UUZFT2ZNbkxVR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlpQNkpScHI2aENHS1RNZG9wb3ZiYVdmMHRSZUdSdVA5bi9HWHk4WVVoQ0U9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ii9heHJ0UFhuTnF0cWlOUXpIR0VKamMyUS9hSDFraHZIQzh3UEUxQkd1VFl5aUlFaTIzTWFSdEVvOVc5SzZXZTFRb3V6SFFseGhjYkI4VDdNaGRtUkN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiIzQUlqTmlWblFoaWFQcDVUQlAxUThxZCt5TWE1dXliRDNSWStQRjhkVE1KS09JMzZ1Qmk4d3IrdmV3dWJqTmpKUnhneWFtK0pzbFZXVHExbzhpZmJEUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzYyODUyODMzOjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV1QraVVhYStvUWhpa3pIYUthTDIybG45TFVYaGtiai9aL3hsOHZHRklRaCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMjIzMDM4NywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFbzYifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "⚔  TIGER  ⚔",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "94753335072",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'DEXTER-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
