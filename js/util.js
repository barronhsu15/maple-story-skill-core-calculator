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
     * note:can use binary search in sorted array
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
     * @returns img
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
     * @returns img
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
        if (element.constructor.name === "String"){
            return document.getElementById(element);
        }else{
            return element;
        }
    },


    /**
     * get array std
     * @params {array} array
     * @returns value
     */
    std :
    function std(array) {
        const n = array.length
        const mean = array.reduce((a, b) => a + b) / n
        return Math.sqrt(array.map(x => ((x - mean) ** 2)).reduce((a, b) => a + b) / n)
    },


    /**
     * calc spend time
     * how to use:
     * 1. util.spend_time(() => function_name(params));
     * 2. util.spend_time(() => { return function_name(params) });
     * @params {function} run_function
     * @returns string
     */
    spend_time :
    function spend_time(run_function, format="hms", test_time=undefined) {
        let start_time = Date.now();

        let result = run_function();

        let end_time = Date.now();
        let temp_time = (end_time - start_time) / 1000;
        if (test_time != undefined){
            temp_time = test_time / 1000;
        }

        let time_string = "";

        // process hour
        if (format.indexOf("h") >= 0 && temp_time / 3600 >= 1){
            time_string += `${parseInt(temp_time / 3600)}h`;
            temp_time -= parseInt(temp_time / 3600) * 3600;
        }

        //process minute
        if (format.indexOf("m") >= 0 && temp_time / 60 >= 1){
            time_string += `${parseInt(temp_time / 60)}m`;
            temp_time -= parseInt(temp_time / 60) * 60;
        }

        // process seconds
        if (format.indexOf("s") >= 0){
            time_string += `${util.round(temp_time, 3)}s`;
        }
        
        if (format.indexOf("h") === -1 && format.indexOf("m") === -1 && format.indexOf("s") === -1){
            time_string += `${temp_time * 1000}ms`;
        }

        console.log(time_string);

        return result
    },


    /** 
     * get round
     * @params {number} num
     * @params {number} m
     */ 
    round : 
    function round(num, m){
        return Math.round(num * (10 ** m)) / (10 ** m);
    }
}
