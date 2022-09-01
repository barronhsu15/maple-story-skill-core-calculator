/**
 * Initial function
 */
function initController() {
    preprocess.init();
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
 * 
 * @todo
 */
function formImageUploadSendController() {
    let _selectedSkills = _formSkillsContainer.querySelectorAll("input[type=checkbox]:checked");
    let _uploadedImages = _formImageUploadContainer.querySelectorAll("img[src]");
    let job = _formJob.value;
    let ownCoreskillsMatrixList = [];

    Object.values(_uploadedImages).map(function (_uploadedImage) {
        ownCoreskillsMatrixList.push(...preprocess.get_core_list(_uploadedImage));
    });

    Object.values(_selectedSkills).map(function (_selectedSkill) {
        let skill = _selectedSkill.dataset.skill;

        Jobs[job].cores[skill].map(function (core) {
            let coreImageUrl = "https://barronhsu15.github.io/maple-story-skill-core-calculator/" + Jobs[job].coreskillImagePath.replace("{skill}", skill).replace("{core}", core);
            let _img = util.get_image_from_url(coreImageUrl);

            _img.addEventListener("load", function () {
                let template = convert_image_data_to_opencv_mat(this);
                let maxIndex = 0;
                let maxSimilarity = 0.0;
                let maxSimilarityTemplateCore = undefined;
                let maxSimilarityTemplateImg = undefined;

                for (i in ownCoreskillsMatrixList) {
                    let src_g = new cv.Mat();
                    let templ_g = new cv.Mat();

                    //preprocess with laplacian to get high precision.
                    cv.cvtColor(ownCoreskillsMatrixList[i], src_g, cv.COLOR_RGB2GRAY, 0);
                    cv.cvtColor(template, templ_g, cv.COLOR_RGB2GRAY, 0);
                    cv.Laplacian(src_g, src_g, cv.CV_8U, 1, 1, 0, cv.BORDER_DEFAULT);
                    cv.Laplacian(templ_g, templ_g, cv.CV_8U, 1, 1, 0, cv.BORDER_DEFAULT);

                    let similarity = image_similarity(src_g, templ_g);

                    if (similarity > maxSimilarity && similarity > 0.93) {
                        maxIndex = i;
                        maxSimilarity = similarity;
                        maxSimilarityTemplateCore = core;
                        maxSimilarityTemplateImg = this;
                    }
                }

                if (maxSimilarityTemplateCore !== undefined && maxSimilarityTemplateImg !== undefined) {
                    _formOwnedCoresContainer.querySelector("#form-owned-core-" + skill + "-" + maxIndex).checked = true;
                    document.querySelector("#form-owned-core-" + skill + " details").open = true;
                }
            });
        });
    });

    formImageUploadBoxCloseController();
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
