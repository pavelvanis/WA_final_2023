
const fs = require('fs')

const attempts = 3
const pathFile = '../data/bad-logs.json'

module.exports = (user, logs) => {

    if (user.username === logs.name) {
        ++logs.logs;
        console.log(user.username);
    } else {
        logs.logs = 1
    }

    if (logs.logs >= attempts) writeLog(user)

    logs.name = user.username
    return { logs }
}

function writeLog(user) {
    const format = {
        datetime: new Date(),
        ...user
    }

    let data = readFile()

    data.push(format)

    const json = JSON.stringify(data)

    // console.log(__filename);
    console.log(__dirname);
    fs.writeFile(`${__dirname}/data/bad-logs.json`, json, (err) => {
        if (err) {
            console.log('Error when writing to JSON file: ' + err);
        } else {
            console.log('The data has been successfully written');
        }
        console.log('writed');
    })
    console.log('object');

}

function readFile() {
    try {
        const data = fs.readFileSync(`${__dirname}/data/bad-logs.json`, 'utf8');
        const existingData = JSON.parse(data);
        console.log(existingData);
        console.log('----------------------------');
        return existingData
    } catch (err) {
        console.error('Error while reading file', err);
        return
    }
}