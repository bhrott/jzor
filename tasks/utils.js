const fs = require('fs')
const getDirFiles = function(dir, filelist = [], include = filePath => !!filePath) {
  let files = fs.readdirSync(dir)
  filelist = filelist || []
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = getDirFiles(dir + '/' + file, filelist, include)
    }
    else if (include(file)) {
      filelist.push(dir + '/' + file)
    }
  })
  return filelist
}

module.exports = {
  getDirFiles
}