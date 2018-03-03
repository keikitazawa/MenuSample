$(function() {
	/* ナビボタンの挙動 */
	$(".toggle").click(
		function() {
			$(this).toggleClass("active");
			if($(this).hasClass('active')) {
				$('.row').addClass('active');
				$('.global_nav').addClass('active');
			} else {
				$('.global_nav').removeClass('active');
				$('.row').removeClass('active');
			}
		}
	);

	/**
	 * ナビのリンクで子メニューを表示
	 */
	$(".global_nav li a").next().next("a").click(
		function(){
			$(this).prev("ul").toggle("slow");
		}
	);
	$(".global_nav li a").click(
		function(){
			$(this).next("ul").toggle("slow");
		}
	);
});