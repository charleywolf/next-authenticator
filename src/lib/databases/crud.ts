import { Collection, InsertOneResult, ObjectId } from "mongodb";
import { getError, throwError } from "../../utils/misc";

import { AccountData } from "./models";
import { ParsedConfig } from "../interface";
import { connectToDatabase } from "./mongodb";

/**
 * Gets the account collection
 * @param {ParsedConfig} config To get the uri, database name, and collection where the accounts are stored
 * @returns {Promise<Collection<AccountData>>} Returns the collection
 */
async function getCollection(
  config: ParsedConfig,
): Promise<Collection<AccountData>> {
  try {
    const { db } = await connectToDatabase(
      config.mongoUri,
      config.mongoDatabase,
    );
    return db.collection<AccountData>(config.mongoCollection);
  } catch (error: unknown) {
    throw Error(getError("getCollection", error));
  }
}

/**
 * Gets the account from a provided username
 * @param {ParsedConfig} config Config for database information
 * @param {string} username Username to search from
 * @returns {Promise<AccountData[]>} Returns an array of accounts, which will be empty if none exists
 */
export async function getAccountFromUsername(
  config: ParsedConfig,
  username: string,
): Promise<AccountData[]> {
  try {
    const collection: Collection<AccountData> = await getCollection(config);
    return await collection.find({ username }).toArray();
  } catch (error: unknown) {
    throwError("getAccount", error);
    return [];
  }
}

/**
 * Creates an account based on a provided username and password
 * @param {ParsedConfig} config Config for database information
 * @param {string} username Username for new account
 * @param {string} password Password for new account
 * @returns {Promise<false | InsertOneResult<AccountData>>} Returns false if an error occured, or the result if a new account was successfully created
 */
export async function createAccount(
  config: ParsedConfig,
  username: string,
  password: string,
): Promise<false | InsertOneResult<AccountData>> {
  try {
    const collection: Collection<AccountData> = await getCollection(config);

    const doc: AccountData = {
      username,
      password,
      _id: new ObjectId(),
    };
    return await collection.insertOne(doc);
  } catch (error: unknown) {
    throwError("createAccount", error);
    return false;
  }
}
