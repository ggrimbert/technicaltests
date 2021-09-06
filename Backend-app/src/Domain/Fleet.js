
class Fleet {
    //List of all vehicles
    _vehicles = [];

    _userId = '';

    _fleetId = '';

    get vehicles() { return this._vehicles;}
    set vehicles(inVehicles) {
    	this._vehicles = inVehicles;
    }

    get userId() { return this._userId;}
    set userId(inUserId) {
    	this._userId = inUserId;
    }

    get fleetId() { return this._fleetId;}
    set fleetId(inFleetId) {
    	this._fleetId = inFleetId;
    }

    
}

module.exports.Fleet = Fleet;