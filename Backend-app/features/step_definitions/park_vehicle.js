const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Vehicle } = require('../../src/Domain/Vehicle');
const { registerVehiculeIntoFleet, createFleet } = require('../../src/App/register');
const { parkVehicleAtCoordinates } = require('../../src/App/park');
const { purgeDatabase } = require('../../src/Infra/storage/sqlite-storage-service');
const { findVehicleByImmatAndFleet } = require('../../src/Infra/storage/sql-requests-manager');

Given('my fleet', async function () {
	//Clean the database in order to drop all existing records
	await purgeDatabase();
	this.fleetId = await createFleet('thisisauserid');
});

Given('a vehicle', function () {
	const vehicle = new Vehicle();
	vehicle.immatNum = 'thisisanimmatriculation';
	this.vehicle = vehicle;
});

Given('a location', function () {
	this.latitude = 45.764043;
	this.longitude = 4.835659;
	this.altitude = 200;
});


Given('I have registered this vehicle into my fleet', async function () {   
	await registerVehiculeIntoFleet(this.fleetId, this.vehicle.immatNum);
});

Given('my vehicle has been parked into this location', async function () {
	await parkVehicleAtCoordinates(this.fleetId, this.vehicle.immatNum, this.latitude, this.longitude, this.altitude);
});


When('I park my vehicle at this location', async function () {
	await parkVehicleAtCoordinates(this.fleetId, this.vehicle.immatNum, this.latitude, this.longitude, this.altitude);
});


Then('the known location of my vehicle should verify this location', async function () {
	const vehicle = await findVehicleByImmatAndFleet(this.fleetId, this.vehicle.immatNum);
	assert.strictEqual(this.latitude, vehicle.latitude, 'latitude should be the same');
	assert.strictEqual(this.longitude, vehicle.longitude, 'longitude should be the same');
	assert.strictEqual(this.altitude, vehicle.altitude, 'altitude should be the same');
});



When('I try to park my vehicle at this location', async function () {
	await parkVehicleAtCoordinates(this.fleetId, this.vehicle.immatNum, this.latitude, this.longitude, this.altitude).catch(err => {
		this.errorMessage = err.message;
		assert.notStrictEqual(this.errorMessage, null);
		assert.notStrictEqual(this.errorMessage, undefined);
	});
});

Then('I should be informed that my vehicle is already parked at this location', function () {
	assert.notStrictEqual(this.errorMessage, null);
	assert.notStrictEqual(this.errorMessage, undefined);
	assert.strictEqual('Cannot park vehicle twice at same location', this.errorMessage);
});
