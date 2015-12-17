//==============================================================================
// Electoral System Visualization
//
// @description: Module for providing functions to work with model objects
// @author: Elisha Lai
// @version: 1.0 28/11/2015
//==============================================================================

// Enables strict mode
"use strict";

// Establishes a namespace
var electionViz = electionViz || {};

// Creates a model object within the electionViz namespace
electionViz.model = function () {
   var MIN_NUM_CANDIDATES = 2;
   var MAX_NUM_CANDIDATES = 6;
   var MIN_X_COORDINATE = -0.25;
   var MAX_X_COORDINATE = 1.25;
   var MIN_Y_COORDINATE = -0.25;
   var MAX_Y_COORDINATE = 1.25;
   var MAX_SIZE = 250;
   var MIN_NUM_VOTERS = 200;
   var MAX_NUM_VOTERS = 100000;
   var MIN_STANDARD_DEVIATION = 0.1;
   var MAX_STANDARD_DEVIATION = 2;

   var numCandidates = 3;
   var candidatePositions = [
      {x: 0.540, y: 0.530}, 
      {x: 0.130, y: 0.900},
      {x: 0.770, y: 0.360},
   ];
   var sizePerElection = 1;
   var numVotersPerElection = 2000;
   var standardDeviation = 1.0;
   var isSimulating = false;
   var electionsResults = null;  
   var views = [];

   // Returns the range of x-coordinates that can be specified by a
   // candidate position
   function getXCoordinatesRange() {
      return (MAX_X_COORDINATE - MIN_X_COORDINATE);
   } // getXCoordinatesRange

   // Returns the range of y-coordinates that can be specified by a
   // candidate position
   function getYCoordinatesRange() {
      return (MAX_Y_COORDINATE - MIN_Y_COORDINATE);
   } // getYCoordinatesRange

   // Returns the number of candidates used for the elections simulation
   function getNumCandidates() {
      return numCandidates;
   } // getNumCandidates

   // Gets the candidate position in the list of candidate positions
   // at the index 
   function getCandidatePosition(anIndex) {
      return candidatePositions[anIndex];
   } // getCandidatePosition

   // Returns the candidate positions used for the elections simulation
   function getCandidatePositions() {
      return candidatePositions;
   } // getCandidatePositions

   // Returns the size used for the elections simulation
   function getSimulationSize() {
      return Math.floor(MAX_SIZE / sizePerElection);
   } // getSimulationSize

   // Returns the number of voters used for each election simulated
   function getNumVotersPerElection() {
      return numVotersPerElection;
   } // getNumVoters

   // Returns the standard deviation of the voters about the centre
   // of opinion
   function getStandardDeviation() {
      return standardDeviation;
   } // getStandardDeviation

   // Returns whether the model is currently simulating elections for
   // FPTP, Condorcet, Borda, and IRV electoral systems
   function getIsSimulating() {
   	  return isSimulating;
   } // getIsSimulating

   // Returns the simulated elections results
   function getElectionsResults() {
   	  return electionsResults;
   } // getElectionsResults

   // Sets the candidate position in the list of candidate positions
   // at the index 
   function setCandidatePosition(anIndex, aCandidatePosition) {
   	  var newCandidatePosition = {
         x: parseFloat(aCandidatePosition.x),
         y: parseFloat(aCandidatePosition.y)
   	  };
      candidatePositions[anIndex] = newCandidatePosition;
   } // setCandidatePosition

   // Sets the size used for each election simulated to a new size
   function setSizePerElection(aSize) {
      sizePerElection = parseInt(aSize);
   } // setResolution

   // Sets the number of voters used for each election simulated to
   // a new number of voters
   function setNumVotersPerElection(aNumVoters) {
      numVotersPerElection = parseInt(aNumVoters);
   } // setNumVotersPerElection

   // Sets the standard deviation of the voters about the centre of
   // opinion to a new standard deviation
   function setStandardDeviation(aStandardDeviation) {
   	 standardDeviation = parseFloat(aStandardDeviation);
   } // setStandardDeviation

   // Simulates elections for FPTP, Condorcet, Borda, and IRV
   // electoral systems
   function simulateElections() {
      $.ajax({
       	 url: "http://localhost:9000/electionSimulation",
       	 method: "post",
         contentType: "application/json",
         data: JSON.stringify({
          	candidates: candidatePositions,
            size: Math.floor(MAX_SIZE / sizePerElection),
            numVoters: numVotersPerElection,
            sigma: standardDeviation
         }),
         dataType: "json",
         beforeSend: function (aResponse) {
         	isSimulating = true;
         	notifyObservers();
         },
         success: function (aResponse) {
         	isSimulating = false;
         	electionsResults = aResponse;
         	notifyObservers();
         },
         error: function (aResponse) {
         	isSimulating = false;
            console.log(aResponse.responseJSON.message);
         } 
      });
   } // simulateElections

   // Adds a new candidate position to the list of candidate positions
   function addCandidatePosition(aCandidatePosition) {
   	  var newCandidatePosition = {
         x: parseFloat(aCandidatePosition.x),
         y: parseFloat(aCandidatePosition.y)
   	  };
      candidatePositions.push(newCandidatePosition);
      numCandidates += 1;
   } // addCandidatePosition

   // Removes the last candidate position from the list of candidate positions
   function removeCandidatePosition() {
   	  candidatePositions.pop();
   	  numCandidates -= 1;
   } // removeCandidatePosition

   // Adds a view observer to the model
   function addObserver(aView) {
	  views.push(aView);
   } // addObserver

   // Updates all the views observing the model
   function notifyObservers() {
      _.each(views, function (aView) {
         aView.update();
      });
   } // notifyObservers

   // Return public functions
   return {
   	MIN_NUM_CANDIDATES: MIN_NUM_CANDIDATES,
   	MAX_NUM_CANDIDATES: MAX_NUM_CANDIDATES,
   	MIN_X_COORDINATE: MIN_X_COORDINATE,
   	MAX_X_COORDINATE: MAX_X_COORDINATE,
   	MIN_Y_COORDINATE: MIN_Y_COORDINATE,
   	MAX_Y_COORDINATE: MAX_Y_COORDINATE,
   	MAX_SIZE: MAX_SIZE,
   	MIN_NUM_VOTERS: MIN_NUM_VOTERS,
   	MAX_NUM_VOTERS: MAX_NUM_VOTERS,
   	MIN_STANDARD_DEVIATION: MIN_STANDARD_DEVIATION,
   	MAX_STANDARD_DEVIATION: MAX_STANDARD_DEVIATION,
   	getXCoordinatesRange: getXCoordinatesRange,
   	getYCoordinatesRange: getYCoordinatesRange,
   	getNumCandidates: getNumCandidates,
   	getCandidatePosition: getCandidatePosition,
   	getCandidatePositions: getCandidatePositions,
   	getSimulationSize: getSimulationSize,
   	getNumVotersPerElection: getNumVotersPerElection,
   	getStandardDeviation: getStandardDeviation,
   	getIsSimulating: getIsSimulating,
   	getElectionsResults: getElectionsResults,
   	setCandidatePosition: setCandidatePosition,
   	setSizePerElection: setSizePerElection,
   	setNumVotersPerElection: setNumVotersPerElection,
   	setStandardDeviation: setStandardDeviation,
	simulateElections: simulateElections,
	addCandidatePosition: addCandidatePosition,
	removeCandidatePosition: removeCandidatePosition,
	addObserver: addObserver
   };
};
