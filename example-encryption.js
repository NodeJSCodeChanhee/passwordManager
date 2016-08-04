var crypto = require('crypto-js');

var secretMessage = {
	name : 'Andrew',
	secretName : '007'
};

var secretKey = '123abc';

//var secretJson = JSON.stringify(secretMessage);
//Encrypt message
var encryptedMessage = crypto.AES.encrypt(JSON.stringify(secretMessage), secretKey);

console.log('EncryptedMessage: ' + encryptedMessage);

//Decrypt message
var bytes = crypto.AES.decrypt(encryptedMessage, secretKey);

var decryptedMessage = JSON.parse(bytes.toString(crypto.enc.Utf8));


console.log(decryptedMessage);
console.log('Decrypted message : ' + decryptedMessage.secretName);


