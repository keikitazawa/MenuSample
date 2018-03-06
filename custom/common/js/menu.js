$(function() {
	var vavi = new CustomSlideMenu(
		{
			"btn": ".btn_hamburger", 
			"menu_width": "300px",
			"menu_type": "left"
		}
	);
	/**
	 * ナビのリンクで子メニューを表示
	 */
	$(".menu li a").next().next("a").click(
		function(){
			$(this).prev("ul").toggle("slow");
		}
	);
	$(".menu li a").click(
		function(){
			$(this).next("ul").toggle("slow");
		}
	);
});