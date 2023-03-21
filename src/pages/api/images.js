import * as fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const txtRegex = new RegExp('^.*.(txt)$', 'g');
    const bmpRegex = new RegExp('^.*.(bmp)$', 'g');
    let images = fs.readdirSync('ParsedData/images');
    console.log(images.filter((image) => image.match(txtRegex)).length);
    console.log(images.filter((image) => image.match(bmpRegex)).length);
    res.status(200).json({ helo: 'world' });
  } catch (err) {
    console.error(err);
    res.status(404);
  }
}
