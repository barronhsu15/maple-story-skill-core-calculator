var _formJob = document.getElementById("form-job");
var _formCoreskills = document.getElementById('form-coreskills');
var _formSkillsContainer = document.getElementById("form-skills-container");
var _formOwnedCoresContainer = document.getElementById("form-owned-cores-container");
var _formStartCalculate = document.getElementById("form-start-calculate");
var _perfectCoresContainer = document.getElementById("perfect-cores-container");

/**
 * The event listener for DOM ready
 */
document.addEventListener("DOMContentLoaded", function () {
    initController();
});

/**
 * The event listener for form-job change
 */
_formJob.addEventListener("change", function () {
    formJobController(this.value);
});

/**
 * The event listener for form-coreskills change
 */
_formCoreskills.addEventListener("change", function () {
    formCoreskillsController();
});

/**
 * The event listener for form-start-calculate click
 */
_formStartCalculate.addEventListener("click", function () {
    formStartCalculateController();
});
