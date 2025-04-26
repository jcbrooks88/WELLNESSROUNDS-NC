import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

import { Readable } from 'stream';

const saveFile = (createReadStream: () => Readable, filename: string) => {
  const uploadDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const uniqueFilename = `${uuidv4()}-${filename}`;
  const filepath = path.join(uploadDir, uniqueFilename);

  return new Promise((resolve, reject) => {
    const stream = createReadStream();
    const out = fs.createWriteStream(filepath);

    stream.pipe(out);
    out.on('finish', () => resolve(`/uploads/${uniqueFilename}`));
    out.on('error', reject);
  });
};

module.exports = { saveFile };
