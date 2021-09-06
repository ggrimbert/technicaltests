const { findVehicleByImmatAndFleet, createOrIgnoreLocationInDbAsync, setLocationToVehicleInDb, getLocationInDbAsync } = require('../Infra/storage/sql-requests-manager');


/**
 * Park vehicle with coordinates
 * @param {*} vehicle 
 * @param {*} latitude 
 * @param {*} longitude 
 * @param {*} altitude 
 * @returns 
 */
function parkVehicleAtCoordinates(fleetId, immatNum, latitude, longitude, altitude = 0) {
	if (fleetId && immatNum && latitude && longitude) {
		return findVehicleByImmatAndFleet(fleetId, immatNum)
			.then(dbRecord => {
				if (dbRecord != null) {
					if (dbRecord.location == null
                    || !(parseFloat(dbRecord.latitude) === parseFloat(latitude) 
                        && parseFloat(dbRecord.longitude) === parseFloat(longitude)
                        && parseFloat(dbRecord.altitude) === parseFloat(altitude))
					) {
						//Save location and set to vehicule
						return createOrIgnoreLocationInDbAsync(latitude, longitude, altitude)
							.then(async inserted => {
								let locationId = '';
								if (inserted.changes === 0) {
									//Location already exists, we have to search it
									locationId = (await getLocationInDbAsync(latitude, longitude, altitude)).id;
								} else {
									locationId = inserted.lastID;
								}

								//Set location to Vehicle
								return setLocationToVehicleInDb(immatNum, locationId);
                            
							});
					}
					throw new Error('Cannot park vehicle twice at same location');
				}
				throw new Error('Vehicule or Fleet not found');
			});        
	}
	throw new Error('Cannot park vehicle at undefined location');
}

module.exports = {
	parkVehicleAtCoordinates: parkVehicleAtCoordinates
};