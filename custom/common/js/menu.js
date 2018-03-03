$(function() {
	$(".toggle").click(
		function() {
			$(this).toggleClass("active");
			if($(this).hasClass('active')) {
				$('.global_nav').addClass('active');
			} else {
				$('.global_nav').removeClass('active');
			}
		}
	);

	/**
	 * ナビのリンクで子メニューを表示
	 */
	$(".global_nav li a").next().next("a").click(
		function(){
			$(this).prev("ul").toggle();
		}
	);
	$(".global_nav li a").click(
		function(){
			$(this).next("ul").toggle();
		}
	);
});