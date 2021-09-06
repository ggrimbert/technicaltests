

class Vehicle {
    _immatNum = '';

    //One location by vehicle; it cannot be in two places at the same time
    _location = null;

    get immatNum() { return this._immatNum}
    set immatNum(inImmat) {
        this._immatNum = inImmat;
    }

    get location() { return this._location}
    set location(inLoc) {
        this._location = inLoc;
    }

}

module.exports.Vehicle = Vehicle;