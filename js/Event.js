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

/**
 * For development
 * Can be remove
 */
function dev() {
    _formJob.value = "adele";
    _formJob.dispatchEvent(new Event("change"));

    _formCoreskills.value = "1";
    _formCoreskills.dispatchEvent(new Event("change"));

    [0, 2, 3, 4, 5, 6].map(function (x) {
        document.getElementById("form-skill-" + x.toString()).click();
    });

    Object.values(_formOwnedCoresContainer.querySelectorAll("input[type=checkbox]")).map(function (checkbox) {
        checkbox.click();
    });

    _formStartCalculate.click();
}
