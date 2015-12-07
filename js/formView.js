//==============================================================================
// Electoral System Visualization
//
// @description: Module for providing functions to work with formView
// objects
// @author: Ah Hoe Lai
// @userid: ahlai
// @version: 1.0 28/11/2015
//==============================================================================

// Enables strict mode
"use strict";

electionViz.formView = function (anID, aModel) {
   var model = aModel;
   var candidatesXCoordinatesTextfields = $("[id$='_x_coordinate_textfield']");
   var candidatesYCoordinatesTextfields = $("[id$='_y_coordinate_textfield']");
   var addCandidateButton = $(anID + " #add_candidate_button")[0];
   var removeCandidateButton = $(anID + " #remove_candidate_button")[0];
   var numVotersTextfield =
      $(anID + " #num_voters_textfield")[0];
   var numVotersErrorMessage =
      $(anID + " #num_voters_error_message");
   var standardDeviationTextfield =
      $(anID + " #standard_deviation_textfield")[0];
   var standardDeviationErrorMessage =
      $(anID + " #standard_deviation_error_message");
   var resolutionDropdown = $(anID + " #resolution_dropdown")[0];
   var simulateButton = $(anID + " #simulate_button")[0];
   
   // Initializes the view
   $("div[id$='_fields']").hide();
   $("div[id$='_fields']").slice(0, model.getNumCandidates()).show();
   for (var i = 0; i < candidatesXCoordinatesTextfields.length; i++) {
      candidatesXCoordinatesTextfields[i].required = true;
      candidatesXCoordinatesTextfields[i].min = model.MIN_X_COORDINATE;
      candidatesXCoordinatesTextfields[i].max = model.MAX_X_COORDINATE;
      candidatesXCoordinatesTextfields[i].step = "any";
   } // for
   for (var i = 0; i < candidatesYCoordinatesTextfields.length; i++) {
      candidatesYCoordinatesTextfields[i].required = true;
      candidatesYCoordinatesTextfields[i].min = model.MIN_Y_COORDINATE;
      candidatesYCoordinatesTextfields[i].max = model.MAX_Y_COORDINATE;
      candidatesYCoordinatesTextfields[i].step = "any";
   } // for
   numVotersTextfield.required = true;
   numVotersTextfield.min = model.MIN_NUM_VOTERS;
   numVotersTextfield.max = model.MAX_NUM_VOTERS;
   numVotersTextfield.step = 1;
   standardDeviationTextfield.required = true;
   standardDeviationTextfield.min = model.MIN_STANDARD_DEVIATION;
   standardDeviationTextfield.max = model.MAX_STANDARD_DEVIATION;
   standardDeviationTextfield.step = "any";
   registerControllers();

   // Registers controllers for each widget
   function registerControllers() {
      addCandidateButton.addEventListener("click", function (e) {
         if (model.getNumCandidates() < model.MAX_NUM_CANDIDATES) {
            var newX =
               generateRandomFloat(model.MIN_X_COORDINATE, model.MAX_X_COORDINATE);
            var newY =
               generateRandomFloat(model.MIN_Y_COORDINATE, model.MAX_Y_COORDINATE);
            model.addCandidatePosition({x: newX, y: newY});
            $("div[id$='_fields']").slice(0, model.getNumCandidates()).show();
         } // if
      });

      remove_candidate_button.addEventListener("click", function (e) {
         if (model.getNumCandidates() > model.MIN_NUM_CANDIDATES) {
            model.removeCandidatePosition();
            $("div[id$='_fields']").slice(model.getNumCandidates()).hide();
         } // if
      });

      simulateButton.addEventListener("click", function (e) {
         clearErrorMessages();

         if (checkCandidatesFieldsValidity() &&
            numVotersTextfield.checkValidity() &&
            standardDeviationTextfield.checkValidity()) {
            
            for (var i = 0; i < model.getNumCandidates(); i++) {
               var newCandidatePosition = {
                  x: candidatesXCoordinatesTextfields[i].value,
                  y: candidatesYCoordinatesTextfields[i].value
               };
               model.setCandidatePosition(i, newCandidatePosition);
            } // for

            model.setNumVotersPerElection(numVotersTextfield.value);
            model.setStandardDeviation(standardDeviationTextfield.value);
            model.setSizePerElection(resolutionDropdown.value);
            model.simulateElections();
         
         } else {
            
            for (var i = 0; i < model.getNumCandidates(); i++) {
               if (!candidatesXCoordinatesTextfields[i].checkValidity()) {
                  var errorMessage =
                     $("<p></p>").text(candidatesXCoordinatesTextfields[i].validationMessage);
                  $("#candidate_" + (i + 1) + "_x_coordinate_error_message").append(errorMessage);
               } // if
            } // for 

            for (var i = 0; i < model.getNumCandidates(); i++) {
               if (!candidatesYCoordinatesTextfields[i].checkValidity()) {
                  var errorMessage =
                     $("<p></p>").text(candidatesYCoordinatesTextfields[i].validationMessage);
                  $("#candidate_" + (i + 1) + "_y_coordinate_error_message").append(errorMessage);
               } // if
            } // for     

            if (!numVotersTextfield.checkValidity()) {
               var errorMessage =
                  $("<p></p>").text(numVotersTextfield.validationMessage);
               numVotersErrorMessage.append(errorMessage);
            } // if

            if (!standardDeviationTextfield.checkValidity()) {
               var errorMessage =
                  $("<p></p>").text(standardDeviationTextfield.validationMessage);
               standardDeviationErrorMessage.append(errorMessage);
            } // if

         } // if
      });
   } // registerControllers

   // Generates a random float between min and max
   function generateRandomFloat(min, max) {
      return (Math.random() * (max - min) + min).toFixed(2)
   } // generateRandomFloat

   // Checks the validity of the candidates fields
   function checkCandidatesFieldsValidity() {
      for (var i = 0; i < model.getNumCandidates(); i++) {
         if (!candidatesXCoordinatesTextfields[i].checkValidity()) {
            return false;
         } // if
      } // for

      for (var i = 0; i < model.getNumCandidates(); i++) {
         if (!candidatesYCoordinatesTextfields[i].checkValidity()) {
            return false;
         } // if
      } // for

      return true;
   } // checkCandidatesFieldsValidity

   // Clears all the error messages from the view
   function clearErrorMessages() {
      $("div[id$='_error_message']").empty();
   } // clearErrorMessages

   // Updates the view using information from the model
   function update() {}

   // Returns public functions
   return {
      update: update
   }
};
