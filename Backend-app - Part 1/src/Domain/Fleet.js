
class Fleet {
    //List of all vehicles
    _vehicles = [];

    _userId = '';

    get vehicles() { return this._vehicles}
    set vehicles(inVehicles) {
        this._vehicles = inVehicles;
    }

    get userId() { return this._userId}
    set userId(inUserId) {
        this._userId = inUserId;
    }
}

module.exports.Fleet = Fleet;