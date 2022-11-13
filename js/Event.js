var _formJob = document.getElementById("form-job");
var _formCoreskills = document.getElementById('form-coreskills');
var _formSkillsContainer = document.getElementById("form-skills-container");
var _formOwnedCoresContainer = document.getElementById("form-owned-cores-container");
var _formImageUploadBoxOpen = document.getElementById("form-image-upload-box-open");
var _formImageUploadBoxClose = document.getElementById("form-image-upload-box-close");
var _formImageUploadBox = document.getElementById("form-image-upload-box");
var _formImageUploadContainer = document.getElementById("form-image-upload-container");
var _formImageUploadSend = document.getElementById("form-image-upload-send");
var _formImageUploadCanvas = document.getElementById("form-image-upload-canvas");
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
 * The event listener for form-image-upload-box-open click
 */
_formImageUploadBoxOpen.addEventListener("click", function () {
    formImageUploadBoxOpenController();
});

/**
 * The event listener for form-image-upload-box-close click
 */
_formImageUploadBoxClose.addEventListener("click", function () {
    formImageUploadBoxCloseController();
});

/**
 * The event listener for form-image-upload-send click
 */
_formImageUploadSend.addEventListener("click", function () {
    formImageUploadSendController();
});

/**
 * The event listener for form-start-calculate click
 */
_formStartCalculate.addEventListener("click", function () {
    formStartCalculateController();
});
