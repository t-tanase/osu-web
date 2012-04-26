/**
 *
 */

		if(userAgent.indexOf('ipad') != -1){
			var meta = document.createElement('meta');
			meta.setAttribute('name', 'viewport');
			meta.setAttribute('content', 'initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, width=device-width');
			//document.getElementsByTagName('head')[0].appendChild(meta);
		}else if(userAgent.indexOf('iphone') != -1){
			var meta = document.createElement('meta');
			meta.setAttribute('name', 'viewport');
			meta.setAttribute('content', 'initial-scale=0.3, minimum-scale=1.0, maximum-scale=1.0, width=device-width');
		//	document.getElementsByTagName('head')[0].appendChild(meta);
		}



 var beatGame;
 var targetMode='normal';
 window.onload = function() {



	 var appCache = window.applicationCache;
	 if(navigator.onLine){}else{alert("オフラインモード[音なし]"); targetMode="offline";}

	 setTimeout(function() {
	        // (1) キャッシュのアップデートを明示的に行う
	        applicationCache.update();
	    }, 5000);

	 appCache.addEventListener('updateready', function() {
		 alert("最新バージョンにアップデートします");
	     appCache.swapCache();
	     location.reload();
	 }, false);


	 document.addEventListener('touchmove',function(ev){
		 ev.preventDefault();
	 },false);

	 document.addEventListener('contextmenu',function(ev){
		 ev.preventDefault();
	 },false);

	 if(Modernizr.canvas){
		 canvasElem =document.getElementById("canvas");
		 bgElem =document.getElementById("bg");
		 hintElem=document.getElementById("bg2");
		 beatGame = new beatShoot();
		 beatGame.init(canvasElem,bgElem);
		 beatGame.setStartScreen();

	 $(document).keypress(function(e){
		 if(e.keyCode=="48"){//した
			 targetMode ='try';
		 }else if(e.keyCode==38){//ue
		 }else if(e.keyCode==39){//migi
			 targetMode ='move';
		 }else if(e.keyCode==37){//migi
			 targetMode ='arc';
		 }
	 });

	 $("#canvas").click(function(e){
			beatGame.menuAction(e);
	 });

	 $("#canvas").mousemove(function(e){
			beatGame.menuSubAction(e);
	 });

	 $("#stop.button").click(function(e){
			beatGame.drawEnd();
			$("#stop.button").hide();
	 });

	 $("#maplog.mapbutton").click(function(e){
			$("#maplog.mapbutton").hide();
			$("#map.button").show();
	 });
	 canvas.addEventListener("touchstart",function (event){beatGame.menuAction(e);},false);
	 canvas.addEventListener("touchstart",function (event){beatGame.menuSubAction(e);},false);


	 }else{
		 alert.log("このブラウザは対応していません。");
	 }

 };

