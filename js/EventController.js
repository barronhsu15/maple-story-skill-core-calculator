/**
 * Initial function
 */
function initController() {
    setFormJob();
}

/**
 * form-job controller
 * 
 * @param {string} job
 */
 function formJobController(job) {
    _formCoreskills.innerHTML = "";  // clear
    _formSkillsContainer.innerHTML = "";  // clear
    _formOwnedCoresContainer.innerHTML = "";  // clear

    if (job === "") {  // not selected
        _formCoreskills.setAttribute("disabled", "disabled");
    } else {  // selected
        setFormCoreskills(job);
        setFormSkillsContainer(job);
        _formCoreskills.removeAttribute("disabled");
    }
}

/**
 * form-coreskills controller
 */
function formCoreskillsController() {
    let _skills = _formSkillsContainer.querySelectorAll("input[type=checkbox]");

    Object.values(_skills).map(function (_skill) {
        if (_skill.checked) {
            _skill.checked = false;
            _skill.removeAttribute("disabled");
            _skill.dispatchEvent(new Event("change"));
        }
    });
}

/**
 * form-skills for checkbox controller
 * 
 * @param {string} job
 * @param {string} skill
 * @param {bool} checked
 */
function formSkillsCheckboxController(job, skill, checked) {
    let _skillsChecked = _formSkillsContainer.querySelectorAll("input[type=checkbox]:checked");
    let _skillsUnchecked = _formSkillsContainer.querySelectorAll("input[type=checkbox]:not(:checked)");
    let skillsMax = (parseInt(_formCoreskills.value) + 1) * Core.skillsInCore;

    if (_skillsChecked.length === skillsMax) {
        _formImageUploadBoxOpen.removeAttribute("disabled");
        _formStartCalculate.removeAttribute("disabled");

        Object.values(_skillsUnchecked).map(function (_skill) {
            _skill.setAttribute("disabled", "disabled");
        });
    } else {
        _formImageUploadBoxOpen.setAttribute("disabled", "disabled");
        _formStartCalculate.setAttribute("disabled", "disabled");

        Object.values(_skillsUnchecked).map(function (_skill) {
            _skill.removeAttribute("disabled");
        });
    }

    if (checked) {
        setFormOwnedCoresContainer(job, skill);
    } else {
        document.getElementById("form-owned-core-" + skill).remove();
    }
}

/**
 * form-image-upload-box-open controller
 */
function formImageUploadBoxOpenController() {
    _formImageUploadBox.removeAttribute("style");
}

/**
 * form-image-upload-box-close controller
 */
function formImageUploadBoxCloseController() {
    _formImageUploadBox.setAttribute("style", "display: none;");
}

/**
 * form-image-upload-send controller
 */
function formImageUploadSendController() {
    _images = _formImageUploadContainer.querySelectorAll("img[src]");

    Object.values(_images).map(function (_image) {
        console.log(_image.src);  // for dev
    });
}

/**
 * form-start-calculate controller
 */
function formStartCalculateController() {
    let _skills = _formSkillsContainer.querySelectorAll("input[type=checkbox]:checked");
    let job = _formJob.value;
    let skillValues = [];
    let coresValues = {};
    let perfectCores = [];

    skillValues = Object.values(_skills).map(function (_skill) {
        let value = _skill.value;
        let skill = _skill.dataset.skill;
        let _cores = document.getElementById("form-owned-core-" + skill).querySelectorAll("input[type=checkbox]:checked");

        coresValues[skill] = Object.values(_cores).map(function (_core) {
            return _core.value;
        });

        return value;
    });

    perfectCores = getPerfectCores(job, skillValues, coresValues);
    _perfectCoresContainer.innerHTML = "";  // clear
    setPerfectCoresContainer(job, perfectCores);
}
