/**
 * Check if the cores is perfect
 * 
 * @param {string} job
 * @param {object} coresValue
 * @returns {bool}
 */
function checkPerfectCores(job, coresValue) {
    let jobSkillQuantity = Jobs[job].skills.length;
    let jobSkillsQuantity = new Array(jobSkillQuantity).fill(0);
    let coreQuantity = Object.keys(coresValue).length;
    let skillQuantity = coreQuantity / Core.perfectSkills * Core.skillsInCore;
    let count = 0;

    for (key in coresValue) {
        let jobCoreskill = Jobs[job].coreskills[key][coresValue[key]];

        for (let i = 0; i < jobCoreskill.length; i++) {
            jobSkillsQuantity[jobCoreskill[i]]++;
        }
    }

    for (i = 0; i < jobSkillsQuantity.length; i++) {
        count += jobSkillsQuantity[i] === Core.perfectSkills ? 1 : 0;
    }

    return count === skillQuantity;
}

/**
 * Get the core combination of key
 * 
 * @param {string[]} coresKey
 * @param {int} coreQuantity
 * @param {int} i
 * @param {array[]} label
 * @param {string[]} combination
 * @returns {array[]}
 */
function getCoresKeyCombination(coresKey, coreQuantity, i = 0, label = [], combination = []) {
    if (combination.length === coreQuantity) {
        label.push([...combination]);
    } else {
        for (; i < coresKey.length; i++) {
            combination.push(coresKey[i]);
            getCoresKeyCombination(coresKey, coreQuantity, i + 1, label, combination);  // Recursion
            combination.pop();
        }
    }

    return label;
}

/**
 * Get the core combination of value
 * 
 * @param {object} coresValues
 * @param {int} coreQuantity
 * @param {array[]} coresKeyCombination
 * @param {int} i
 * @param {int} j
 * @param {object[]} label
 * @param {object} combination
 * @returns {array[]}
 */
function getCoresValuesCombination(coresValues, coreQuantity, coresKeyCombination, i, j = 0, label = [], combination = {}) {
    for (; j < coresKeyCombination[i].length; j++) {
        let key = coresKeyCombination[i][j];

        for (let k = 0; k < coresValues[key].length; k++) {
            combination[key] = coresValues[key][k];

            if (Object.keys(combination).length === coreQuantity) {
                label.push({...combination});
            }

            getCoresValuesCombination(coresValues, coreQuantity, coresKeyCombination, i, j + 1, label, combination);  // Recursion
            delete combination[key];
        }
    }

    return label;
}

/**
 * Get the perfect cores
 * 
 * @param {string} job
 * @param {int[]} skillValues
 * @param {object} coresValues
 * @returns {object[]}
 */
function getPerfectCores(job, skillValues, coresValues) {
    let coreQuantity = skillValues.length / Core.skillsInCore * Core.perfectSkills;
    let coresKeyCombination = getCoresKeyCombination(Object.keys(coresValues), coreQuantity);
    let coresValuesCombination = [];
    let result = [];

    for (let i = 0; i < coresKeyCombination.length; i++) {
        coresValuesCombination.push(...getCoresValuesCombination(coresValues, coreQuantity, coresKeyCombination, i));
    }

    for (let i = 0; i < coresValuesCombination.length; i++) {
        if (checkPerfectCores(job, coresValuesCombination[i])) {
            result.push(coresValuesCombination[i]);
        }
    }

    return result;
}
