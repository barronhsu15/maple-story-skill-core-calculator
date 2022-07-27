/** 
 * define const variable
 */ 
let upload_image_array = new Array();
let cut_image_array = new Array();
let upload_image_index = 0;
let cut_image_index = 0;
let first_upload = true;
let upload_image_count_id = "html_upload_image_count";
let cut_image_count_id = "html_cut_image_count";
let src_canvas_id = "html_src_img";
let dst_canvas_id = "html_dst_img";
let cut_canvas_id = "html_cut_img";


/** 
 * change show image array on canvas
 * @params {string} dir need equal in ["sub", "plus"]
 * @params {array} image_array
 * @params {int} image_index
 * @params {string} canvas_id
 * @params {string} image_count_id
 * @returns int
 */ 
function change_image(dir, image_array, image_index, canvas_id, image_count_id){
    switch (dir){
        case "sub":
            if (image_index > 0){
                image_index--;
                draw_image(image_array, image_index, canvas_id, image_count_id);
            }
            break;
        case "plus":
            if (image_index + 1 < image_array.length){
                image_index++;
                draw_image(image_array, image_index, canvas_id, image_count_id);
            }
            break;
    }
    return image_index;
}


/** 
 * show image count at image_count_id
 * @params {array} image_array
 * @params {int} image_index
 * @params {string} image_count_id
 */ 
function show_image_count(image_array, image_index, image_count_id){
    let e = document.getElementById(image_count_id);
    e.innerHTML = `${image_index + 1}/${image_array.length}`;
}


/** 
 * upload image to upload_image_array
 * @params {string} image_uploader_id
 */ 
async function upload_image(image_uploader_id){
    let file_list = document.getElementById(image_uploader_id).files;
    for (let i = 0; i < file_list.length; i++){
        let file = file_list[i];
        let img = await read_image_with_uploader(file);
        upload_image_array.push(img);
    }
    
    if (upload_image_array.length > 0 && first_upload){
        draw_image(upload_image_array, 0, src_canvas_id, upload_image_count_id);
        first_upload = false;
    }
    show_image_count(upload_image_array, upload_image_index, upload_image_count_id);
}


/** 
 * read a image with FileReader
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
 * draw img to canvas with variable target_canvas
 * @params {Image} img
 */ 
function draw_image(image_array, image_index, target_canvas, label_count_id){
    let img = image_array[image_index];
    util.draw_image(img, target_canvas);
    
    if (label_count_id != undefined){
        show_image_count(image_array, image_index, label_count_id);
    }
}


function unit_test (){

}