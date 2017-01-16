// Part of https://github.com/chris-rock/node-crypto-examples

const readline = require('readline');

// Nodejs encryption with CTR
const crypto = require('crypto'),
      algorithm = 'aes-256-ctr';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter 1 to encrypt a key and 2 to decrype a key: ', (action) => {
  if (action == '1') run('Paste your key to encrypt: ', encrypt);
  else if (action == '2') run('Paste your key to decrypt: ', decrypt);
  else {
    console.log('Unknown action: ', action);
    rl.close();
  }
});

function run(question, action) {
  rl.question(question, (key) => {
    rl.question('Enter password: ? ', (password) => {
      console.log('"' + key + '"');
      console.log('Result:', action(key, password))
      rl.close();
    });
  });
}

function encrypt(text, password){
  var cipher = crypto.createCipher(algorithm, password)
  var crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text, password){
  var decipher = crypto.createDecipher(algorithm, password)
  var dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8');
  return dec;
}