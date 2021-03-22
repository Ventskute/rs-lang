const fs = require('fs');
const path = require('path');

const pathToRoot = path.resolve(__dirname, '../../');

const saveImage = async (files, imgTitle, subPath, fileName) => {
  let pathToAvatar = null;
  if (files && files.profileImg && files.profileImg.type.includes('image')) {
    pathToAvatar = 'files/'.concat(
      subPath,
      imgTitle,
      files[fileName].name.replace(/^.+[.]/, '.')
    );
    const avatarStrR = fs.createReadStream(files[fileName].path);
    const avatarStrW = fs.createWriteStream(
      path.resolve(pathToRoot, pathToAvatar)
    );
    avatarStrR.pipe(avatarStrW);
  }
  return pathToAvatar;
};

module.exports = saveImage;
