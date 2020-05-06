const https = require('https');
const fs = require('fs');
const path = require('path');


function getLatestNews() {
    const url = new URL("https://infographics.channelnewsasia.com/covid-19/newdata.json");

    // get latest new feed from above url
    const options = {
        hostname: url.hostname,
        path: url.pathname,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    var writeStream = fs.createWriteStream('./rawNews.json');
    
    const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);
        res.pipe(writeStream);
    });

    req.on('error', error => {
        console.error('Found Error: ', error);
    });
    
    req.end();
}

// get lastest news from server
getLatestNews();





