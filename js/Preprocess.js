const preprocess = {
    /** 
     * define attribute
     */
    html_show_type_row : document.createElement("canvas"),
    html_skill_rect : document.createElement("canvas"),
    show_type_row_img : undefined,
    skill_rect_img : undefined,
    show_type_row_id : "html_show_type_row",
    skill_rect_id : "html_skill_rect",
    show_type_row_url : "https://raw.githubusercontent.com/cool9203/maple-story-skill-core-calculator/master/images/split-row-top.png",
    skill_rect_url : "https://raw.githubusercontent.com/cool9203/maple-story-skill-core-calculator/master/images/core-2.png",
    image_similar_threshold : 0.3,
    image_std : 4,


    /** 
     * init Preprocess.js
     */
    init : 
    function init(){
        preprocess.html_show_type_row.style["display"] = "none";
        preprocess.html_show_type_row.id = preprocess.show_type_row_id;

        preprocess.html_skill_rect.style["display"] = "none";
        preprocess.html_skill_rect.id = preprocess.skill_rect_id;

        document.body.append(preprocess.html_show_type_row);
        document.body.append(preprocess.html_skill_rect);

        preprocess.show_type_row_img = util.draw_image_to_canvas_from_url(preprocess.show_type_row_url, preprocess.html_show_type_row);
        preprocess.skill_rect_img = util.draw_image_to_canvas_from_url(preprocess.skill_rect_url, preprocess.html_skill_rect);

        util.draw_image(preprocess.show_type_row_img, preprocess.show_type_row_id);
        util.draw_image(preprocess.skill_rect_img, preprocess.skill_rect_id);
    },

    
    /**
     * get core list from canvas
     * @params {string} canvas_id
     * @returns array(cv.Mat)
     */
    get_core_list:
    function get_core_list(element){
        let src;
        if (element.constructor.name === "String" || element.constructor.name === "HTMLImageElement"){
            src = convert_image_data_to_opencv_mat(element);
        }
        else {
            throw "need pass canvas id or Image";
        }

        let show_type_row_templ = convert_image_data_to_opencv_mat(preprocess.show_type_row_id);

        // step 1 - get core list image at image bottom
        let maxPoint = image_similarity(src, show_type_row_templ, true)[0]; //search show_type_row in self matrix
        let rect = image_cut(src, maxPoint.x + 30, maxPoint.y + show_type_row_templ.rows + 10, 605, 75); //cut image from not using core

        // step 2 - get core image list
        let skill_templ = convert_image_data_to_opencv_mat(preprocess.skill_rect_id);
        let cut_image_array = get_all_similar_region(rect, skill_templ, preprocess.image_similar_threshold, preprocess.image_std);
        
        rect.delete();
        skill_templ.delete();

        return cut_image_array;
    }
}