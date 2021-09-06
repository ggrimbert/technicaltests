const { executeRunRequestWithParametersAsync, executeGetRequestWithParametersAsync } = require('./sqlite-storage-service');

function createFleetInDbAsync(fleet) {
	const sqlQry = 'INSERT INTO "Fleet" (fleetId, userId) VALUES (:fleetId, :userId)';
	const qryParameters = {
		':fleetId': fleet.fleetId,
		':userId': fleet.userId
	};
	return executeRunRequestWithParametersAsync(sqlQry, qryParameters);
}

function createOrUpdateVehicleInDbAsync(immatNum) {
	const sqlQry = 'INSERT INTO "Vehicle" (immatNum) VALUES (:immatNum) ON CONFLICT(immatNum) DO UPDATE SET location=excluded.location';
	const qryParameters = {
		':immatNum': immatNum
	};
	return executeRunRequestWithParametersAsync(sqlQry, qryParameters);
}

function registerVehicleInFleetInDbAsync(immatNum, fleetId) {
	const sqlQry = 'INSERT INTO "VehiclesByFleet" (fleetId, vehicleId) VALUES (:fleetId, :immatNum)';
	const qryParameters = {
		':immatNum': immatNum,
		':fleetId': fleetId
	};
	return executeRunRequestWithParametersAsync(sqlQry, qryParameters);
}

function createOrIgnoreLocationInDbAsync(latitude, longitude, altitude) {
	const sqlQry = 'INSERT OR IGNORE INTO "Location" (latitude, longitude, altitude) VALUES (:latitude, :longitude, :altitude)';
	const qryParameters = {
		':latitude': latitude,
		':longitude': longitude,
		':altitude': altitude
	};
	return executeRunRequestWithParametersAsync(sqlQry, qryParameters);
}

function getFleetWithVehiclesFromDbAsync(fleetId) {
	const sqlQry = `SELECT * 
    FROM "Fleet"
    LEFT OUTER JOIN "VehiclesByFleet" ON "VehiclesByFleet".fleetId = "Fleet".fleetId
    LEFT OUTER JOIN "Vehicle" ON "Vehicle".immatNum= "VehiclesByFleet".vehicleId
    WHERE "Fleet".fleetId = :fleetId`;
	const qryParameters = {
		':fleetId': fleetId
	};
	return executeGetRequestWithParametersAsync(sqlQry, qryParameters);
}

function getFleetFromDbAsync(fleetId) {
	const sqlQry = `SELECT * 
    FROM "Fleet"
    WHERE "Fleet".fleetId = :fleetId`;
	const qryParameters = {
		':fleetId': fleetId
	};
	return executeGetRequestWithParametersAsync(sqlQry, qryParameters);
}

function findVehicleByImmatAndFleet(fleetId, immatNum) {
	const sqlQry = `SELECT * 
    FROM "Fleet"
    INNER JOIN "VehiclesByFleet" ON "VehiclesByFleet".fleetId = "Fleet".fleetId
    INNER JOIN "Vehicle" ON "Vehicle".immatNum= "VehiclesByFleet".vehicleId
    LEFT OUTER JOIN "Location" ON "Vehicle".location = "Location"."id"
    WHERE "Fleet".fleetId = :fleetId AND "Vehicle".immatNum = :immatNum`;
	const qryParameters = {
		':fleetId': fleetId,
		':immatNum': immatNum
	};
	return executeGetRequestWithParametersAsync(sqlQry, qryParameters);
}

function getLocationInDbAsync(latitude, longitude, altitude) {
	const sqlQry = 'SELECT id FROM "Location" WHERE latitude = :latitude AND longitude = :longitude AND altitude = :altitude';
	const qryParameters = {
		':latitude': latitude,
		':longitude': longitude,
		':altitude': altitude
	};
	return executeGetRequestWithParametersAsync(sqlQry, qryParameters);
}

function setLocationToVehicleInDb(immatNum, locationId) {
	const sqlQry = 'UPDATE "Vehicle" SET "location"=:locationId WHERE immatNum = :immatNum';
	const qryParameters = {
		':immatNum': immatNum,
		':locationId': locationId
	};
	return executeRunRequestWithParametersAsync(sqlQry, qryParameters);
}


module.exports = {
	createFleetInDbAsync: createFleetInDbAsync,
	getFleetWithVehiclesFromDbAsync: getFleetWithVehiclesFromDbAsync,
	getFleetFromDbAsync: getFleetFromDbAsync,
	createOrUpdateVehicleInDbAsync: createOrUpdateVehicleInDbAsync,
	registerVehicleInFleetInDbAsync: registerVehicleInFleetInDbAsync,
	findVehicleByImmatAndFleet: findVehicleByImmatAndFleet,
	createOrIgnoreLocationInDbAsync: createOrIgnoreLocationInDbAsync,
	getLocationInDbAsync: getLocationInDbAsync,
	setLocationToVehicleInDb: setLocationToVehicleInDb
};