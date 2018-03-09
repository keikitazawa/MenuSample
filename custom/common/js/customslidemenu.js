/**
 * options
 * 	btn: element of Hamburger button. :default 'btn_hamburger'
 * 	menu: element of menu area. :default 'menu'
 *  menu_type: distination [left, right, top]
 *   You can also set buttom, but it does not work well.
 *  menu_width: [recommend config] width of menu
 *  menu_zindex [recommend config] z-index value. default 1000.
 *  content: content area. default 'row'
 *  duration: slide speed(Unit is MilliSeconds). default 700.
 */
var CustomSlideMenu = function(options){
	this.o = options;
	
	// メニュー出力方向
	this.direction = ["left", "right", "top", "bottom"];

	// メンバ変数設定
	this.__init();
	// ボタン設定
	this.__buttonReady();
	// メニュー設定
	this.__menuReady();
	// コンテンツ設定
	// this.__contentsReady();
}
/**
 * 初期処理
 */
CustomSlideMenu.prototype.__init = function() {
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

	// 処理時間を設定
	if (this.o.duration === undefined){
		this.o.duration = 700;
	}
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
CustomSlideMenu.prototype.__buttonReady = function(){
	var root = this;
	// click event
	$(this.o.btn).click(
		function(){
			root.__clickButton();
		}
	);
}

/**
 * メニューの初期設定
 */
CustomSlideMenu.prototype.__menuReady = function(){
	// スライドで要する時間
	$(this.o.menu).css("transition-duration", this.o.duration + "ms");
	// メニューと同時に動かすためにposition,overflow,[left, rigth ,top, bottom]設定が必要
	$(this.o.menu).css("position", "absolute");
	$(this.o.menu).css(this.o.menu_type, this.o.menu_width * (-1));
	$(this.o.menu).hide();

	// メニュー幅を０にする
	if (this.o.menu_type == "left" || this.o.menu_type == "right"){
		$(this.o.menu).css("top", "0px");
		$(this.o.menu).css("width", this.o.menu_width);
		$(this.o.menu).css("height", "100%");
	}
	if (this.o.menu_type == "top" || this.o.menu_type == "bottom"){
		$(this.o.menu).css("left", "0px");
		$(this.o.menu).css("width", "100%");
		$(this.o.menu).css("height", this.o.menu_width);
	}
}

/**
 * コンテンツ部分の初期設定
 */
CustomSlideMenu.prototype.__contentsReady = function(){
	// スライドで要する時間
	$(this.o.content).css("transition-duration", this.o.duration + "ms");
	// メニューと同時に動かすためにposition,overflow,[left, rigth ,top, bottom]設定が必要
	$(this.o.content).css("position", "relative");
	// $(this.o.content).css("overflow", "auto");
	$(this.o.content).css(this.o.menu_type, "0px");
}

/**
 * ボタンクリックの動作
 */
CustomSlideMenu.prototype.__clickButton = function(){
	var root = this;

	// contents側の座標指定をリセット
	this.__contentsReset();
	this.__contentsReady();

	// buttonに属性を付与
	$(this.o.btn).toggleClass("active");
	
	// ボタンのクラス判定
	if ($(this.o.btn).hasClass("active")) {

		// 画面スクロールを止めてメニューのスクロールを発生させる
		$("body").css("overflow", "hidden");
		// 横スクロールを表示しないため
		if (this.o.menu_type == "left" || this.o.menu_type == "right"){
			$(this.o.menu).css("overflow-x", "scroll");
		}
		// 縦スクロールは表示する
		if (this.o.menu_type == "top" || this.o.menu_type == "bottom"){
			$("body").css("overflow", "auto");
			$(this.o.menu).css("overflow-y", "scroll");
		}
		// メニュー表示→アニメーション
		this.__buildOverlay();
		this.__showMenu();
		this.__inMenu();
	} else{

		//debug--
		// 横スクロールを表示しないため
		if (this.o.menu_type == "left" || this.o.menu_type == "right"){
			$("body").css("overflow", "auto");
			$(this.o.menu).css("overflow-x", "auto");
		}
		// 縦スクロールは表示
		if (this.o.menu_type == "top" || this.o.menu_type == "bottom"){
			$("body").css("overflow", "auto");
			$(this.o.menu).css("overflow-y", "auto");
		}

		// メニュー移動→移動中に（非表示＆オーバーレイ削除）
		this.__outMenu();
		setTimeout(
			function(){
				root.__hideMenu();
				root.__removeOverlay();
			},
			root.o.duration
		);
	}
}

/**
 * コンテンツの位置情報の反対側を削除
 */
CustomSlideMenu.prototype.__contentsReset = function(){
	if (this.o.menu_type != "left"){
		$(this.o.content).css("left", "");
	}
	if (this.o.menu_type != "right"){
		$(this.o.content).css("right", "");
	}
	if (this.o.menu_type != "top"){
		$(this.o.content).css("top", "");
	}
	if (this.o.menu_type != "bottom"){
		$(this.o.content).css("bottom", "");
	}
}

/**
 * メニューの物理的表示
 */
CustomSlideMenu.prototype.__showMenu = function(){
	$(this.o.menu).show();
}
/** 
 * メニューのスライドイン
 */
CustomSlideMenu.prototype.__inMenu = function(){
	$(this.o.menu).css(this.o.menu_type, 0);
	$(this.o.content).css("position", "relative");
	$(this.o.content).css("overflow", "hidden");
	$(this.o.content).css(this.o.menu_type, this.o.menu_width);
}
/**
 * メニューのスライドアウト
 */
CustomSlideMenu.prototype.__outMenu = function(){
	$(this.o.menu).css(this.o.menu_type, this.o.menu_width * (-1));
	$(this.o.content).css("position", "relative");
	$(this.o.content).css("overflow", "auto");
	$(this.o.content).css(this.o.menu_type, 0);
}
/** 
 * メニューの物理的非表示
 */
CustomSlideMenu.prototype.__hideMenu = function(){
	$(this.o.menu).hide();
}

/** 
 * オーバーレイの作成
 */
CustomSlideMenu.prototype.__buildOverlay = function(){
	var root = this;
	var overlayHtml 
		= '<div class="' + this.o.menu_overlay + '" '
		+ 'style="width: 100%; height: 100%; '
		+ 'position: fixed; top: 0; left: 0; '
		+ 'background-color: rgba(0,0,0,0.25); '
		+ 'z-index: ' + (this.o.menu_zindex -1) + ';" />';

	// オーバーレイの設定
	$(this.o.content).before(overlayHtml);
	$("." + this.o.menu_overlay).click(
		function(){
			root.__clickButton();
		}
	);
}
/**
 * オーバーレイの削除
 */
CustomSlideMenu.prototype.__removeOverlay = function(){
	$("." + this.o.menu_overlay).remove();
}