import * as fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const txtRegex = new RegExp('^.*.(txt)$', 'g');
    const bmpRegex = new RegExp('^.*.(bmp)$', 'g');
    const images = fs.readdirSync('ParsedData/images');
    let fileNames = images.filter((image) => image.match(txtRegex));
    fileNames.forEach(
      (fileName, index) => (fileNames[index] = fileName.replace('_AOI.txt', ''))
    );
    console.log(fileNames);
    console.log(images.filter((image) => image.match(bmpRegex)).length);
    res.status(200).json(images.filter((image) => image.match(bmpRegex)));
  } catch (err) {
    console.error(err);
    res.status(404);
  }
}
