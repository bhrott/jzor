module.exports = () => {
  const fs = require('fs')
  const path = require('path')
  const toc = require('markdown-toc')
  const utils = require('../../utils')

  const middlewaresFolderPath = path.resolve(__dirname, '../../../src/middlewares')

  const mardownFiles = utils.getDirFiles(middlewaresFolderPath, [], filePath => filePath.endsWith('.md'))

  let content = ''

  for (let mdPath of mardownFiles) {
    const mdContent = fs.readFileSync(mdPath).toString()
    content += `${mdContent}\n\n\n`
  }

  const index = toc(content).content

  const templatePath = path.resolve(__dirname, 'middlewares-doc-template.md')

  const markdown = fs
    .readFileSync(templatePath)
    .toString()
    .replace('{{index}}', index)
    .replace('{{middlewares}}', content)


  const docPath = path.resolve(__dirname, '../../../docs/middlewares.md')

  fs.writeFileSync(docPath, markdown)

  // eslint-disable-next-line
  console.log('>>> Middlewares doc generated')
}