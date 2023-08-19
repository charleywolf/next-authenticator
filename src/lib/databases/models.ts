import { ObjectId } from "mongodb";

export interface AccountData {
  username: string;
  password: string;
  _id: ObjectId;
}
