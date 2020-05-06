const http = require("http");
const result = require("./test");
const latestNews = require("./rawNews");

const server = http.createServer((req, res) => {
    const { method, url } = req;

    console.log(result);

    const finalData = getRealtimeData();

    let status = 200;
    res.writeHead(status, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    res.end(JSON.stringify(finalData));

    res.on('data', (chunk) => {

    }).on('end', () => {
        let status = 200;
        res.writeHead(status, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        });

        res.end(JSON.stringify(finalData));
    });
});

const PORT = 4894;

server.listen(PORT, () => console.log(`Server running at port ${PORT}`));


function getRealtimeData() {
    return latestNews.feed["entry"].map(item => {
        let country = item.gsx$country.$t.trim()
        let data = result[country];
        // if(!data) {
        //     delete data.value;
        // }
        return {
            ...data,
            country: item.gsx$country.$t.trim(),
            confirmedCases: +item.gsx$confirmedcases.$t.replace(/,/g, ""),
            reportedDeaths: +item.gsx$reporteddeaths.$t.replace(/,/g, "")
        };
    });
}