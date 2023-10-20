const fs = require('fs');
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setHeading('Buttons', 'Stats').setBorder('|', '=', "0", "0")
const path = require('path');
const buttons = path.join(__dirname, '../buttons');
module.exports = (client) => {
    fs.readdirSync(buttons).filter((file) => file.endsWith('.js')).forEach((file) => {
        const button = require(`${buttons}/${file}`)
        client.buttons.set(button.id, button)
		    table.addRow(button.id, '✅')
    })
		console.log(table.toString())
};