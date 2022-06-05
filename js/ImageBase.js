/** 
 * define const variable
 */ 
let upload_image_array = new Array();
let image_index = 0;
let target_canvas_id = "html_src_img";


/** 
 * change show image array on canvas
 * @params {string} dir need equal in ["sub", "plus"]
 */ 
function change_image(dir){
    switch (dir){
        case "sub":
            if (image_index > 0){
                image_index--;
                draw_image(upload_image_array[image_index]);
            }
            break;
        case "plus":
            if (image_index + 1 < upload_image_array.length){
                image_index++;
                draw_image(upload_image_array[image_index]);
            }
            break;
    }
}


/** 
 * show image count
 */ 
function show_image_count(){
    let e = document.getElementById("html_image_count");
    e.innerHTML = `${image_index + 1}/${upload_image_array.length}`;
}


/** 
 * example for convert Image to cv.Mat
 * @returns cv.Mat
 */ 
function convert_image_data_to_opencv_mat(){
    return cv.imread(target_canvas_id);
}


/** 
 * get image data of x, y, channel
 * @params {matrix2d} image
 * @params {int} x
 * @params {int} y
 * @params {int} c mean RGBA channel
 * @returns type
 */ 
function get_image_data(img, x, y, c){
    return img.data[(y * img.width + x) * 4 + c];
}


/** 
 * calc two images cos similarity.
 * formula : dot(image1, image2) / (length(image1) * length(image2))
 * @params {matrix 2d} image1
 * @params {matrix 2d} image2
 * @returns double
 */ 
function image_cos_similarity(img1, img2){
    if (img1.length != img2.length){
        throw "two image length not equal";
    }

    let l1 = 0;
    let l2 = 0;
    let dot = 0;

    // get sum and dot image vector
    for (let i = 0; i < img1.length; i++){
        l1 += Math.pow(img1[i], 2);
        l2 += Math.pow(img2[i], 2);
        dot += img1[i] * img2[i];
    }

    // calculator sqrt l1 and l2
    l1 = Math.sqrt(l1);
    l2 = Math.sqrt(l2);

    // return result
    return dot / (l1 * l2);
}


/** 
 * description
 * @returns type
 */ 
async function upload_image(){
    let file_list = document.getElementById("html_image_uploader").files;
    for (let i = 0; i < file_list.length; i++){
        let file = file_list[i];
        let img = await read_image_with_uploader(file);
        upload_image_array.push(img);
    }
    
    if (upload_image_array.length > 0){
        draw_image(upload_image_array[0]);
    }
}


/** 
 * description
 * @params {file} file
 * @returns Image
 */ 
async function read_image_with_uploader(file){
    let img = new Image();

    await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(img.src = fileReader.result);
        fileReader.readAsDataURL(file);
    });

    return img;
}


/** 
 * draw img to canvas with variable target_canvas_id
 * @params {Image} img
 */ 
function draw_image(img){
    let ctx = document.getElementById(target_canvas_id);
    ctx.width = img.width;
    ctx.height = img.height;

    ctx = ctx.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    show_image_count();
}

/** 
 * description
 * @params {file} file
 * @returns Image
 */ 
function search_split_index(){
    /**
     * 想像一張圖被劃分成好幾等分，這些等分的大小split_image一樣。
     * 接著split_image跟這些去做相似度比對，找出得分最高的。
     * 根據得分最高的來做座標微調，微調至滿分的95%~99%即可。
     * 此時就可求出split_image在目標圖片上的座標。
     */
}


function unit_test (){
    // image_cos_similarity
    console.log("cos([1, 2, 3], [1, 2, 3]) =", image_cos_similarity([1, 2, 3], [1, 2, 3]));
    console.log("cos([1, 2, 3], [4, 1, 9]) =", image_cos_similarity([1, 2, 3], [4, 1, 9]));
    console.log("cos([1, 2, 3], [-1, -2, -3]) =", image_cos_similarity([1, 2, 3], [-1, -2, -3]));
}