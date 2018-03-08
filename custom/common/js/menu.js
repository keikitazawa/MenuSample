$(function() {
	var menu1 = new CustomSlideMenu(
		{
		 	"btn": ".btn_hamburger", 
		 	"menu": ".menu",
			"menu_width": "300px",
			"menu_type": "left"
		}
	);
	// var menu2 = new CustomSlideMenu(
	// 	{
	// 		"btn": ".btn_hamburger", 
	// 		"menu": ".menu",
	// 		"menu_width": "300px",
	// 		"menu_type": "right"
	// 	}
	// );
	// var menu3 = new CustomSlideMenu(
	// 	{
	// 	 	"btn": ".btn_hamburger", 
	// 	 	"menu": ".menu",
	// 		"menu_width": "100%",
	// 		"menu_type": "top"
	// 	}
	// );
	// var menu4 = new CustomSlideMenu(
	// 	{
	// 	 	"btn": ".btn_hamburger", 
	// 	 	"menu": ".menu",
	// 		"menu_width": "100%",
	// 		"menu_type": "bottom"
	// 	}
	// );
	/**
	 * ナビのリンクで子メニューを表示
	 */
	$(".menu li a + ul + a").click(
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
	$(".menu li a").click(
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