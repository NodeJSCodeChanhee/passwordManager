function doWork(){
	//throw error that say 'unable to do work'
	throw new Error('unable to do work');
}

try {
	doWork();
} catch(e) {
	console.log(e.message);
} finally {
	console.log('Finally block is still executed!');
}

console.log('Try catch ended!');


