module.exports = () => {
  const fs = require('fs')
  const path = require('path')
  const toc = require('markdown-toc')
  const utils = require('../../utils')

  const validatorsFolderPath = path.resolve(__dirname, '../../../src/validators')

  const mardownFiles = utils.getDirFiles(validatorsFolderPath, [], filePath => filePath.endsWith('.md'))

  let content = ''

  for (let mdPath of mardownFiles) {
    const mdContent = fs.readFileSync(mdPath).toString()
    content += `${mdContent}\n\n\n`
  }

  const validatorsIndex = toc(content).content

  const templatePath = path.resolve(__dirname, 'validators-doc-template.md')

  const markdown = fs
    .readFileSync(templatePath)
    .toString()
    .replace('{{validators-index}}', validatorsIndex)
    .replace('{{validators}}', content)


  const docPath = path.resolve(__dirname, '../../../docs/validators.md')

  fs.writeFileSync(docPath, markdown)

  // eslint-disable-next-line
  console.log('>>> Validators doc generated')
}