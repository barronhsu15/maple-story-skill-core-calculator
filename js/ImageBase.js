/** 
 * example for convert Image to cv.Mat
 * @returns cv.Mat
 */ 
function convert_image_data_to_opencv_mat(canvas_id){
    return cv.imread(canvas_id);
}


/** 
 * example for convert Image to cv.Mat
 * @returns cv.Mat
 */ 
function get_image_topk_point(src, k, compare=(a, b) => a > b){
    let topk = new util.insert_sort(k);

    for (let row = 0; row < src.rows; row++){
        for (let col = 0; row < src.cols; col++){
            let value = src.row(row).col(col).data32F[0];

            //init point and insert point to topk
            let point = new util.point();
            point.x = col;
            point.y = row;
            point.value = value;
            topk.insert(point);
        }
    }
}


/** 
 * calc two images similarity.
 * @params {cv.Mat} src
 * @params {cv.Mat} templ
 * @params {bool} image_index
 * @params {bool} get_dst
 * @returns cv.Mat or double or [cv.point, double]
 */ 
function image_similarity(src, templ, image_index=false, k=1, get_dst=false){
    let dst = new cv.Mat();
    cv.matchTemplate(src, templ, dst, cv.TM_CCOEFF_NORMED);

    if (get_dst == true){
        return dst;
    }

    let result = cv.minMaxLoc(dst);
    
    dst.delete();

    if (image_index == undefined){
        return result.maxVal;
    }
    else{
        return [result.maxLoc, result.maxVal]
    }
}