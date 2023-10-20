const fs = require('fs');
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setHeading('Forms', 'Stats').setBorder('|', '=', "0", "0")
const path = require('path');
const forms = path.join(__dirname, '../forms');
module.exports = (client) => {
    fs.readdirSync(forms).filter((file) => file.endsWith('.js')).forEach((file) => {
        const form = require(`${forms}/${file}`)
        client.forms.set(form.id, form)
		    table.addRow(form.id, '✅')
    })
		console.log(table.toString())
};