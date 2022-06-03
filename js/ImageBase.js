/** 
 * get image data of x, y, channel
 * @params {matrix2d} image
 * @params {int} x
 * @params {int} y
 * @params {int} c mean RGBA channel
 * @returns type
 */ 
function get_image_data(image, x, y, c){
    return image.data[(y * image.width + x) * 4 + c];
}


/** 
 * calc two images cos similarity.
 * formula : dot(image1, image2) / (length(image1) * length(image2))
 * @params {matrix 2d} image1
 * @params {matrix 2d} image2
 * @returns double
 */ 
function image_cos_similarity(image1, image2){
    if (image1.length != image2.length){
        throw "two image length not equal";
    }

    let l1 = 0;
    let l2 = 0;
    let dot = 0;

    // get sum and dot image vector
    for (let i = 0; i < image1.length; i++){
        l1 += Math.pow(image1[i], 2);
        l2 += Math.pow(image2[i], 2);
        dot += image1[i] * image2[i];
    }

    // calculator sqrt l1 and l2
    l1 = Math.sqrt(l1);
    l2 = Math.sqrt(l2);

    // return result
    return dot / (l1 * l2);
}


/** 
 * now have bug, need nore time to write.
 * @returns matrix2d
 */ 
function test_matrix2d(){
    let ctx = document.createElement("canvas");
    let img = document.getElementById("test_img");

    ctx.width = img.width;
    ctx.height = img.height;

    ctx = ctx.getContext("2d");
    ctx.drawImage(img, 0, 0);

    return ctx.getImageData(0, 0, img.width, img.height);
}


/** 
 * description
 * @params {type} var1
 * @params {type} var2
 * @returns type
 */ 
async function upload_image(var1){
    let file_list = document.getElementById("html_image_uploader").files;
    for (let i = 0; i < file_list.length; i++){
        let file = file_list[i];
        let img = await read_image(file);
    }
}


/** 
 * description
 * @params {file} file
 * @returns matrix2d
 */ 
async function read_image(file){
    let img = new Image();

    await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(img.src = fileReader.result);
        fileReader.readAsDataURL(file);
    });

    let ctx = document.createElement("canvas");
    ctx.width = img.width;
    ctx.height = img.height;

    ctx = ctx.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    return ctx.getImageData(0, 0, img.width, img.height);
}


function unit_test (){
    // image_cos_similarity
    console.log("cos([1, 2, 3], [1, 2, 3]) =", image_cos_similarity([1, 2, 3], [1, 2, 3]));
    console.log("cos([1, 2, 3], [4, 1, 9]) =", image_cos_similarity([1, 2, 3], [4, 1, 9]));
    console.log("cos([1, 2, 3], [-1, -2, -3]) =", image_cos_similarity([1, 2, 3], [-1, -2, -3]));
}