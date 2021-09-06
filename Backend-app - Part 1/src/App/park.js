

/**
 * 
 * @param {*} vehicle Vehicle to park
 * @param {*} currentLocation Location we want to park
 */
function parkVehicleAtLocation(vehicle, currentLocation) {
    if (vehicle && currentLocation && currentLocation.latitude && currentLocation.longitude) {
        if (vehicle.location == null || vehicle.location.latitude !== currentLocation.latitude && vehicle.location.longitude !== currentLocation.longitude
            && vehicle.location.altitude !== currentLocation.altitude) {
            vehicle.location = currentLocation;
            return true;
        }
        throw new Error('Cannot park vehicle twice at same location');
    }
    throw new Error('Cannot park vehicle at undefined location');
}

/**
 * Park vehicle with coordinates
 * @param {*} vehicle 
 * @param {*} latitude 
 * @param {*} longitude 
 * @param {*} altitude 
 * @returns 
 */
function parkVehicleAtCoordinates(vehicle, latitude, longitude, altitude = 0) {
    if (vehicle && latitude && longitude) {
        if (vehicle.location == null || vehicle.location.latitude !== latitude && vehicle.location.longitude !== longitude
            && vehicle.location.altitude !== altitude) {
                const location = new Location();
                location.latitude = latitude;
                location.longitude = longitude;
                location.altitude = altitude;
            vehicle.location = location;
            return true;
        }
        throw new Error('Cannot park vehicle twice at same location');
    }
    throw new Error('Cannot park vehicle at undefined location');
}

module.exports = {
    parkVehicleAtLocation: parkVehicleAtLocation,
    parkVehicleAtCoordinates: parkVehicleAtCoordinates
}