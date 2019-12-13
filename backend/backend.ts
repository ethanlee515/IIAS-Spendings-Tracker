import * as crypto from "crypto"

const id = crypto.randomBytes(16).toString("hex");

console.log(id);
