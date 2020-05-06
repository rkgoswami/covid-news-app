const jsonToCsvConvertor = require('./jsonToCsv');

const latestNews = require("./rawNews");

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
function getCovidNews(latestNews) {
    return latestNews.feed["entry"].map(item => {
        return {
          country: item.gsx$country.$t.trim(),
          confirmedCases: +item.gsx$confirmedcases.$t.replace(/,/g, ""),
          reportedDeaths: +item.gsx$reporteddeaths.$t.replace(/,/g, "")
        };
    });
}


// prepare list by region
function getUpdateByRegion(region) {
    return region.map(item => covidAffectedList.find(s => s.country === item)).filter(item => item !== undefined);
}

// prepare list by region and generate report for it
const covidAffectedList = getCovidNews(latestNews);
console.log(covidAffectedList);

for (const key in regionMap) {
    let output = getUpdateByRegion(regionMap[key]);

    // console.log(output);
    output.sort((a, b) => b.confirmedCases - a.confirmedCases);
    jsonToCsvConvertor(output, key);
}

