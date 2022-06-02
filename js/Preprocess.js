/** 
 * calc two images cos similarity.
 * formula : dot(image1, image2) / (length(image1) * length(image2))
 * @params {matrix 2d} image1
 * @params {matrix 2d} image2
 * @returns double
 */ 
function image_similarity(image1, image2){
    let l1 = 0;
    let l2 = 0;
    let dot = 0;

    // get sum and dot image vector
    for (let i in image1){
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
 * description
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


function unit_test (){
    // image_similarity
    console.log("cos([1, 2, 3], [1, 2, 3]) =", image_similarity([1, 2, 3], [1, 2, 3]));
    console.log("cos([1, 2, 3], [4, 1, 9]) =", image_similarity([1, 2, 3], [4, 1, 9]));
    console.log("cos([1, 2, 3], [-1, -2, -3]) =", image_similarity([1, 2, 3], [-1, -2, -3]));
}