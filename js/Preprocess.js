const preprocess = {
    /** 
     * define attribute
     */
    html_split_row_top : document.createElement("canvas"),
    html_core : document.createElement("canvas"),
    split_row_top_img : "",
    core_img : "",
    split_row_top_url : "https://raw.githubusercontent.com/cool9203/maple-story-skill-core-calculator/master/images/split-row-top.png",
    core_url : "https://raw.githubusercontent.com/cool9203/maple-story-skill-core-calculator/master/images/core-2.png",


    /** 
     * init Preprocess.js
     */
    init : 
    function init(){
        preprocess.html_split_row_top.style["display"] = "none";
        preprocess.html_split_row_top.id = "html_split_row_top";

        preprocess.html_core.style["display"] = "none";
        preprocess.html_core.id = "html_core";

        document.body.append(preprocess.html_split_row_top);
        document.body.append(preprocess.html_core);

        preprocess.split_row_top_img = util.draw_image_to_canvas_from_url(preprocess.split_row_top_url, preprocess.html_split_row_top);
        preprocess.core_img = util.draw_image_to_canvas_from_url(preprocess.core_url, preprocess.html_core);

        util.draw_image(preprocess.split_row_top_img, preprocess.html_split_row_top);
        util.draw_image(preprocess.core_img, preprocess.html_core);
    },

    
    /**
     * get core list from canvas
     * @params {string} canvas_id
     * @returns array(cv.Mat)
     */
    get_core_list:
    function get_core_list(canvas_id){
        if (typeof (canvas_id) == "string"){
            src = convert_image_data_to_opencv_mat(canvas_id);
        }
        else if (typeof (canvas_id) == "HTMLImageElement"){
            throw "you should input canvas id";
        }

        let split_row_top_templ = convert_image_data_to_opencv_mat("html_split_row_top");
        let core_templ = convert_image_data_to_opencv_mat("html_core");

        // step 1 - get core list image at image bottom
        let maxPoint = image_similarity(src, split_row_top_templ, true)[0];
        let crop = image_cut(src, maxPoint.x + 30, maxPoint.y + split_row_top_templ.rows, 605, 85);
        split_row_top_templ.delete();

        // step 2 - get core image list
        let cut_image_array = get_topk_similar_region(crop, core_templ, 11);
        crop.delete();
        core_templ.delete();

        return cut_image_array;
    }
}
