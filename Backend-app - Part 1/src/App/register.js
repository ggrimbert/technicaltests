

function registerVehiculeIntoFleet(fleet, vehicle) {
    if (fleet && fleet.vehicles != null && vehicle && vehicle.immatNum.length > 0) {
        const vehicleExists = fleet.vehicles.find(f => f.immatNum === vehicle.immatNum);
        if (vehicleExists == null) {
            fleet.vehicles.push(vehicle);
            return true;
        }
        throw new Error('Vehicle already registered into fleet');
    }
    throw new Error('Cannot register Vehicle')
}

module.exports = {
    registerVehiculeIntoFleet
}