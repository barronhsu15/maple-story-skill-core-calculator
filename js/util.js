/** 
 * description
 * @params {array} array
 * @params {any type} target
 * @returns int  if target in array, will return idnex, else return -1
 */ 
function search_array(array, target){
    return array.findIndex((e) => e == target);
}