const fs = require('fs');
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setHeading('Events', 'Stats').setBorder('|', '=', "0", "0")
const path = require('path');
const events = path.join(__dirname, '../events');
module.exports = (client) => {
    fs.readdirSync(events).filter((file) => file.endsWith('.js')).forEach((event) => {
      	require(`${events}/${event}`);
	table.addRow(event.split('.js')[0], '✅')
    })
	console.log(table.toString())
};