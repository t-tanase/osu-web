
/**
 overide function.prototype.bind for safari
 *
 */
function playList(){
	this.entryList = [];
	this.entryTitleList = [];
};

Object.defineProperty(Function.prototype, 'bind', {
	enumerable: false,
	configurable: true,
	writable: true,
	value: function bind(thisArg) {
		var that = this;
		var args = Array.prototype.slice.call(arguments, 1);
		return function bound() {
			var a = args.concat(Array.prototype.slice.call(arguments));

			if (Object.getPrototypeOf(this) !== bound.prototype) {
				return that.apply(thisArg, a);
			} else {
				switch (a.length) {
				case 0:
					return new that();
				case 1:
					return new that(a[0]);
				case 2:
					return new that(a[0], a[1]);
				case 3:
					return new that(a[0], a[1], a[2]);
				case 4:
					return new that(a[0], a[1], a[2], a[3]);
				case 5:
					return new that(a[0], a[1], a[2], a[3], a[4]);
				case 6:
					return new that(a[0], a[1], a[2], a[3], a[4], a[5]);
				case 7:
					return new that(a[0], a[1], a[2], a[3], a[4], a[5], a[6]);
				case 8:
					return new that(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]);
				case 9:
					return new that(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
				case 10:
					return new that(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9]);
				default:
					throw new Error("myBind not support more than 10 length arguments as Constructor");
				}
			}
		}
	}
});

var userAgent = window.navigator.userAgent.toLowerCase();
var browser;
if (userAgent.indexOf('opera') != -1) {
	  browser= 'opera';
	} else if (userAgent.indexOf('msie') != -1) {
		browser= 'ie';
	} else if (userAgent.indexOf('chrome') != -1) {
		browser= 'chrome';
	}else if (userAgent.indexOf('ipad') != -1 || userAgent.indexOf('iphone') != -1) {
		browser= 'ipad';
	} else if (userAgent.indexOf('safari') != -1) {
		browser= 'safari';
	} else if (userAgent.indexOf('firefox') != -1) {
		browser= 'firefox';
	} else {
		browser= false;
	}


var canvas,bgcanvas,hintcanvas;
var	canvas_context,bgcanvas_ctx,hint_ctx;
var width_num,height_num;
var beatMap;
var targetNum;
var targetObject;
var apearTargetObject=[];
var rad;
var min=0;
var totalScore =0;
var combo=0;
var musicSrc;
var bgImage;
var startFlug=false;
var endFlug=false;
var iPadFlug=false;
var iPadFlug2=false;
var mapLog;
var strokeSpeed=20;
var pekeNum=0;
var hitNum=0;
var goodNum=0;
var perfectNum=0;
var accuracy=0.0;
var args=[];
var hintColor;
var playListObj = new playList();

function beatShoot(){
	var timer;
	var countTimer;
	var bgcountTimer;
	var endTimer;
	var canvasTimer;
	var selectedMusic=null;
	var selectedLevel=null;
	var startButton=null;
	var makeButton=null;
	var changeLevelR=null;
	var changeLevelL=null;
	var changeMusicL=null;
	var changeMusicR=null;
	var changeEntryCount =0;
	var changeLevelCount =0;
	var endButton=null;
	var musicLength=0;
	var videoFlug=false;
	var loadingTimer;

	this.setEntry =function(entry){

		switch (entry) {
		case "race":
			beatMap= new curbyTargetMap();
			break;
		case "steins":
			beatMap= new steinsTargetMap();
			break;
		case "melt":
			beatMap= new meltTargetMap();
			break;
		case "banbe":
			beatMap= new banbeTargetMap();
			break;
		case "ultra":
			beatMap= new ultraTargetMap();
			break;
		case "caruma":
			beatMap= new talesTargetMap();
			break;
		case "connect":
			beatMap= new qbTargetMap();
			break;
		case "butter":
			beatMap= new degimonTargetMap();
			break;
		case "nova":
			beatMap= new novaTargetMap();
			break;
		case "akb":
			beatMap= new akbTargetMap();
			break;
		case "ones":
			beatMap= new onesTargetMap();
			break;
		case "hisyo":
			beatMap= new hisyoTargetMap();
			break;
		default:
			break;
		}
		playListObj.level=beatMap.levelList;
	};

	this.init = function (cElem,bgElem){


		 /*if(userAgent.indexOf('ipad') != -1){
			 $("#appbody").width="900";
			 $("#gamestage").width="900";
			 cElem.width=900;
			 cElem.height=600;
			 bgElem.width=900;
			 bgElem.height=600;
			 $("#stop").css("top","420px");
			}*/

		iPadFlug=false;
		iPadFlug2=false;
		totalScore =0;
		targetObject=null;
		targetNum =0;
		combo=0;
		bgImage =null;
		bgcount=1;
		bgCount2=1;
		changeLevelR=null;
		changeLevelL=null;
		changeMusicL=null;
		changeMusicR=null;
		endFlug=false;
		startFlug=false;
		pekeNum=0;
		hitNum=0;
		goodNum=0;
		perfectNum=0;
		accuracy=0.0;
		canvas =cElem;
		bgcanvas =bgElem;
		canvas_context =canvas.getContext("2d");
		bgcanvas_ctx =bgcanvas.getContext("2d");
		//hint_ctx=hintcanvas.getContext("2d");
		width_num =canvas.width;
		height_num =canvas.height;
		if(targetMode!="offline")targetMode="normal";
		videoFlug=false;
	};

	this.setStartScreen = function(){

		var gradient =canvas_context.createLinearGradient(0,0,width_num,0);
		gradient.addColorStop(0,"white");
		gradient.addColorStop(0.1,"black");
		gradient.addColorStop(0.9,"black");
		gradient.addColorStop(1,"white");
		canvas_context.rect(0,0,width_num,height_num);
		canvas_context.fillStyle=gradient;
		canvas_context.fill();
		canvas_context,shadowBlur=2;
		canvas_context.shadowColor="rgba(255,0,0,0.2)";
		canvas_context.shadowOffsetX=10;
		canvas_context.fillStyle="rgb(247,171,166)";
		canvas_context.font ="bold 150px sans-serif";
		canvas_context.fillText("Osu!",width_num*0.25,height_num*0.45);
		canvas_context.font ="bold 25px sans-serif";
		canvas_context.fillText("ver JS",width_num*0.7,height_num*0.50);
		canvas_context.shadowOffsetX=0;
		canvas_context.fillStyle="white";
		canvas_context.font ="bold 20px sans-serif";
		canvas_context.textBaseline="top";
		var font ="bold 15px sans-serif";
		var tColor="white";
		var line1=height_num*0.60;
		var line2=height_num*0.68;
		var line3=height_num*0.80;
		var buttonSize=22;

		var entryNum= playListObj.entryTitleList.length;
		if(changeEntryCount==-1){
			changeEntryCount=entryNum-1;
		}
		this.setEntry(playListObj.entryList[Math.abs(changeEntryCount%entryNum)]);
		var levelNum=playListObj.level.length;

		if(changeLevelCount==-1){
			changeLevelCount=levelNum-1;
		}
		var musicLineW=0.14;
		canvas_context.fillText("Music",width_num*musicLineW,line1);
		canvas_context.font ="bold 15px sans-serif";
		canvas_context.fillText("Level",width_num*(musicLineW),line2);
		selectedLevel = new menuObject(width_num*0.5, line2, 300, buttonSize, playListObj.level[Math.abs(changeLevelCount%levelNum)], "bold 15px sans-serif", tColor);
		selectedMusic  = new menuObject(width_num*0.5, line1, 300, buttonSize, playListObj.entryTitleList[Math.abs(changeEntryCount%entryNum)], font, tColor);
		changeMusicL = new menuObject(width_num/7+80, line1, buttonSize, buttonSize, "←", font, tColor);
		changeMusicR = new menuObject(width_num*5/7, line1, buttonSize, buttonSize, "→", font, tColor);
		changeLevelL = new menuObject(width_num/7+80, line2, buttonSize, buttonSize, "←", font, tColor);
		changeLevelR = new menuObject(width_num*5/7, line2, buttonSize, buttonSize, "→", font, tColor);
		startButton = new menuObject(width_num/5+30, line3,120, 50, "Start", "bold 50px sans-serif","yellow");
		makeButton = new menuObject(width_num*3/5-30, line3,120, 50, "Make", "bold 50px sans-serif","yellow");
		var propertyName= playListObj.entryList[Math.abs(changeEntryCount%entryNum)]+"_"+playListObj.level[Math.abs(changeLevelCount%levelNum)];
		var bestScore =Number(localStorage.getItem(propertyName));
		var rank =localStorage.getItem(propertyName+"_rank");
		bestsCoreshow =new menuObject(width_num*0.6, height_num*0.75,120, 50, "Best score "+bestScore +" Rank "+rank, "bold 16px sans-serif","pink");
		bestsCoreshow.writeWord();
		selectedMusic.writeCenterWord();
		selectedLevel.writeCenterWord();
		changeLevelL.fillBg("black");
		changeMusicL.fillBg("black");
		changeMusicR.fillBg("black");
		changeLevelR.fillBg("black");
		changeMusicL.writeWord();
		changeMusicR.writeWord();
		changeLevelL.writeWord();
		changeLevelR.writeWord();
		startButton.fillBg("black");
		startButton.writeWord();
		makeButton.fillBg("black");
		makeButton.writeWord();
		canvas_context.textBaseline="alphabetic";

	};


	this.drawResult = function(){
		clearInterval(endTimer);
		$("#map.button").hide();
		for(var j=0;j<beatMap.targetObject.length;j++){
			beatMap.targetObject[j].reset();
		}
		canvas_context.clearRect(0,0,width_num,height_num);
		var countTimer=0;
		var feedTimer =setInterval(function(){
			countTimer+=1;
			canvas_context.fillStyle="rgba(0,0,0,0.1)";
			canvas_context.rect(0,0,width_num+10,height_num+10);
			canvas_context.fill();
			if(musicSrc.volume>0.1)musicSrc.volume-=0.1;
			if(countTimer>=15){
				musicSrc.pause();
				musicSrc.load();
				var font ="bold 30px sans-serif";
				var tColor="white";
				var result = new menuObject(width_num/4,height_num*0.6, 100, 30, "Result", font, tColor);
				var score = new menuObject(width_num*0.7,height_num*0.6, 200, 30, String(totalScore), font, tColor);
				result.writeWord();
				score.writeEndWord();
				var levelNum=playListObj.level.length;
				var propertyName=beatMap.id+"_"+playListObj.level[Math.abs(changeLevelCount%levelNum)];
				var bestScore =Number(localStorage.getItem(propertyName));
				var rankColor="white";

				var accuracyPer =Math.round(accuracy);
				if(accuracyPer<50){rankColor="red"; rank="C";}
				if(accuracyPer>=50 && accuracyPer<70){rankColor="green";rank="B";}
				if(accuracyPer>=70 && accuracyPer<85 || ( accuracyPer>=70 && targetNum*400>totalScore)){rankColor="red";rank="A";}
				if(accuracyPer>=85 && accuracyPer<95 && targetNum*400<=totalScore){rankColor="silver";rank="S";}
				if(accuracyPer>=95 && accuracyPer<100 && targetNum*500<=totalScore){rankColor="gold";rank="SS";}
				if(accuracyPer==100){rankColor="gold";rank="SSS";}
				localStorage.setItem(propertyName+"_rank",rank);
				//localStorage.setItem(propertyName,totalScore);

				var showRank= new menuObject(width_num/4,40, 200, 30, "Rank   " +rank, "bold 60px sans-serif", rankColor);
				showRank.writeWord();

				var AccuracyObj =new menuObject(width_num/4,100, 200, 50, "Accuracy    "+accuracyPer+"%", "bold 20px sans-serif","white");
				AccuracyObj.writeWord();

				var resultNumline=160;
				canvas_context.drawImage(perfetImg,width_num/4,resultNumline,50,50);
				canvas_context.fillText(perfectNum,width_num/4+60,resultNumline+42);
				canvas_context.drawImage(goodImg,width_num/4+100,resultNumline,50,50);
				canvas_context.fillText(goodNum,width_num/4+160,resultNumline+42);
				canvas_context.drawImage(hitImg,width_num/4+200,resultNumline,50,50);
				canvas_context.fillText(hitNum,width_num/4+260,resultNumline+42);
				canvas_context.drawImage(pekeImg,width_num/4+300,resultNumline,50,50);
				canvas_context.fillText(pekeNum,width_num/4+360,resultNumline+42);

				if(bestScore<totalScore){
					var bestScoreHistory = new menuObject(width_num/4,height_num*0.68, 200, 30, "New Record!", font, tColor);
					localStorage.setItem(propertyName,totalScore);
					bestScoreHistory.writeWord();
				}else if(bestScore>=totalScore){
					localStorage.setItem(propertyName,bestScore);
					font ="bold 30px sans-serif";
					var bestScoreHistory = new menuObject(width_num/4,height_num*0.68, 200, 30, "Best score", font, tColor);
					bestScoreHistory.writeWord();
					var bestScoreHistoryScore = new menuObject(width_num*0.7,height_num*(0.68), 200, 30, String(bestScore), font, tColor);
					bestScoreHistoryScore.writeEndWord();
				}
				clearInterval(feedTimer);
				var line2=height_num*(0.8);
				endButton =new menuObject(width_num/3+45, line2,120, 50, "End", "bold 50px sans-serif","yellow");
				endButton.writeWord();
				endFlug=true;
			}
		}, 100);


	};

	this.drawEnd = function(){
		clearInterval(endTimer);
		$("#stop.button").hide();
		this.pause();
		var thisGame= this;
		canvas_context.clearRect(0,0,width_num,height_num);
		var countTimer=0;
		var feedTimer =setInterval(function(){
			countTimer+=1;
			canvas_context.fillStyle="rgba(0,0,0,0.1)";
			canvas_context.rect(0,0,width_num+10,height_num+10);
			canvas_context.fill();
			if(musicSrc.volume>0.1)musicSrc.volume-=0.1;
			if(countTimer>=15){
				musicSrc.pause();
				//musicSrc.load();
				clearInterval(feedTimer);
				var line2=height_num*0.5;
				endButton =new menuObject(width_num/3+45, line2+30,120, 50, "OK", "bold 50px sans-serif","yellow");
				endButton.writeWord();
				endFlug=true;
			}
		}, 100);
	};

	this.menuAction =function(clickEvent){
		if(!startFlug){
		var position = getCursorPosition(clickEvent);
		var entryNum= playListObj.entryTitleList.length;
		var levelNum=playListObj.level.length;

		//play
		if(startButton.isClicked(position.x,position.y)) {
			if(localStorage.getItem(playListObj.entryList[Math.abs(changeEntryCount%entryNum)]+"_0")==null && playListObj.level[Math.abs(changeLevelCount%levelNum)]=="Original"){
			}else{
			this.setMusic(playListObj.entryList[Math.abs(changeEntryCount%entryNum)], playListObj.level[Math.abs(changeLevelCount%levelNum)]);
			if(!iPadFlug)iPadFlug2=false;
			}
		}

		//makeMode
		if(makeButton.isClicked(position.x,position.y)) {
			for(var i=0;i<1000;i++){
			localStorage.removeItem(playListObj.entryList[Math.abs(changeEntryCount%entryNum)]+"_"+i);
			}
			localStorage.removeItem(playListObj.entryList[Math.abs(changeEntryCount%entryNum)]+"_rank");
			localStorage.removeItem(playListObj.entryList[Math.abs(changeEntryCount%entryNum)])+"_playListObj.level[Math.abs(changeLevelCount%levelNum)])";
			targetMode="try";this.setMusic(playListObj.entryList[Math.abs(changeEntryCount%entryNum)], playListObj.level[Math.abs(changeLevelCount%levelNum)]);this.play();if(!iPadFlug)iPadFlug2=false;}

		//changeMugic
		if(changeMusicL.isClicked(position.x,position.y)) {
			changeEntryCount--;
			iPadFlug2=false;
		}
		if(changeMusicR.isClicked(position.x,position.y)) {
			changeEntryCount++;
			iPadFlug2=false;
		}

		//changeLevel
		if(changeLevelL.isClicked(position.x,position.y)) {
			changeLevelCount--;
			iPadFlug2=false;
		}
		if(changeLevelR.isClicked(position.x,position.y)) {
			changeLevelCount++;
			iPadFlug2=false;
		}
		this.setStartScreen();
		canvas.addEventListener("touchstart", function() {
			if(!iPadFlug2){
			//musicSrc.load();
			///musicSrc.play();
			//musicSrc.pause();
			iPadFlug=false;
			iPadFlug2=true;
			}
		},false);

		}

		if(endFlug){
			var position = getCursorPosition(clickEvent);
			endButton.isClicked(position.x,position.y);
			this.init(canvas,bgcanvas);
			this.setStartScreen();
		}

	};

	this.menuSubAction= function (mousemoveEvent){
		if(!startFlug){
		var position = getCursorPosition(mousemoveEvent);
		if(startButton.isClicked(position.x,position.y)){
			this.setStartScreen();
			startButton.fillBg("gray");
			startButton.writeWord();
		}else if(makeButton.isClicked(position.x,position.y)){
			makeButton.fillBg("gray");
			makeButton.writeWord();
		}else if(changeLevelL.isClicked(position.x,position.y)){
			changeLevelL.fillBg("gray");
			changeLevelL.writeWord();
		}else if(changeLevelR.isClicked(position.x,position.y)){
			changeLevelR.fillBg("gray");
			changeLevelR.writeWord();
		}else if(changeMusicL.isClicked(position.x,position.y)){
			changeMusicL.fillBg("gray");
			changeMusicL.writeWord();
		}else if(changeMusicR.isClicked(position.x,position.y)){
			changeMusicR.fillBg("gray");
			changeMusicR.writeWord();
		}else{
			this.setStartScreen();
		}
		}

		if(endFlug){
			var position = getCursorPosition(mousemoveEvent);
			if(endButton.isClicked(position.x,position.y)){
				endButton.textColor="white";
				endButton.writeWord();
			}else{
				endButton.textColor="yellow";
				endButton.writeWord();
			}
		}
	};

	this.setMusic = function(entry,level) {
		var filesource;
		var self=this;
		filesource=beatMap.source;
		if(browser=='ipad' || browser=='safari' || browser=='chrome')musicSrc = new Audio(filesource+".mp3");
		if(browser=='firefox')musicSrc = new Audio(filesource+".ogg");
		//musicSrc= document.getElementById(entry);
		musicSrc.volume = 0.8;
		targetObject =beatMap.set(level);
		targetNum = targetObject.length;
		if(targetMode=="try"){
			musicLength=beatMap.musicRowLength;
		}else{
			musicLength=beatMap.length;
			$("#map.button").text(beatMap.logText);
		//	$(".mapbutton").show();
		}
		if(beatMap.hintColor!=null){hintColor=beatMap.hintColor;}else{
		hintColor="blue";
		}

		startFlug=true;
		this.loadingScreen();
		bgImage= new Image();
		bgImage.src="img/"+beatMap.backgroundImage;
		if(beatMap.videoSource!=null && (browser=="chrome" || browser =="safari") ){
		bgImage =document.getElementById("v");
		bgImage.src=beatMap.videoSource;

		var videoFlugListner=bgImage.addEventListener('canplaythrough', function() {
			videoFlug=true;
			bgImage.volume=0.0;
			bgImage.removeEventListener("canplaythrough",arguments.callee,true);
			musicSrc.load();
			self.play();
			},true);
			bgImage.load();
		}else if(targetMode!="offline"){
			musicSrc.load();
			self.play();
		}else{
			self.play();
		}
		$("#v").hide();
		rad=beatMap.radius;
		};

	this.setEvent =function(){
		var  maker =null;
		maker =new player();
		if(targetMode=='try'){
			if(browser=="ipad"){
				canvas.addEventListener("touchstart",function (event){maker.strokeStart(event);if(endFlug){canvas.removeEventListener("touchstart",arguments.callee,false);}},false);
				canvas.addEventListener("touchend",function (event){maker.strokeEnd(event);if(endFlug){canvas.removeEventListener("touchend",arguments.callee,false);}},false);
				canvas.addEventListener("touchmove",function (event){maker.strokeAction(event);if(endFlug){canvas.removeEventListener("touchmove",arguments.callee,false);}},false);
			}else {
				canvas.addEventListener("mousedown",function (event){maker.strokeStart(event);if(endFlug){canvas.removeEventListener("mousedown",arguments.callee,false);}},false);
				canvas.addEventListener("mouseup",function (event){maker.strokeEnd(event);if(endFlug){canvas.removeEventListener("mouseup",arguments.callee,false);}},false);
				canvas.addEventListener("mousemove",function (event){maker.strokeAction(event);if(endFlug){canvas.removeEventListener("mousemove",arguments.callee,false);}},false);
			}
		}else{
			if(browser=="ipad"){
			canvas.addEventListener("touchstart",function (event){maker.clickAction(event);if(endFlug){canvas.removeEventListener("touchstart",arguments.callee,false);}},false);
			canvas.addEventListener("touchend",function (event){maker.mouseupAction(event);if(endFlug){canvas.removeEventListener("touchend",arguments.callee,false);}},false);
			canvas.addEventListener("touchmove",function (event){maker.moveAction(event);if(endFlug){canvas.removeEventListener("touchmove",arguments.callee,false);}},false);
			}else {
			canvas.addEventListener("mousedown",function (event){maker.clickAction(event);if(endFlug){canvas.removeEventListener("mousedown",arguments.callee,false);}},false);
			canvas.addEventListener("mouseup",function (event){maker.mouseupAction(event);if(endFlug){canvas.removeEventListener("mouseup",arguments.callee,false);}},false);
			canvas.addEventListener("mousemove",function (event){maker.moveAction(event);if(endFlug){canvas.removeEventListener("mousemove",arguments.callee,false);}},false);
			}

			}
	};

	this.loadingScreen =function(){
		canvas_context.shadowOffsetX=0;
		var loadingcount=0;
		loadingTimer=setInterval(
				function(){canvas_context.beginPath();
				canvas_context.clearRect(0,0,width_num,height_num);
				canvas_context.fillStyle='gray';
				canvas_context.font= "bold 100px sans-serif";
		switch (loadingcount%4) {
		case 0:
			canvas_context.fillText("Loading ",width_num/3-30,height_num/2+30);
			break;
		case 1:
			canvas_context.fillText("Loading .",width_num/3-30,height_num/2+30);
			break;
		case 2:
			canvas_context.fillText("Loading ..",width_num/3-30,height_num/2+30);
			break;
		case 3:
			canvas_context.fillText("Loading ...",width_num/3-30,height_num/2+30);
			break;
		default:
			break;
		}
		loadingcount++;
		},100);

	};

	this.play = function() {
			var self=this;

			//online
			if(targetMode!="offline"){
			var eventListner=musicSrc.addEventListener('canplaythrough', function() {
				clearInterval(loadingTimer);
				setTimeout(
						function(){canvas_context.beginPath();
				canvas_context.clearRect(0,0,width_num,height_num);
				canvas_context.fillStyle='gray';
				canvas_context.font= "bold 100px sans-serif";
				canvas_context.fillText("3",width_num/2-30,height_num/2+30);
				},1);


				setTimeout(function(){
					canvas_context.clearRect(0,0,width_num,height_num);
					canvas_context.fillText(2,width_num/2-30,height_num/2+30);
				},500);

				setTimeout(function(){
					canvas_context.clearRect(0,0,width_num,height_num);
					canvas_context.fillText(1,width_num/2-30,height_num/2+30);
				},1000);
				setTimeout(function(){
					canvas_context.clearRect(0,0,width_num,height_num);
					canvas_context.fillText('GO!',width_num/2-60,height_num/2+30);
				},1500);

				setTimeout(function(){
					canvas_context.clearRect(0,0,width_num,height_num);
					/*if(browser=="ipad"){
							this.musicSrc.load();
							$("#v").show();
							$("#v").css("height",height_num);
							$("#v").css("width",width_num);
						}*/

					this.musicSrc.play();
					if(videoFlug)bgImage.play();

					setTimeout(function(){
						if(targetMode!='try'){
						for(var j=0;j<targetNum;j++){
							targetObject[j].set();
							}

					};
						},10);

					self.setEvent();

					if(targetMode!='try'){
					canvasTimer= setInterval(stroke_apear_target, strokeSpeed);
					}else{
						$("#stop").show();
					}

				},1700);

				timer =setInterval(self.pause.bind(self), musicLength+2000);
				bgcountTimer =setInterval(self.bgAnime.bind(self), 100);
				if(targetMode!='try'){
				endTimer =setInterval(self.drawResult.bind(self), musicLength+3000);
				}else{
				endTimer= setInterval(self.drawEnd.bind(self), musicLength+3000);				//endTimer =setInterval(self.drawResult.bind(self), beatMap.length+3000);
				}
				musicSrc.removeEventListener("canplaythrough",arguments.callee,true);
			}, true);


			}else{ //offline
				clearInterval(loadingTimer);
				setTimeout(function(){
					canvas_context.clearRect(0,0,width_num,height_num);
					canvas_context.fillText(2,width_num/2-30,height_num/2+30);
				},500);

				setTimeout(function(){
					canvas_context.clearRect(0,0,width_num,height_num);
					canvas_context.fillText(1,width_num/2-30,height_num/2+30);
				},1000);
				setTimeout(function(){
					canvas_context.clearRect(0,0,width_num,height_num);
					canvas_context.fillText('GO!',width_num/2-60,height_num/2+30);
				},1500);

				setTimeout(function(){
					canvas_context.clearRect(0,0,width_num,height_num);
					/*if(browser=="ipad"){
							this.musicSrc.load();
							$("#v").show();
							$("#v").css("height",height_num);
							$("#v").css("width",width_num);
						}*/
				//	this.musicSrc.play();
					setTimeout(function(){
						if(targetMode!='try'){
						for(var j=0;j<targetNum;j++){
							targetObject[j].set();
							}
					};
						},10);
					self.setEvent();
					canvasTimer= setInterval(stroke_apear_target, strokeSpeed);
				},1700);

				timer =setInterval(self.pause.bind(self), musicLength+2000);
				bgcountTimer =setInterval(self.bgAnime.bind(self), 100);
				if(targetMode!='try'){
				endTimer =setInterval(self.drawResult.bind(self), musicLength+3000);
				}else{
				endTimer= setInterval(self.drawEnd.bind(self), musicLength+3000);				//endTimer =setInterval(self.drawResult.bind(self), beatMap.length+3000);
				}
			}

		};

	this.pause = function(){
			clearInterval(timer);
			clearInterval(countTimer);
			clearInterval(bgcountTimer);
			clearInterval(canvasTimer);
			//musicSrc.pause();
		};

	this.adminPause = function(){
			musicSrc.pause();
		};

	this.resume =function(){
			musicSrc.play();
			countTimer =setInterval(this.count.bind(this), 1000);
		};

	this.count =function(){
			$("#currentTime").empty();
			$("#currentTime").append(musicSrc.currentTime);

		};

		var bgcount=1;
		var bgCount2=1;
		var bgRowWpx;
		var bgRowHpx;
		this.bgAnime =function (){
			var rate =width_num/100;
			if(bgImage instanceof Image){
			bgRowWpx=bgImage.width;
			bgRowHpx=bgImage.height;
			var rateRow =bgRowWpx/100;
			bgcanvas_ctx.drawImage(bgImage,bgCount2,0,bgRowWpx-bgCount2,bgRowHpx,0,0,width_num-bgcount,height_num);
			bgcanvas_ctx.drawImage(bgImage,0,0,bgCount2,bgRowHpx,width_num-10-bgcount,0,bgcount+10,height_num);
			write_score();
			bgcount+=rate;
			bgCount2+=rateRow;
			bgCount2%=bgRowWpx;
			bgcount%=width_num;
			}else{
				bgRowWpx=bgImage.videoWidth;
				bgRowHpx=bgImage.videoHeight;
				var rateRow =bgRowWpx/100;
				bgcanvas_ctx.drawImage(bgImage,0,0,width_num,height_num);
          	//	bgcanvas_ctx.drawImage(bgImage,bgCount2,0,bgRowWpx-bgCount2,bgRowHpx,0,0,width_num-bgcount,height_num);
			//	bgcanvas_ctx.drawImage(bgImage,0,0,bgCount2,bgRowHpx,width_num-10-bgcount,0,bgcount+10,height_num);
				write_score();
				bgcount+=rate;
				bgCount2+=rateRow;
				bgCount2%=bgRowWpx;
				bgcount%=width_num;
			}

		};
	};


 new menuObject(0,0);
function menuObject(x,y,width,height,str,font,tColor){
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
	this.word =str;
	this.font=font;
	this.textColor=tColor;
	this.shape;
	var wasClicked=false;
	menuObject.prototype = {
			writeWord : function (){
				canvas_context.textBaseline="top";

				canvas_context.beginPath();
				canvas_context.lineJoin="round";
				//canvas_context.lineWidth=20;
				this.writeText();
			},

			writeCenterWord : function (){
				canvas_context.textBaseline="top";
				canvas_context.textAlign="center";
				canvas_context.beginPath();
				canvas_context.lineJoin="round";
				//canvas_context.lineWidth=20;
				this.writeText();
			},

			writeEndWord : function (){
				canvas_context.textBaseline="top";
				canvas_context.textAlign="end";
				canvas_context.beginPath();
				canvas_context.lineJoin="round";
				//canvas_context.lineWidth=20;
			    this.writeText();
			},

			writeText :function(){
				canvas_context.fillStyle=this.textColor;
				canvas_context.font= this.font;
				canvas_context.fillText(this.word,this.x,this.y);
				canvas_context.font ="bold 25px sans-serif";
				canvas_context.stroke();
				canvas_context.textBaseline="alphabetic";
				canvas_context.textAlign="start";
			},

			fillBg :function(bgColor){
				canvas_context.beginPath();
				canvas_context.lineJoin="round";
				canvas_context.lineWidth=10;
				canvas_context.strokeStyle=bgColor;
				canvas_context.fillStyle=bgColor;
				canvas_context.rect(this.x,this.y,this.width+5,this.height);
				canvas_context.stroke();
				canvas_context.fill();
			},

			changeWord : function(str){
				this.word=str;
				canvas_context.clearRect(this.x,this.y,this.width,this.height);
				this.writeWord();
			},


			changeFont: function(font){
				this.font =font;
				this.writeWord();
			},

			isClicked : function(x,y){
				if(this.x<=x && this.width+this.x>=x && this.y<=y && this.y+this.height>=y){return true;}
				else{
					return false;
				}
			}

	};

};

//クリック位置の取得
function getCursorPosition(e){
	var x;
	var y;
	if(e.pageX || e.pageY){
		x= e.pageX;
		y =e.pageY;
	}else{// for IE たぶん
		x= e.clientX +document.body.scrollLeft + document.documentElement.scrollLeft;
		y=e.clientY +document.body.scrollTop + document.documentElement.scrollTop;
	}

	x-= canvas.offsetLeft;
	y-=canvas.offsetTop;

	return new position(x,y);
}

function position(x,y){
	this.x=x;
	this.y=y;
}

