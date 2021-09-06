const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Fleet } = require('../../src/Domain/Fleet');
const { Vehicle } = require('../../src/Domain/Vehicle');
const { registerVehiculeIntoFleet } = require('../../src/App/register');
const { findLocationOfVehicle, parkVehicleAtLocation } = require('../../src/App/park');
const { Location } = require('../../src/Domain/Location');

Given('my fleet', function () {
    const fleet = new Fleet();
    fleet.userId = 'thisisauserid';
    this.fleet = fleet;
});

Given('a vehicle', function () {
    const vehicle = new Vehicle();
    vehicle.immatNum = 'thisisanimmatriculation';
    this.vehicle = vehicle;
});


Given('I have registered this vehicle into my fleet', function () {   
    registerVehiculeIntoFleet(this.fleet, this.vehicle);
});

Given('my vehicle has been parked into this location', function () {
    parkVehicleAtLocation(this.vehicle, this.location);
});


Given('a location', function () {
    const location = new Location();
    location.latitude = 45.764043;
    location.longitude = 4.835659;
    this.location = location;
});


When('I park my vehicle at this location', function () {
    parkVehicleAtLocation(this.vehicle, this.location);
});


Then('the known location of my vehicle should verify this location', function () {
    assert.strictEqual(this.location.latitude, this.vehicle.location.latitude, 'latitude should be the same');
    assert.strictEqual(this.location.longitude, this.vehicle.location.longitude, 'longitude should be the same');
    assert.strictEqual(this.location.altitude, this.vehicle.location.altitude, 'altitude should be the same');
});



When('I try to park my vehicle at this location', function () {
    try {
        parkVehicleAtLocation(this.vehicle, this.location);
    } catch(err) {
        this.errorMessage = err.message;
    }
});

Then('I should be informed that my vehicle is already parked at this location', function () {
    assert.notStrictEqual(this.errorMessage, null);
    assert.notStrictEqual(this.errorMessage, undefined);
    assert.strictEqual('Cannot park vehicle twice at same location', this.errorMessage);
});
