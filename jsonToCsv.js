const fs = require('fs');
const path = require('path');

function jsonToCsvConvertor(jsonData, reportTitle, showHeader = true) {
    let csvContent = '';
    // set header
    if (showHeader) {
        //append Label row with line break
        csvContent += Object.keys(jsonData[0]).join() + '\r\n';
    }
    
    jsonData.forEach((dataObj) => {
        let row = Object.values(dataObj).join();
        //add a line break after each row
        csvContent += row + '\r\n';
    });
    
    if (fs.existsSync(path.join(__dirname, 'reports'))) {
        fs.readdirSync(path.join(__dirname, 'reports'), (err, files) => {
            if (err) throw err;
            console.log(files);
            
            for (const file of files) {
                fs.unlinkSync(path.join(__dirname, 'reports'));
            }
        });
    } else {
        fs.mkdirSync(path.join(__dirname, 'reports'));
    }

    // create file and add the report
    let dateTitle = new Date().toISOString().split('T')[0];
    fs.writeFile(path.join(__dirname, 'reports', reportTitle + '-' + dateTitle + '.csv'), csvContent, (err) => {
        if (err) throw err;
        console.log('Written into file ...');
    });
};

module.exports = jsonToCsvConvertor;