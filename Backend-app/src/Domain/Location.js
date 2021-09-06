

class Location {
    _id = '';
    _latitude = 0.0;
    _longitude = 0.0;
    _altitude = 0.0;

    get id() { return this._id;}
    set id(inId) {
    	this._id = inId;
    }

    get latitude() { return this._latitude;}
    set latitude(inLat) {
    	this._latitude = inLat;
    }

    get longitude() { return this._longitude;}
    set longitude(inLon) {
    	this._longitude = inLon;
    }

    get altitude() { return this._altitude;}
    set altitude(inAlt) {
    	this._altitude = inAlt;
    }

}

module.exports.Location = Location;