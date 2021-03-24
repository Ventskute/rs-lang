const fs = require('fs');
const path = require('path');

const pathToRoot = path.resolve(__dirname, '../../');

const saveImage = (files, imgTitle, subPath, fileName) => {
  let pathToAvatar = null;
  if (files && files.profileImg && files.profileImg.type.includes('image')) {
    pathToAvatar = 'files/'.concat(
      subPath,
      imgTitle,
      files[fileName].name.replace(/^.+[.]/, '.')
    );
    const rStr = fs.createReadStream(files[fileName].path);
    const wStr = fs.createWriteStream(path.resolve(pathToRoot, pathToAvatar));
    rStr.pipe(wStr);
  }
  return pathToAvatar;
};

module.exports = saveImage;
