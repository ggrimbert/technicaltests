const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { registerVehiculeIntoFleet, createFleet } = require('../../src/App/register');
const { findVehicleByImmatAndFleet } = require('../../src/Infra/storage/sql-requests-manager');

Given('the fleet of another user', async function () {
	this.secondFleetId = await createFleet('thisisauserid');
});

Given('this vehicle has been registered into the other user\'s fleet', async function () {
	await registerVehiculeIntoFleet(this.secondFleetId, this.vehicle.immatNum);
});



When('I register this vehicle into my fleet', async function () {
	await registerVehiculeIntoFleet(this.fleetId, this.vehicle.immatNum);
});

Then('this vehicle should be part of my vehicle fleet', async function () {
	const vehicle = await findVehicleByImmatAndFleet(this.fleetId, this.vehicle.immatNum);
	assert.deepStrictEqual(vehicle.immatNum, this.vehicle.immatNum);
});

When('I try to register this vehicle into my fleet', function () {
	return registerVehiculeIntoFleet(this.fleet, this.vehicle)
		.catch(err => {
			this.errorMessage = err.message;
			assert.notStrictEqual(this.errorMessage, null);
			assert.notStrictEqual(this.errorMessage, undefined);
		});
});

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
	assert.notStrictEqual(this.errorMessage, null);
	assert.notStrictEqual(this.errorMessage, undefined);
	assert.strictEqual('Vehicle already registered into fleet', this.errorMessage);
});
