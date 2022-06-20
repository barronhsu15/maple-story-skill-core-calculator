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
 * description
 * @returns type
 */ 
async function upload_image(image_uploader_id){
    let file_list = document.getElementById(image_uploader_id).files;
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


function unit_test (){

}