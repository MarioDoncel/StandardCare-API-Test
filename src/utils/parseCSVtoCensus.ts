import { parse } from 'csv-parse';
import fs from 'fs';

import { ICensus } from '../interfaces/Census';

export const parseCSVToCensus = (
  file: Express.Multer.File,
  clientName: string
): Promise<ICensus[]> => {
  return new Promise((res, rej) => {
    const clientCensus: ICensus[] = [];

    const stream = fs.createReadStream(file.path);
    const parseFile = parse();

    stream.pipe(parseFile);
    parseFile
      .on('data', async ([name, dateOfBirth]) =>
        clientCensus.push({ name, dateOfBirth, clientName })
      )
      .on('end', () => {
        fs.promises.unlink(file.path);
        res(clientCensus);
      })
      .on('error', (err) => rej(err));
  });
};
