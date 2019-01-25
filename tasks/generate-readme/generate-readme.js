const fs = require('fs')
const path = require('path')
const utils = require('../utils')

const validatorsFolderPath = path.resolve(__dirname, '../../src/validators')

const mardownFiles = utils.getDirFiles(validatorsFolderPath, [], filePath => filePath.endsWith('.md'))

let content = ''

for (let mdPath of mardownFiles) {
  const mdContent = fs.readFileSync(mdPath).toString()
  content += `${mdContent}\n\n\n`
}

const templatePath = path.resolve(__dirname, 'README.template.md')
let template = fs.readFileSync(templatePath).toString()

template = template.replace('{{validators}}', content)

const readmePath = path.resolve(__dirname, '../../README.md')

fs.writeFileSync(readmePath, template)