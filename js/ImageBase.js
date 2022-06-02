/** 
 * get image data of x, y, channel
 * @params {matrix2d} image
 * @params {int} x
 * @params {int} y
 * @params {int} c
 * @returns type
 */ 
function get_image_data(image, x, y, c){
    return image.data[(y * image.width + x) * 4 + c];
}