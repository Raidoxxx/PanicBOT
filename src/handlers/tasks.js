const fs = require('fs');
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setHeading('Tasks', 'Stats').setBorder('|', '=', "0", "0")
const path = require('path');
const tasks = path.join(__dirname, '../tasks');
module.exports = (client) => {
    fs.readdirSync(tasks).filter((file) => file.endsWith('.js')).forEach((task) => {
        const taskFile = require(`${tasks}/${task}`);

        setInterval(() => {
            taskFile.run(client);
        }, taskFile.cooldown);

    table.addRow(task.split('.js')[0], '✅')
    })
    console.log(table.toString())
};