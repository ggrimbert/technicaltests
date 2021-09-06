const { Fleet } = require('../Domain/Fleet');
const { v4: uuidv4 } = require('uuid');
const { createFleetInDbAsync, getFleetFromDbAsync, createOrUpdateVehicleInDbAsync, registerVehicleInFleetInDbAsync } = require('../Infra/storage/sql-requests-manager');

function createFleet(userId) {

	const fleet = new Fleet();
	fleet.userId = userId;

	const generatedFleetId = uuidv4(); 
	fleet.fleetId = generatedFleetId;

	return createFleetInDbAsync(fleet)
		.then(() => {
			return generatedFleetId;
		});

}

function registerVehiculeIntoFleet(fleetId, immatNum) {
	return getFleetFromDbAsync(fleetId)
		.then(dbFleet => {
			if (dbFleet != null) {
				const fleet = new Fleet();
				fleet.fleetId = dbFleet.fleetId;
				fleet.userId = dbFleet.userId;
			}
			return createOrUpdateVehicleInDbAsync(immatNum)
				.then(() => {
					return registerVehicleInFleetInDbAsync(immatNum, fleetId)
						.catch(err => {
							if (err.errno != null && err.errno === 19) {
								//Constraint problem, trying to register a vehicle already registered
								throw new Error('Vehicle already registered into fleet');
							}
						});
				})
				.catch(err => {throw err;});
		}).catch(err => {throw err;});
}

module.exports = {
	registerVehiculeIntoFleet,
	createFleet
};