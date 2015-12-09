//==============================================================================
// Electoral System Visualization
//
// @description: Module for providing functions to work with electionViz objects
// @author: Elisha Lai
// @version: 1.0 28/11/2015
//==============================================================================

// Enables strict mode
"use strict";

// Establishes a namespace
var electionViz = electionViz || {};

$(function() {
   // Creates a model and initializes it
   var model = new electionViz.model();

   // Creates all the views and tells them about model and controller
   var fptpElectoralSystemView = new electionViz.electoralSystemView(
   	  "FPTP", "#fptp_electoral_system_view", model);
   var condorcetElectoralSystemView = new electionViz.electoralSystemView(
   	  "Condorcet", "#condorcet_electoral_system_view", model);
   var bordaElectoralSystemView = new electionViz.electoralSystemView(
   	  "Borda", "#borda_electoral_system_view", model);
   var irvElectoralSystemView = new electionViz.electoralSystemView(
   	  "IRV", "#irv_electoral_system_view", model);
   var formView = new electionViz.formView("#form_view", model);

   // Tells model about all the views
   model.addObserver(fptpElectoralSystemView);
   model.addObserver(condorcetElectoralSystemView);
   model.addObserver(bordaElectoralSystemView);
   model.addObserver(irvElectoralSystemView);
   model.addObserver(formView);

   // Starts the first simulation when the page loads
   model.simulateElections();
});
