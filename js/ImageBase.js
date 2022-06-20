/** 
 * example for convert Image to cv.Mat
 * @returns cv.Mat
 */ 
function convert_image_data_to_opencv_mat(canvas_id){
    return cv.imread(canvas_id);
}


/** 
 * calc two images similarity.
 * @params {cv.Mat} src
 * @params {cv.Mat} templ
 * @returns double or [cv.point, double]
 */ 
function image_similarity(src, templ, image_index=false){
    let dst = new cv.Mat();
    let mask = new cv.Mat();

    cv.matchTemplate(src, templ, dst, cv.TM_CCOEFF_NORMED, mask);

    let result = cv.minMaxLoc(dst, mask);
    
    dst.delete();
    mask.delete();

    if (image_index == undefined){
        return result.maxVal;
    }
    else{
        return [result.maxLoc, result.maxVal]
    }
}