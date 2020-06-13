import * as mongodb from "mongodb";

/**
 * Mongo Helper
 */
export class MongoHelper {
  public static client: mongodb.MongoClient;

  // eslint-disable-next-line require-jsdoc
  public static connect(url: string) {
    return new Promise((resolve, reject) => {
      mongodb.MongoClient.connect(url, (err, client: mongodb.MongoClient) => {
        if (err) {
          reject(err);
        } else {
          MongoHelper.client = client;
          resolve(client);
        }
      });
    });
  }
}
