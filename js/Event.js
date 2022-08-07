var _formJob = document.getElementById("form-job");
var _formCoreskills = document.getElementById('form-coreskills');
var _formSkillsContainer = document.getElementById("form-skills-container");
var _formOwnedCoresContainer = document.getElementById("form-owned-cores-container");

/**
 * Set form-job options
 */
function setFormJob() {
    for (let i in Jobs) {
        let option = document.createElement("option");
        option.setAttribute("value", i);
        option.textContent = Jobs[i].name;
        _formJob.append(option);
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
        let option = document.createElement("option");
        option.setAttribute("value", i);
        option.textContent = Core.perfect[i];
        _formCoreskills.append(option);
    }
}

/**
 * Set form-skills-container checkbox
 * 
 * @param {string} job
 */
function setFormSkillsContainer(job) {
    let div = document.createElement("div");
    div.setAttribute("class", "sub-form-box");

    for (let i = 0; i < Jobs[job].skills.length; i++) {
        let span = document.createElement("span");
        let checkbox = document.createElement("input");
        let label = document.createElement("label");
        let img = document.createElement("img");

        checkbox.setAttribute("id", "form-skill-" + i.toString());
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("value", i);
        checkbox.dataset.name = Jobs[job].skills[i];
        label.setAttribute("for", "form-skill-" + i.toString());
        label.textContent = Jobs[job].skills[i];
        img.setAttribute("src", Jobs[job].skillImagePath.replace("{skill}", Jobs[job].skills[i]));

        span.append(checkbox);
        span.append(label);
        label.append(img);
        div.append(span);

        checkbox.addEventListener("change", function() {  // The event listener
            console.log(this.checked);
            skillsCheckboxController(job, this.dataset.name, this.checked);
        });
    }

    _formSkillsContainer.append(div);
}

/**
 * Set form-owned-cores-container checkbox
 * 
 * @param {string} job
 * @param {string} skill
 */
function setFormOwnedCoresContainer(job, skill) {
    console.log(job);
    console.log(skill);
    let div = document.createElement("div");
    let label = document.createElement("label");
    let details = document.createElement("details");
    let summary = document.createElement("summary");
    let hr = document.createElement("hr");

    label.textContent = skill;
    summary.append(label);
    details.append(summary);
    details.append(hr);
    div.setAttribute("id", "form-owned-core-" + skill);
    div.setAttribute("class", "sub-form-box");

    for (let i = 0; i < Jobs[job].coreskills[skill].length; i++) {
        let span = document.createElement("span");
        let checkbox = document.createElement("input");
        let label = document.createElement("label");
        let img = document.createElement("img");

        checkbox.setAttribute("id", "form-owned-core-" + skill + "-" + i.toString());
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("value", i);
        label.setAttribute("for", "form-owned-core-" + skill + "-" + i.toString());
        label.textContent = Jobs[job].coreskills[skill][i];
        img.setAttribute("src", Jobs[job].coreskillImagePath.replace("{skill}", skill).replace("{core}", Jobs[job].coreskills[skill][i]));

        span.append(checkbox);
        span.append(label);
        label.append(img);

        details.append(span);
    }

    div.append(details);
    _formOwnedCoresContainer.append(div);
}

/**
 * @param {string} job
 * @param {string} skill
 * @param {bool} checked
 */
function skillsCheckboxController(job, skill, checked) {
    let skillsChecked = _formSkillsContainer.querySelectorAll("input[type=checkbox]:checked");
    let skillsUnchecked = _formSkillsContainer.querySelectorAll("input[type=checkbox]:not(:checked)");
    let skillsMax = (parseInt(_formCoreskills.value) + 1) * 3;

    for (let i = 0; i < skillsUnchecked.length; i++) {
        if (skillsChecked.length === skillsMax) {
            skillsUnchecked[i].setAttribute("disabled", "disabled");
        } else {
            skillsUnchecked[i].removeAttribute("disabled");
        }
    }

    if (checked) {
        setFormOwnedCoresContainer(job, skill);
    } else {
        document.getElementById("form-owned-core-" + skill).remove();
    }
}

document.addEventListener("DOMContentLoaded", function() {  // The event listener for DOM ready
    setFormJob();
});

_formJob.addEventListener("change", function() {  // The event listener for form-job change
    let value = this.value;

    if (value === "") {  // not selected
        _formCoreskills.innerHTML = "";  // clear
        _formCoreskills.setAttribute("disabled", "disabled");
        _formSkillsContainer.innerHTML = "";  // clear
        _formOwnedCoresContainer.innerHTML = "";  // clear
    } else {  // selected
        setFormCoreskills(value);
        setFormSkillsContainer(value);
        _formCoreskills.removeAttribute("disabled");
    }
});

_formCoreskills.addEventListener("change", function() {  // The event listener for form-coreskills change
    let skills = _formSkillsContainer.querySelectorAll("input[type=checkbox]");
    
    for (let i = 0; i < skills.length; i++) {
        if (skills[i].checked) {
            skills[i].checked = false;
            skills[i].removeAttribute("disabled");
            skills[i].dispatchEvent(new Event("change"));
        }
    }
});
