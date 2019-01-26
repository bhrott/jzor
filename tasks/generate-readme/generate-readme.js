const fs = require('fs')
const path = require('path')
const toc = require('markdown-toc')
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

const validatorsIndex = toc(content).content

template = template
  .replace('{{validators}}', content)
  .replace('{{validators-index}}', validatorsIndex)

const readmePath = path.resolve(__dirname, '../../README.md')

fs.writeFileSync(readmePath, template)