import crypto from "crypto"


export const Securitykey = "S@F!9upNmx9nS3mCzRSpw4rU9mrN5T75";

export const decrypt = (data) => {
  const initVector = Securitykey.substring(0, 16),
    encryptdata = Buffer.from(data, 'base64').toString('binary');

  var decipher = crypto.createDecipheriv('aes-256-cbc', Securitykey, initVector),
    decoded = decipher.update(encryptdata, 'binary', 'utf8');

  decoded += decipher.final('utf8');

  let result

  try {
    result = JSON.parse(decoded)
  }
  catch (err) {
    result = decoded
  }
  return result;
}


export const encrypt = (data) => {
  const algorithm = "aes-256-cbc";
  const initVector = Securitykey.substring(0, 16);

  var encipher = crypto.createCipheriv(algorithm, Securitykey, initVector),
    encryptdata = encipher.update(JSON.stringify(data), 'utf8', 'binary');

  encryptdata += encipher.final('binary');
  let encode_encryptdata = Buffer.from(encryptdata, 'binary').toString('base64');
  return encode_encryptdata;
}

