//==============================================================================
// Electoral System Visualization
//
// @description: Module for providing functions to work with electoralSystemView
// objects
// @author: Ah Hoe Lai
// @userid: ahlai
// @version: 1.0 28/11/2015
//==============================================================================

// Enables strict mode
"use strict";

// Establishes a namespace
var electionViz = electionViz || {};

// Creates an electoral system view object within the electionViz namespace
electionViz.electoralSystemView = function (aName, anID, aModel) {
   var name = aName;
   var model = aModel;
   var canvas = $(anID)[0];
   var electionColours = [
      "#B91D47", // Red
      "#009688", // Green
      "#2B5797", // Blue
      "#E3A21A", // Yellow
      "#7E3878", // Purple
      "#DA532C"  // Orange
   ];
   var candidateColours = [
      "#EE1111", // Red
      "#00A300", // Green
      "#2D89EF", // Blue
      "#FFFF00", // Yellow
      "#9F00A7", // Purple
      "#FF8C00"  // Orange
   ];

   // Initializes the view
   canvas.width = model.MAX_SIZE;
   canvas.height = model.MAX_SIZE;

   // Updates the view using information from the model
   function update() {
   	  if (model.getIsSimulating()) {
         $(anID).hide();
         $(".pulse-loader").remove();
         var loadingIndicator = document.createElement("div");
         loadingIndicator.className = "pulse-loader";
         $(anID).after(loadingIndicator);
      } else {
      	 $(anID).show();
      	 $(".pulse-loader").remove();         
      	 displayElectionsResults();
         displayCandidatePositions();
      } // if
   } // update

   // Displays the results of the simulated elections corresponding
   // to the electoral system name
   function displayElectionsResults() {
      var electionsResults = model.getElectionsResults();
      var electoralSystemIndex = electionsResults.electoralSystems.indexOf(name);
   	  var context = canvas.getContext("2d");
   	  context.clearRect(0, 0, canvas.width, canvas.height);

   	  // Election dimensions in terms of pixels 
      var electionWidth = Math.round(canvas.width / model.getSimulationSize());
      var electionHeight = Math.round(canvas.height / model.getSimulationSize());

   	  // Displays the results of the simulated elections corresponding
   	  // to the electoral system name
      for (var i = 0; i < model.getSimulationSize(); i++) {
         for (var j = 0; j < model.getSimulationSize(); j++) {
            var x = Math.round(j * electionWidth);
            var y = Math.round(i * electionHeight);
            var electionResults = electionsResults.results[i][j];
            var electionWinner = electionResults.charAt(electoralSystemIndex);
            context.fillStyle = electionColours[parseInt(electionWinner)];
            context.fillRect(y, x, electionWidth, electionHeight);
         } // for
      } // for
   } // displayElectionsResults

   // Displays the candidate positions of the simulated elections
   // corresponding to the electoral system name
   function displayCandidatePositions() {
      var candidatePositions = model.getCandidatePositions();
      var context = canvas.getContext("2d");
      
      for (var i = 0; i < candidatePositions.length; i++) {
      	 var candidatePosition = candidatePositions[i];
      	 var x = Math.round(((candidatePosition.x - model.MIN_X_COORDINATE) /
      	    model.getXCoordinatesRange()) * canvas.width);
      	 var y = Math.round(((candidatePosition.y - model.MIN_Y_COORDINATE) /
      	    model.getYCoordinatesRange()) * canvas.height);
         context.beginPath();
      	 context.arc(x, y, 5, 0, 2 * Math.PI);
      	 context.fillStyle = candidateColours[i];
      	 context.fill();
      	 context.strokeStyle = "white";
      	 context.lineWidth = 2;
      	 context.stroke();
      } // for
   } // displayCandidatePositions

   // Returns public functions
   return {
      update: update
   };
};
