const sqlite3 = require('sqlite3');
const {open} = require('sqlite');
const path = require('path');
const process = require('process');

function _openDatabase() {
	//Database already exists
	const dbPath = path.resolve(process.cwd(), './fleetmanagement.db');
	return open({
		filename: dbPath,
		driver: sqlite3.Database
	});
}

function executeRunRequestWithParametersAsync(sqlQry, parameters) {
	return _openDatabase()
		.then(db => {
			return db.run(sqlQry, parameters)
				.then(results => {
					db.close();
					return results;
				});
		});
}

function executeGetRequestWithParametersAsync(sqlQry, parameters) {
	return _openDatabase()
		.then(db => {
			return db.get(sqlQry, parameters)
				.then(results => {
					db.close();
					return results;
				});
		});
}

/** Only for cleaning db for tests */
function purgeDatabase() {
	return _openDatabase()
		.then(async db => {
			const queries = ['delete from "VehiclesByFleet"', 'delete from "Vehicle"', 'delete from "Location"', 'delete from "Fleet"'];
			for (let i = 0; i < queries.length; i++) {
				await db.run(queries[i]);
			}
			db.close();
		});
}

module.exports = {
	executeGetRequestWithParametersAsync: executeGetRequestWithParametersAsync,
	executeRunRequestWithParametersAsync: executeRunRequestWithParametersAsync,
	purgeDatabase: purgeDatabase
};