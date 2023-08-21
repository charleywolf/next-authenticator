import { Collection, InsertOneResult, ObjectId } from "mongodb";
import { getError, throwError } from "../../utils/misc";
import { ParsedConfig } from "../interface";
import { AccountData } from "./models";
import { connectToDatabase } from "./mongodb";

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

export async function createAccount(
  config: ParsedConfig,
  username: string,
  password: string,
): Promise<boolean | InsertOneResult<AccountData>> {
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
