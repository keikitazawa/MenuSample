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
	right: [設定値] * (-1);	/* 右メニューのみ */
}
```

## 作成予定の拡張機能
- widthが広い時はメニューを常時表示（上下左右に設定可能）
- メニューのスライド以外に、「コンテンツの上に被さる」タイプも設定可能にする


## 未決定事項
- menu.cssファイルの取扱い  
　現行はハンバーガーボタンやメニューのデザインを記述しているが、利用者側でカスタマイズが必要になる部分でもあるので扱いが難しい。
- メニューのデザイン  
  現行では無限階層を意識した記述になっている。ここも利用者側でカスタマイズする必要がある部分なので扱いを考え直す。

- カスタマイズなしで動かせるものと、カスタマイズ方法のドキュメントの作成
