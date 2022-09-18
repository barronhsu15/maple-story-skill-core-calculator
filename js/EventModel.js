/**
 * Set form-job options
 */
 function setFormJob() {
    for (let key in Jobs) {
        let _option = document.createElement("option");
        _option.setAttribute("value", key);
        _option.textContent = Jobs[key].name;
        _formJob.append(_option);
    }
}

/**
 * Set form-coreskills options
 * 
 * @param {string} job
 */
function setFormCoreskills(job) {
    let quantity = Math.floor(Jobs[job].skills.length / Core.skillsInCore);

    for (let i = 0; i < quantity; i++) {
        let _option = document.createElement("option");
        _option.setAttribute("value", i);
        _option.textContent = Core.perfect[i];
        _formCoreskills.append(_option);
    }
}

/**
 * Set form-skills-container checkbox
 * 
 * @param {string} job
 */
function setFormSkillsContainer(job) {
    let _div = document.createElement("div");
    _div.setAttribute("class", "sub-form-box");

    for (let i = 0; i < Jobs[job].skills.length; i++) {
        let _span = document.createElement("span");
        let _checkbox = document.createElement("input");
        let _label = document.createElement("label");
        let _img = document.createElement("img");

        _checkbox.setAttribute("id", "form-skill-" + i.toString());
        _checkbox.setAttribute("type", "checkbox");
        _checkbox.setAttribute("value", i);
        _checkbox.dataset.skill = Jobs[job].skills[i];
        _label.setAttribute("for", "form-skill-" + i.toString());
        _label.textContent = Jobs[job].skills[i];
        _img.setAttribute("src", Jobs[job].skillImagePath.replace("{skill}", Jobs[job].skills[i]));

        _span.append(_checkbox);
        _span.append(_label);
        _label.append(_img);
        _div.append(_span);

        _checkbox.addEventListener("change", function () {  // The event listener for form-skill-* change
            formSkillsCheckboxController(job, this.dataset.skill, this.checked);
        });
    }

    _formSkillsContainer.append(_div);
}

/**
 * Set form-owned-cores-container checkbox
 * 
 * @param {string} job
 * @param {string} skill
 */
function setFormOwnedCoresContainer(job, skill) {
    let _div = document.createElement("div");
    let _label = document.createElement("label");
    let _details = document.createElement("details");
    let _summary = document.createElement("summary");
    let _hr = document.createElement("hr");

    _label.textContent = skill;
    _summary.append(_label);
    _details.append(_summary);
    _details.append(_hr);
    _div.setAttribute("id", "form-owned-core-" + skill);
    _div.setAttribute("class", "sub-form-box");

    for (let i = 0; i < Jobs[job].cores[skill].length; i++) {
        let _span = document.createElement("span");
        let _checkbox = document.createElement("input");
        let _label = document.createElement("label");
        let _img = document.createElement("img");

        _checkbox.setAttribute("id", "form-owned-core-" + skill + "-" + i.toString());
        _checkbox.setAttribute("type", "checkbox");
        _checkbox.setAttribute("value", i);
        _label.setAttribute("for", "form-owned-core-" + skill + "-" + i.toString());
        _label.textContent = Jobs[job].cores[skill][i];
        _img.setAttribute("src", Jobs[job].coreskillImagePath.replace("{skill}", skill).replace("{core}", Jobs[job].cores[skill][i]));

        _span.append(_checkbox);
        _span.append(_label);
        _label.append(_img);

        _details.append(_span);
    }

    _div.append(_details);
    _formOwnedCoresContainer.append(_div);
}

/**
 * Set perfect-cores-container
 * 
 * @param {string} job
 * @param {object[]} perfectCores
 */
function setPerfectCoresContainer(job, perfectCores) {
    for (let i = 0; i < perfectCores.length; i++) {
        let _div = document.createElement("div");
        let _hr = document.createElement("hr");

        for (let key in perfectCores[i]) {
            let _span = document.createElement("span");
            let _label = document.createElement("label");
            let _img = document.createElement("img");

            _label.textContent = Jobs[job].cores[key][perfectCores[i][key]];
            _img.setAttribute("src", Jobs[job].coreskillImagePath.replace("{skill}", key).replace("{core}", Jobs[job].cores[key][perfectCores[i][key]]));

            _label.append(_img);
            _span.append(_label);
            _div.append(_span);
        }

        _perfectCoresContainer.append(_div);
        _perfectCoresContainer.append(_hr);
    }
}
