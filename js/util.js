var util = {
    /** 
     * 2 dim point and 1 value struct.
     * @params {int/double} x
     * @params {int/double} y
     * @params {any type} value
     */ 
    point : 
    class point{
        constructor(x, y, value){
            this.x = x;
            this.y = y;
            this.value = value;
        }
    },


    /** 
     * limit k object with insert sort.
     * @params {int} k
     * @params {function} compare
     * @params {function} equal
     */ 
    insert_sort : 
    class insert_sort{
        constructor(k, compare=(a, b) => a > b, equal=(a, b) => a == b){
            this.array = new Array();
            this.k = k;
            this.compare = compare;
            this.equal = equal;
        }

        insert(obj){
            let inserted = false;
            for (let i = 0; i < this.array.length; i++){
                if (this.compare(obj, this.array[i])){
                    this.array.splice(i, 0, obj);
                    inserted = true;
                    break;
                }
            }

            if (this.array.length > this.k){
                this.array.pop();
            }

            if (!inserted && this.array.length < this.k){
                this.array.push(obj);
            }
        }

        get(index){
            if (index < 0 || index == undefined){
                return this.array;
            }
            return this.array[index];
        }

        find(obj){
            for (let i = 0; i < this.array.length; i++){
                if (this.equal(obj, this.array[i])){
                    return true;
                }
            }
            return false;
        }

        indexof(obj){
            for (let i = 0; i < this.array.length; i++){
                if (this.equal(obj, this.array[i])){
                    return i;
                }
            }
            return -1;
        }

        length(){
            return this.array.length;
        }
    },


    /** 
     * description
     * @params {array} array
     * @params {any type} target
     * @returns int  if target in array, will return idnex, else return -1
     */ 
    search_array : 
    function search_array(array, target){
        return array.findIndex((e) => e == target);
    }
}
