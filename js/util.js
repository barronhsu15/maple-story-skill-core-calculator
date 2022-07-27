const util = {
    /** 
     * 2 dimension point and 1 value struct.
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
                return;
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
     * search a target in array.
     * if target in array, will return idnex, else return -1
     * note:can use binary search when sorted array
     * @params {array} array
     * @params {any type} target
     * @returns int
     */ 
    search_array : 
    function search_array(array, target, sorted=false){
        if (sorted){
            return array.findIndex((e) => e == target);
        }
        return array.findIndex((e) => e == target);
    },


    /**
     * get a image from url
     * @params {string} url
     */
    get_image_from_url : 
    function get_image_from_url(url){
        let img =  new Image();
        img.crossOrigin = "anonymous";
        img.src = url;
        return img;
    },


    /**
     * draw a image to canvas from url's image
     * @params {string} url
     * @params {string or dom_element} canvas
     */
    draw_image_to_canvas_from_url : 
    function draw_image_to_canvas_from_url(url, canvas){
        let img =  new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => util.draw_image(img, canvas);
        img.src = url;
        return img;
    },


    /**
     * draw a image to canvas
     * @params {Image} img 
     * @params {string or dom_element} canvas 
     */
    draw_image : 
    function draw_image(img, canvas){
        let ctx = util.get_dom_element(canvas);
        if (img.constructor.name == "Mat"){
            cv.imshow(canvas, img);
        }else{
            ctx.width = img.width;
            ctx.height = img.height;
        
            ctx = ctx.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
        }
    },


    /**
     * get dom_element with string or dom_element
     * @params {string or dom_element} element 
     * @returns dom_element
     */
    get_dom_element : 
    function get_dom_element(element){
        if (typeof(element) == "string"){
            return document.getElementById(element);
        }else{
            return element;
        }
    }
}
