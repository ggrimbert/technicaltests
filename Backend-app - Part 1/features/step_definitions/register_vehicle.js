const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Fleet } = require('../../src/Domain/Fleet');
const { Vehicle } = require('../../src/Domain/Vehicle');
const { registerVehiculeIntoFleet } = require('../../src/App/register');
const { findLocationOfVehicle, parkVehicleAtLocation } = require('../../src/App/park');
const { Location } = require('../../src/Domain/Location');

Given('the fleet of another user', function () {
    const fleet = new Fleet();
    fleet.userId = 'thisisanotheruserid';
    this.secondFleet = fleet;
});

Given('this vehicle has been registered into the other user\'s fleet', function () {
    registerVehiculeIntoFleet(this.secondFleet, this.vehicle);
});



When('I register this vehicle into my fleet', function () {
    registerVehiculeIntoFleet(this.fleet, this.vehicle);
});

Then('this vehicle should be part of my vehicle fleet', function () {
    assert.deepStrictEqual(this.fleet.vehicles[0].immatNum, this.vehicle.immatNum);
});

When('I try to register this vehicle into my fleet', function () {
    try {
        registerVehiculeIntoFleet(this.fleet, this.vehicle);
    } catch(err) {
        this.errorMessage = err.message;
    }
});

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
    assert.notStrictEqual(this.errorMessage, null);
    assert.notStrictEqual(this.errorMessage, undefined);
    assert.strictEqual('Vehicle already registered into fleet', this.errorMessage);
});
