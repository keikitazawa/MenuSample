# カスタムメニュー

## 概要
jQuery必須、bootstrapがあること前提で記述している。
bootstrapがなくてもなんとでもなると思う。

## インストール
htmlに「customslidemenu.js」と「menu.css」
```html
<link rel="stylesheet" href="./common/css/menu.css" />
<script type="text/javascript" src="./common/js/customslidemenu.js"></script>
```
```javascript
var vavi = new CustomSlideMenu(
	{
		"btn": ".btn_hamburger", 
		"menu": ".menu",
		"menu_width": "300px",
		"menu_type": "left",
		"content": ".row"
	}
);
```

## パラメータ
- btn クリックするとメニューが表示される属性。デフォルトは「.btn_hamburger」
- menu メニュー表示の領域の属性。デフォルトは「.menu」
- menu_type メニューが出てくる方向。left,rightのいずれか。デフォルトは「left」
- menu_width メニューの幅。デフォルトはJavaScriptで取れる幅になるので設定することを推奨
- menu_zindex メニューのz-index値。デフォルトは1000。メニューに対して背景になるオーバーレイは設定値-1になる。
- content コンテンツ部分。デフォルトは「.row」
- duration メニューのスライドを実行する時間。長いほどゆっくり行われる。単位はミリ秒。default 700。
- is_slide true:メニューとコンテンツが連動してスライドする。 false:コンテンツは固定でメニューがスライドする。

## 仕様
- ハンバーガーボタンはcss単独による実装
- どこをクリックするとメニューが出るかをbtnで指定する
- メニュー展開時に他をクリックするとメニューが閉じる
- スライドメニューを実現する関係上、以下のcssが適用されているものとする
```css
.row {
	left: -300px;	/* 左メニューの場合のみ。数値はパラメータかjavascriptで取得される値。 */
	right: -300px;	/* 右メニューの場合のみ。数値はパラメータかjavascriptで取得される値 */
	position: relative;
	overflow: hidden;
}
.menu {
	transition: all 0.8s;
	position: absolute;
	top: 0px;
	height: 100%;
	width: [設定値];
	left: [設定値] * (-1);		/* 左メニューのみ */
	right: [設定値] * (-1);		/* 右メニューのみ */
}
```
- スライドメニューを複数作成可能  
  ボタンとメニューをJavaScript側で用意すると実現できる。他のメニューを閉じるまで開かない想定で作成可能。


### ソースの修正により可能な機能
- タブレット・PCなどの横幅の広い画面だけメニューを表示してスマホの幅だけスライドメニューにする機能。   
  PCメニューとスライドするメニューを別途作成することで実現できる。
```html
<div class="left_menu">
	<ul>[スライドメニュー]</ul>
</div>
<div class="row">
	<div class="btn_hamburger"></button>
	<div class="col-sm-3">
		<div class="pc-menu">
			<ul>[PC画面向け固定メニュー]</ul>
		</div>
	</div>
	<div class="col-sm-9">
		[コンテンツ]
	</div>
</row>
```
```css
@media screen and (min-width: 768px){
	div[class=btn_hamburger] {
		display: none;
	}
	.left_menu {
		display: block;
	}
	.pc-menu {
		display: block;
	}
}

@media screen and (max-width: 767px){
	.pc-menu {
		display: none;
	}
}
```
スライドメニューはJavaScript側でcssを操作しているため、cssのメディアクエリでハンバーガーボタンとPC向け画面のメニューを制御すると良い。


## 作成予定の拡張機能
- メニュー移動前～後のイベントの設定

## 未決定事項
- menu.cssファイルの取扱い  
　現行はハンバーガーボタンやメニューのデザインを記述しているが、利用者側でカスタマイズが必要になる部分でもあるので扱いが難しい。
- メニューのデザイン  
  現行では無限階層を意識した記述になっている。ここも利用者側でカスタマイズする必要がある部分なので扱いを考え直す。

- カスタマイズなしで動かせるものと、カスタマイズ方法のドキュメントの作成
