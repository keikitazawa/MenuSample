/**
 * options
 * 	btn: element of Hamburger button. :default 'btn_hamburger'
 * 	menu: element of menu area. :default 'menu'
 *  menu_type: distination [left, right]
 *  menu_width: [recommend config] width of menu
 *  menu_zindex [recommend config] z-index value. default 1000.
 *  content: content area. default 'row'
 *  
 */
var CustomSlideMenu = function(options){
	this.o = options;
	
	// メニュー出力方向
	this.direction = ["left", "right", "top", "bottom"];

	// メンバ変数設定
	this.init();
	// ボタン設定
	this.buttonReady();
	// メニュー設定
	this.menuReady();
	// コンテンツ設定
	this.contentsReady();
}

CustomSlideMenu.prototype.init = function() {
	/**
	 * ハンバーガーボタンの設定
	 */
	// オブジェクト名
	if (this.o.btn === undefined){
		this.o.btn = ".btn_hamburger";
	}
	
	/**
	 * メニューの設定
	 */
	// メニューのオブジェクト名
	if (this.o.menu === undefined){
		this.o.menu = ".menu";
	}
	// メニューのオブジェクト名からオーバーレイの名前を取得
	var menuNames = this.o.menu.match(/^[\.\#]\S{1,}/);
	if (menuNames.length > 0){
		this.o.menu_overlay = menuNames[0].slice(1) + "_overlay";
	}else {
		this.o.menu_overlay = "menu_overlay";
	}
	
	// メニューのパターン
	if (this.o.menu_type === undefined || !$.inArray(this.o.menu_type, this.direction)){
		this.o.menu_type = "left";
	}
	// メニュー幅設定
	// 指定がない場合は計測値を取得
	if (this.o.menu_width === undefined){
		if (this.o.menu_type == "left" || this.o.menu_type == "right"){
			this.o.menu_width = $(this.o.menu).width();
		}else {
			this.o.menu_width = $(this.o.menu).height();
		}
	// 設定がある場合は一度設定を入れてからpx変換
	}else {
		if (this.o.menu_type == "left" || this.o.menu_type == "right"){
			$(this.o.menu).width(this.o.menu_width);
			this.o.menu_width = $(this.o.menu).width();
		}else {
			$(this.o.menu).height(this.o.menu_width);
			this.o.menu_width = $(this.o.menu).height();
		}
	}
	// z-index
	if (this.o.menu_zindex === undefined){
		this.o.menu_zindex = 1000;
	}
	// メニューの横幅を明示してpx取得可能にする
	$(this.o.menu).width(this.o.menu_width);

	/**
	 * メインコンテンツ
	 */
	if (this.o.content === undefined){
		this.o.content = ".row";
	}
}

/**
 * ハンバーガーボタンの初期設定
 */
CustomSlideMenu.prototype.buttonReady = function(){
	var root = this;
	// click event
	$(this.o.btn).click(
		function(){
			root.clickButton();
		}
	);
}

/**
 * メニューの初期設定
 */
CustomSlideMenu.prototype.menuReady = function(){
	var root = this;
	$(this.o.menu).css("transition", "all 0.8s");
	
	// 左・右メニューの場合はメニューをマイナス領域に渡す
	if (this.o.menu_type == "left" || this.o.menu_type == "right"){
		$(this.o.menu).css("position", "absolute");
		$(this.o.menu).css("top", "0px");
		$(this.o.menu).css(this.o.menu_type, this.o.menu_width * (-1));
		$(this.o.menu).css("width", this.o.menu_width);
		$(this.o.menu).css("height", "100%");
	}
	if (this.o.menu_type == "top" || this.o.menu_type == "bottom"){
		$(this.o.menu).css("position", "absolute");
		$(this.o.menu).css("left", "0px");
		$(this.o.menu).css(this.o.menu_type, this.o.menu_width * (-1));
		$(this.o.menu).css("width", "100%");
		$(this.o.menu).css("height", "auto");
	}
}

/**
 * コンテンツ部分の初期設定
 */
CustomSlideMenu.prototype.contentsReady = function(){
	var root = this;
	// メニューと同時に動かすためにrelative,overflow,rigth設定が必要
	$(this.o.content).css("position", "relative");
	$(this.o.content).css("overflow", "auto");
	$(this.o.content).css(this.o.menu_type, "0px");
	$(this.o.content).css("transition", "all 0.8s");
	// 横スクロールを表示しないため
	if (this.o.menu_type == "left" || this.o.menu_type == "right"){
		$("body").css("overflow-x", "hidden");
	}
	// 縦スクロールは表示
	// if (this.o.menu_type == "top" || this.o.menu_type == "bottom"){
	// 	$("body").css("overflow-y", "hidden");
	// }
}

/**
 * ボタンクリックの動作
 */
CustomSlideMenu.prototype.clickButton = function(){
	var root = this;
	var overlayHtml 
		= '<div class="' + this.o.menu_overlay + '" '
		+ 'style="width: 100%; height: 100%; '
		+ 'position: fixed; top: 0; left: 0; '
		+ 'background-color: rgba(0,0,0,0.25); '
		+ 'z-index: ' + (this.o.menu_zindex -1) + ';" />';

	// buttonに属性を付与
	$(this.o.btn).toggleClass("active");
	
	// ボタンのクラス判定
	if ($(this.o.btn).hasClass("active")) {
		// メニューを表示
		$(this.o.menu).css(this.o.menu_type, "0px");
		// コンテンツ部分を動かす
		$(this.o.content).css("position", "relative");
		$(this.o.content).css("overflow", "hidden");
		$(this.o.content).css(this.o.menu_type, this.o.menu_width);

		// オーバーレイの設定
		$(this.o.content).before(overlayHtml);
		$("." + this.o.menu_overlay).click(
			function(){
				root.clickButton();
			}
		);
	} else{
		// メニューを非表示
		$(this.o.menu).css(this.o.menu_type, this.o.menu_width * (-1));
		// コンテンツ部分を元に戻す
		$(this.o.content).css("position", "relative");
		$(this.o.content).css("overflow", "auto");
		$(this.o.content).css(this.o.menu_type, "0px");
		// オーバーレイの削除
		$("." + this.o.menu_overlay).remove();
	}
}
