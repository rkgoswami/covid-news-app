const zip = require('express-zip');
const path = require('path');
const getLatestNews = require('./covidNews');
const covidReport = require('./covidReport');

const express = require('express');
const app = express();

app.use(express.static('./'));

app.get("/", (req, res) => {
    getLatestNews();
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get("/download", (req, res) => {
    covidReport();
    const dateTitle = new Date().toISOString().split('T')[0];
    const filePath = path.join(__dirname, 'reports');
    res.zip([
        { path: filePath + '/apac-' + dateTitle +'.csv', name: 'apac.csv' },
        { path: filePath + '/europe-'+ dateTitle +'.csv', name: 'europe.csv' },
        { path: filePath + '/mena-'+ dateTitle +'.csv', name: 'mena.csv' },
        { path: filePath + '/rotw-'+ dateTitle +'.csv', name: 'rotw.csv' },
        { path: filePath + '/sarc-'+ dateTitle +'.csv', name: 'sarc.csv' }
    ]);
});

const PORT = 4894;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
