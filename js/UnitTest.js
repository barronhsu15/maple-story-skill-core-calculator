unit_test = {
    /** 
     * description
     * @params {type} var1
     * @params {type} var2
     * @returns type
     */ 
    test_image_base_convert_image_data_to_opencv_mat : 
    function test_image_base_convert_image_data_to_opencv_mat(){
        console.log("---start : test_image_base_convert_image_data_to_opencv_mat---");

        let test_image_url = "https://raw.githubusercontent.com/cool9203/maple-story-skill-core-calculator/master/images/core-2.png";
        let img = util.get_image_from_url(test_image_url);

        img.onload = () => {
            let test_canvas = document.createElement("canvas");
            test_canvas.id = "test_canvas";
            document.body.append(test_canvas);
            util.draw_image(img, "test_canvas");
            
            console.assert(convert_image_data_to_opencv_mat("test_canvas").constructor.name == "Mat");
            console.assert(convert_image_data_to_opencv_mat(img).constructor.name == "Mat");
    
            console.log("---end : test_image_base_convert_image_data_to_opencv_mat---");
        };
    },

    /** 
     * description
     * @params {type} var1
     * @params {type} var2
     * @returns type
     */ 
    test_all : 
    function test_all(){
        unit_test.test_image_base_convert_image_data_to_opencv_mat();
    }
}