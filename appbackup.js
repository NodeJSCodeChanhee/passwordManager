console.log('starting password manager');

var storage = require('node-persist');
var crypto = require('crypto-js');

storage.initSync();

var argv = require('yargs')
		.command('create', 'Creat a new account', function(yargs){
			yargs.options({
				name : {
					demand: true,
					alias: 'n',
					description: 'Account name',
					type : 'string'
				},
				username : {
					demand : true,
					alias : 'u',
					description : 'Account username ',
					type : 'string'
				},
				password : {
					demand : true,
					alias : 'p',
					description : 'Account password ',
					type : 'string'
				},
				masterpassword : {
					demand : true,
					alias : 'm',
					description : 'Master password',
					type : 'string'
				}
			}).help('help')
		})
		.command('get', 'Get an existing account information', function(yargs){
			yargs.options({
				name : {
					demand: true,
					alias : 'n',
					description : 'your account info comes here',
					type : 'string'
				},
				masterpassword : {
					demand : true,
					alias : 'm',
					description : 'Master password',
					type : 'string'
				}
			}).help('help')
		})
		.help('help')
		.argv;

var command = argv._[0];
console.log(argv);

//create
// --name
// --username
// --password

// get
// --name
//  


// account.name facebook
//account.username user12!
//account.password password123


function getAccounts(masterpassword){
	//use getItemSync to fetch accounts
	var encryptedAccounts = storage.getItemSync('accounts');
	var accounts = [];
	if(typeof encryptedAccounts !== 'undefined'){
    	var decryptedBytes = crypto.AES.decrypt(encryptedAccounts, masterpassword);
            accounts = JSON.parse(decryptedBytes.toString(crypto.enc.Utf8));
    }

    /*var decryptedBytes = crypto.AES.decrypt(encryptedAccounts, masterpassword);
    var decryptedAccounts = JSON.parse(decryptedBytes.toString(crypto.enc.utf8));*/
	//decrpt
	//return accounts to array
	return accounts;
}

function saveAccounts(accounts, masterpassword){
	//encrpyt accounts
	//setItemSync
	//return accounts
	var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterpassword);
	storage.setItemSync('accounts', encryptedAccounts.toString());
	return accounts;
}

function createAccount(account, masterpassword){
	// var acc

	var accounts = getAccounts(masterpassword);
    
	

	accounts.push(account);
	
	saveAccounts(accounts, masterpassword);
	//storage.setItemSync('accounts', accounts);
     

	return account;
	// push on new accounts
	// return account
}


function getAccount(accountName, masterpassword){
	//var accounts use getItemSync
	// iterate over array, return matching account, else undefined
	//
	var accounts = getAccounts(masterpassword);
	var matchedAccount;
	accounts.forEach(function(account){
		if (account.name === accountName){
			matchedAccount = account;
		} 
	});
	return matchedAccount;
}
/*
createAccount({
	name : 'facebook',
	username : 'someemail@gmail.com',
	password : 'password123!'
});
var facebookAccount = getAccount('facebook');
console.log(facebookAccount);
*/
if(command === 'create' && typeof argv.name !== 'undefined' && typeof argv.username !== 'undefined' && typeof argv.password !== 'undefined' && argv.masterpassword !== 'undefined'){
	try{
		var createdAccount = createAccount({
			name : argv.name,
			username : argv.username,
			password : argv.password
		}, argv.masterpassword);
		console.log('Account created!');
		console.log(createdAccount);
	} catch(e){
		console.log('Unable to create an account');
	}
} else if(command === 'get' && typeof argv.name !== 'undefined' && argv.masterpassword !== 'undefined') {
		try{
			var fetchedAccount = getAccount(argv.name, argv.masterpassword);
				if(typeof fetchedAccount === 'undefined'){
					console.log('Account not found');
				} else {
					console.log('Account found!');
					console.log(fetchedAccount);
				}
		} catch(e) {
			console.log('Unable to fetch an account');
		}
} else {
	console.log('Command option error!!!');
}

