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

    const writeStream = fs.createWriteStream('./rawNews.json');

    const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);
        let data = '';
        res.on('data', chunk => {
            data += chunk;
        }).on('end', () => {
            const jsonData = JSON.parse(data);
            const result = jsonData.feed["entry"].map(item => {
                return {
                    country: item.gsx$country.$t.trim(),
                    confirmedCases: +item.gsx$confirmedcases.$t.replace(/,/g, ""),
                    reportedDeaths: +item.gsx$reporteddeaths.$t.replace(/,/g, "")
                };
            });
            writeToFile(result, path.join(__dirname, 'public', 'rawNews.json'));
        }).pipe(writeStream);
    });

    req.on('error', error => {
        console.error('Found Error: ', error);
    });
    
    req.end();
}

function writeToFile(data, path) {
    const json = JSON.stringify(data, null, 4);
    fs.writeFile(path, json, (err) => {
        if (err) {
            console.error(err);
            throw err;
        }
        console.log('Saved latest news to file ...');
    })
}

// get latest news from server
// getLatestNews();

module.exports = getLatestNews;





