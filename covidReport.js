const jsonToCsv = require('./jsonToCsv');
const newsData = require("./public/rawNews");

const _europe = require("./utils/europe");
const _mena = require("./utils/mena");
const _apac = require("./utils/apac");
const _sarc = require("./utils/sarc");
const _rotw = require("./utils/rotw");

const regionMap = {
    europe: _europe,
    mena: _mena,
    apac: _apac,
    sarc: _sarc,
    rotw: _rotw
};

// extract covid report from feed
// function getCovidNews(latestNews) {
//     return latestNews.feed["entry"].map(item => {
//         return {
//           country: item.gsx$country.$t.trim(),
//           confirmedCases: +item.gsx$confirmedcases.$t.replace(/,/g, ""),
//           reportedDeaths: +item.gsx$reporteddeaths.$t.replace(/,/g, "")
//         };
//     });
// }


// prepare list by region
function getUpdateByRegion(region, covidAffectedList) {
    return region.map(item => covidAffectedList.find(s => s.country === item)).filter(item => item !== undefined);
}

// prepare list by region and generate report for it
function covidReport() {
    // const covidAffectedList = getCovidNews(latestNews);
    const covidAffectedList = newsData;
    // console.log(covidAffectedList);

    for (const key in regionMap) {
        let output = getUpdateByRegion(regionMap[key], covidAffectedList);

        // console.log(output);
        output.sort((a, b) => b.confirmedCases - a.confirmedCases);
        jsonToCsv(output, key);
    }
}

// covidReport();

module.exports = covidReport;


