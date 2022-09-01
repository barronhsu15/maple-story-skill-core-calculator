const preprocess = {
    /** 
     * define attribute
     */
    html_show_type_row : document.createElement("canvas"),
    html_skill_rect : document.createElement("canvas"),
    html_core : document.createElement("canvas"),
    show_type_row_img : undefined,
    skill_rect_img : undefined,
    core_img : undefined,
    show_type_row_id : "html_show_type_row",
    skill_rect_id : "html_skill_rect",
    core_id : "html_core",
    show_type_row_url : "https://raw.githubusercontent.com/cool9203/maple-story-skill-core-calculator/master/images/split-row-top.png",
    skill_rect_url : "https://raw.githubusercontent.com/cool9203/maple-story-skill-core-calculator/master/images/core-2.png",
    core_url : "https://raw.githubusercontent.com/cool9203/maple-story-skill-core-calculator/master/images/core-3.png",
    image_similar_threshold : 0.2,
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

        preprocess.html_core.style["display"] = "none";
        preprocess.html_core.id = preprocess.core_id;

        document.body.append(preprocess.html_show_type_row);
        document.body.append(preprocess.html_skill_rect);
        document.body.append(preprocess.html_core);

        preprocess.show_type_row_img = util.draw_image_to_canvas_from_url(preprocess.show_type_row_url, preprocess.html_show_type_row);
        preprocess.skill_rect_img = util.draw_image_to_canvas_from_url(preprocess.skill_rect_url, preprocess.html_skill_rect);
        preprocess.core_img = util.draw_image_to_canvas_from_url(preprocess.core_url, preprocess.html_core);

        util.draw_image(preprocess.show_type_row_img, preprocess.show_type_row_id);
        util.draw_image(preprocess.skill_rect_img, preprocess.skill_rect_id);
        util.draw_image(preprocess.core_img, preprocess.core_id);
    },

    
    /**
     * get core list from canvas
     * @params {string} canvas_id
     * @returns array(cv.Mat)
     */
    get_core_list:
    function get_core_list(element){
        let src;
        if (element.constructor.name === "string" || element.constructor.name === "HTMLImageElement"){
            src = convert_image_data_to_opencv_mat(element);
        }
        else {
            throw "need pass canvas id or Image";
        }

        let show_type_row_templ = convert_image_data_to_opencv_mat(preprocess.show_type_row_id);
        let in_core_master = undefined;

        // step 1 - check show_type_row in src
        if (image_similarity(src, show_type_row_templ) >= 0.95){
            console.log("in self matrix");
            in_core_master = false;
        }else{
            console.log("in core master");
            in_core_master = true;
        }

        // step 2 - get core list image at image bottom, if need
        let rect = undefined;
        if (in_core_master == false){
            let maxPoint = image_similarity(src, show_type_row_templ, true)[0];
            rect = image_cut(src, maxPoint.x + 30, maxPoint.y + show_type_row_templ.rows, 605, 85);
        }
        show_type_row_templ.delete();

        // step 3 - get core image list
        let core_templ = convert_image_data_to_opencv_mat(preprocess.core_id);
        let skill_templ = convert_image_data_to_opencv_mat(preprocess.skill_rect_id);
        let cut_image_array = undefined;
        if (in_core_master == false){
            cut_image_array = get_all_similar_region(rect, skill_templ, preprocess.image_similar_threshold, preprocess.image_std);
            rect.delete();
        }else{
            cut_image_array = get_all_similar_region(src, core_templ, preprocess.image_similar_threshold, preprocess.image_std);
        }

        // step 4 - get skill list, if need
        if (in_core_master == true){
            for (let i = 0; i < cut_image_array.length; i++){
                let old_img = cut_image_array[i];
                cut_image_array[i] = get_topk_similar_region(old_img, skill_templ, 1)[0];
                old_img.delete();
            }
        }

        skill_templ.delete();
        core_templ.delete();

        return cut_image_array;
    }
}