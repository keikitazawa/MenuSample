$(function() {
	var menu1 = new CustomSlideMenu(
		{
		 	"btn": ".btn_hamburger", 
		 	"menu": ".left_menu",
			"menu_width": "300px",
			"menu_type": "left"
		}
	);
	var menu2 = new CustomSlideMenu(
		{
			"btn": ".btn_hamburger_right", 
			"menu": ".right_menu",
			"menu_width": "300px",
			"menu_type": "right"
		}
	);
	var menu3 = new CustomSlideMenu(
		{
		 	"btn": ".btn_hamburger_top", 
		 	"menu": ".top_menu",
			"menu_width": "100%",
			"menu_type": "top"
		}
	);
	var menu4 = new CustomSlideMenu(
		{
		 	"btn": ".btn_hamburger_bottom", 
		 	"menu": ".bottom_menu",
			"menu_width": "100%",
			"menu_type": "bottom",
			"is_slide": false
		}
	);
	/**
	 * ナビのリンクで子メニューを表示
	 */
	$("div[class$=menu] li a + ul + a").click(
		function(){
			$(this).prev("ul").toggleClass("active");
			$(this).prev("ul").toggle(
				{
					duration: "slow", 
					done: function(){
						if ($(this).hasClass("active")){
							$(this).next("a").text("-");
						}else {
							$(this).next("a").text("+");
						}
					}
				}
			);
		}
	);
	$("div[class$=menu] li a").click(
		function(){
			$(this).next("ul").toggleClass("active");
			$(this).next("ul").toggle(
				{
					duration: "slow", 
					done: function(){
						if ($(this).hasClass("active")){
							$(this).next("a").text("-");
						}else {
							$(this).next("a").text("+");
						}
					}
				}
			);
		}
	);
});