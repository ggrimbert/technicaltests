#!/usr/bin/env node

const {program} = require('commander');
const { parkVehicleAtCoordinates } = require('./src/App/park');
const {createFleet, registerVehiculeIntoFleet}  = require('./src/App/register');
const process = require('process');

const console = require('console');

program.description('Fleet management application');
program.name('fleet');
program.addHelpCommand(false);

program
	.command('create')
	.argument('<userId>', 'ID of the owner of the fleet.')
	.description('Create a fleet with the owner\'s Id. Returns the fleetId')
	.action((a) => {
		createFleet(a)
			.then(fleetId => {
				console.log(fleetId);
			})
			.catch(error => {
				console.error(error);
			});
	});

program
	.command('register-vehicle')
	.argument('<fleetId>', 'ID of the fleet to associate.')
	.argument('<vehiclePlateNumber>', 'Plate number of the vehicule.')
	.description('Create, if not exists, a vehicule, and associates it to a fleet')
	.action((a, b) => {
		registerVehiculeIntoFleet(a, b)
			.catch(error => {
				console.error(error);
			});
	});

program
	.command('localize-vehicle')
	.argument('<fleetId>', 'ID of the fleet to associate.')
	.argument('<vehiclePlateNumber>', 'Plate number of the vehicule.')
	.argument('lat', 'latitude of the location where the vehicle is parked.')
	.argument('lng', 'longitude of the location where the vehicle is parked.')
	.argument('[alt]', 'altitude of the location where the vehicle is parked.')
	.description('Set the location of a vehicule, already associated to a fleet')
	.action((a, b, c, d, e) => {
		parkVehicleAtCoordinates(a, b, c, d, e)
			.catch(error => {
				console.error(error);
			});
	});

program.parse(process.argv);