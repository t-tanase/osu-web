function player(){
	this.x=0;
	this.y=0;
	var strokeStartflug =false;
	var strokeArrayX=[];
	var strokeArrayY=[];
	var startpositionX=0;
	var startpositionY=0;
	var isStroked=false;
	var strokeShowTime;
	var strokeHideTime;
	var preX=0;
	var preY=0;
	var size=1;
	var count1=0;
	var strokeCount=0;
	var clickCount=0;
	this.clickAction =	function (e) {
		var position = getCursorPosition(e);
		strokeStartflug=true;
		var max=apearTargetObject.length;
		if(max!=0){
		for(var i=0;i<max;i++){
			var targetNumber =Number(apearTargetObject[i]);
if((targetObject[targetNumber].apear || targetObject[targetNumber].hintshow) && targetObject[targetNumber].targetType=="normal"){
				var distanceFromCenter = Math.floor(Math.sqrt((position.x-targetObject[targetNumber].x)*(position.x-targetObject[targetNumber].x) +
						(position.y-targetObject[targetNumber].y)*(position.y-targetObject[targetNumber].y) ));
				if( distanceFromCenter<targetObject[targetNumber].r){
					if(Math.abs(targetObject[targetNumber].counter)<6 ){
					targetObject[targetNumber].broken('Perfect!');
					totalScore+=targetObject[targetNumber].score +combo*10;
					perfectNum++;
					accuracy+=(100/targetNum);
					return false;
					}else if(Math.abs(targetObject[targetNumber].counter)<13){
						targetObject[targetNumber].broken('Good!');
						totalScore+=targetObject[targetNumber].score/3 +combo*5;
						goodNum++;
						accuracy+=(100/targetNum)/2;
						return false;
						}else {
							targetObject[targetNumber].broken('Hit!');
							totalScore+=targetObject[targetNumber].score/6 +combo*1;
							hitNum++;
							accuracy+=(100/targetNum)/4;
							return false;
							}
				}
			}
		}
	}
	};
	this.mouseupAction = function (e){
		strokeStartflug=false;
	};

	this.moveAction =	function (e) {
		var position = getCursorPosition(e);
		var max=apearTargetObject.length;
		if(max!=0 &&(strokeStartflug || browser=="ipad")){
		for(var i=0;i<max;i++){
			var targetNumber =Number(apearTargetObject[i]);
			if(targetObject[targetNumber].apear && targetObject[targetNumber].targetType=="move"){
				var distanceFromCenter = Math.floor(Math.sqrt((position.x-targetObject[targetNumber].x)*(position.x-targetObject[targetNumber].x) +
						(position.y-targetObject[targetNumber].y)*(position.y-targetObject[targetNumber].y) ));
				if( distanceFromCenter<targetObject[targetNumber].r){
					targetObject[targetNumber].moving=true;
					targetObject[targetNumber].clickMovingCount++;
					totalScore+=10;
					return false;
				}
			}
			targetObject[targetNumber].moving=false;
		}
	}
	};


	this.strokeStart= function(e){
		var position = getCursorPosition(e);
		makerDraw(position.x, position.y);
		strokeStartflug=true;
		startpositionX = position.x;
		startpositionY = position.y;
		strokeShowTime =Math.floor(musicSrc.currentTime*1000);
	};

	this.strokeEnd= function(e){
		strokeStartflug=false;
		strokeCount=0;
		if(strokeArrayX.length>=0 && strokeArrayX.length<10){
			$("span#log").append("this.targetObject["+count1+"]=new target(width_num*"+startpositionX/width_num+",height_num*"+startpositionY/height_num+",this.radius,"+count1+","+strokeShowTime+");\n");
			localStorage.setItem(beatMap.id+"_"+count1,"normal_"+startpositionX/width_num+"_"+startpositionY/height_num+"_"+strokeShowTime);
		}
		if(strokeArrayX.length>=10){
			$("span#log").append("this.targetObject["+count1+"]=new strokeMoveTarget(width_num*"+startpositionX/width_num+",height_num*"+startpositionY/height_num+",this.radius,"+count1+","+strokeShowTime  +","+Math.floor(musicSrc.currentTime*1000)+",["+strokeArrayX+"],["+strokeArrayY+"]);\n");
			localStorage.setItem(beatMap.id+"_"+count1,"move_"+startpositionX/width_num+"_"+startpositionY/height_num+"_"+strokeShowTime+"_"+Math.floor(musicSrc.currentTime*1000)+"_["+strokeArrayX+"]_["+strokeArrayY+"]");
			}
		strokeArrayX=[];
		strokeArrayY=[];
		count1++;
		strokeShowTime=0;
		canvas_context.clearRect(0,0,width_num,height_num);
		};

	this.strokeAction= function(e){
		if(strokeStartflug){
		var position = getCursorPosition(e);
		makerDraw(position.x, position.y);
		strokeArrayX[strokeCount]=position.x/width_num;
		strokeArrayY[strokeCount]=position.y/height_num;
		strokeCount++;
		isStroked=true;
		}
	};

	function move(nextX,nextY) {
		if(nextX<width_num && nextY<height_num){
			canvas_context.clearRect(preX,preY,size,size);
			canvas_context.drawImage(player,nextX,nextY,size,size);
		}
	}

}


 function stroke_apear_target(){
	var size= apearTargetObject.length;
	canvas_context.clearRect(0,0,width_num,height_num);
	 for(var i=0;i<size;i++){
		 var target=apearTargetObject[i];
		 targetObject[target].stroketar();
	 }
 }

 function delete_from_apearList(tnum){
	 var size= apearTargetObject.length;
	 	for(var i=0;i<size;i++){
	 		if(apearTargetObject[i]==tnum){
	 			apearTargetObject.splice(i,1);
	 		}
	 	}
 }

 function makerDraw(x,y){
	 canvas_context.beginPath();
	 canvas_context.arc(x,y,30,Math.PI*2,false);
	 canvas_context.fillStyle="rgba(200,0,0,0.5)";
	 canvas_context.fill();
 }



//的のオブジェクトクラス
new target(0,0);//dummy
function target(x,y,r,number,showTime){
	this.score=300;
	this.x=x;
	this.y=y;
	this.r=r;
	this.hintRadius=r*2;
	this.targetNumber=number;
	this.rate=10;
	this.showTime=showTime;
	this.targetImg =null;
	this.targetType="normal";
	this.hintTime=800;
	this.hintSpeed=50;
	this.counter=-40;
	var timer;//出現時間
	var moveTimer =-1;//移動用タイマー
	var settingTimer;//待機時間タイマー
	var textTimer;
	this.hintshow=false;
	var isbroken =false;
	var ishidden =false;
	this.apear =false;
	var hintTimer;
	var hitType;
	var hintCircleTimer=false;
	target.prototype ={
			set : function(){
				var hintshowTime=this.showTime-this.hintTime;
				if(this.showTime-this.hintTime<0)hintshowTime=100;
				this.settingTimer=setInterval(this.show.bind(this), this.showTime);
				this.hintTimer=setInterval(this.hint_lead.bind(this), hintshowTime);
			},

			hide : function(){
				this.apear=false;
				this.ishidden=true;
				stroke_peke(this.x, this.y, this.r);
				setTimeout('delete_from_apearList('+this.targetNumber+')',500);
				clearInterval(this.timer);
				clearInterval(this.moveTimer);
				clearInterval(this.settingTimer);
				clearInterval(this.hintTimer);
				pekeNum++;
				combo=0;
			},

			show :function (){
				clearInterval(this.settingTimer);
				clearInterval(this.hintTimer);
				this.counter=0;
				this.apear=true;
				this.hintshow=false;
				this.timer= setInterval(this.hide.bind(this), this.rate*100);
			},

			broken :function (str){
					//clear_target(this.x, this.y, this.r, Math.PI*2);
					clearInterval(this.settingTimer);
					this.hitType=str;
					this.hintshow=false;
					this.apear=false;
					this.isbroken =true;
					write_text(this.x,this.y,this.r,this.hitType);
					setTimeout('delete_from_apearList('+this.targetNumber+')',500);
					clearInterval(this.hintTimer);
					clearInterval(this.timer);
					clearInterval(this.moveTimer);
					combo++;
			},

			hint_lead :function(){
				clearInterval(this.hintTimer);
				apearTargetObject.push(this.targetNumber);
				this.hintshow=true;
				this.hintCircleTimer= setInterval(this.pressCircle.bind(this),this.hintSpeed);
				//stroke_hint(this.x, this.y, this.hintRadius,Math.PI*2);
			},

			pressCircle :function(){
				if(this.hintRadius>this.r){
					this.hintRadius-=this.r/(this.hintTime/this.hintSpeed);
				}else{
					clearInterval(this.hintCircleTimer);
				}
			},

			stroketar :function(){
				this.counter++;
				if(this.hintshow){stroke_hint(this.x, this.y, this.hintRadius, Math.PI*2);stroke_shadow_hint(this.x, this.y, this.r, Math.PI*2);}
				if(this.apear && this.targetImg==null)stroke_target(this.x, this.y, this.r, Math.PI*2);
				if(this.apear && this.targetImg!=null)stroke_targetImg(this.x, this.y, this.r, this.targetImg);
				if(this.isbroken)write_text(this.x,this.y,this.r,this.hitType);
				if(this.ishidden)stroke_peke(this.x, this.y, this.r);
			},

			reset :function(){
				clearInterval(this.settingTimer);
				clearInterval(this.timer);
				clearInterval(this.moveTimer);
				clearInterval(this.hintTimer);
				this.apear=false;
				this.isbroken=false;
				this.hintshow=false;
			}

	};

};

//なぞる的のオブジェクトクラス
new strokeMoveTarget(0,0);//dummy

function strokeMoveTarget(x,y,r,number,showTime,hideTime,arrayX,arrayY){
	this.score=300;
	this.positionListX=arrayX;
	this.positionListY=arrayY;
	this.x=x;
	this.y=y;
	this.r=r;
	this.hintRadius=r*2;
	this.targetNumber=number;
	this.showTime=showTime;
	this.hideTime=hideTime;
	this.rate=10;
	this.moving=false;
	this.clickMovingCount=0;
	this.targetType="move";
	var moveIndexCount=0;
	var moveEnd=false;
	var comboRate=0;
	var hitType2=0;
	var scoreFlug=false;
	var moveSumCount1=Math.floor((this.hideTime-this.showTime)/strokeSpeed)/2;
	var moveSumCount2=Math.floor((this.hideTime-this.showTime)/strokeSpeed);
	strokeMoveTarget.prototype = new target(0,0);//dummy
	strokeMoveTarget.prototype.show = function(){
		this.apear=true;
		clearInterval(this.settingTimer);
		clearInterval(this.hintTimer);
		this.apear=true;
		this.moveTimer =setInterval(this.move.bind(this), strokeSpeed);
		this.hintshow=false;
		this.timer= setInterval(this.hide.bind(this), this.hideTime-this.showTime);
	};

	strokeMoveTarget.prototype.move= function(){
		var positionIndex= Math.floor(moveIndexCount);
		var moveSumCount=Math.floor((this.hideTime-this.showTime)/strokeSpeed);
		var moveStep=this.positionListX.length/moveSumCount;
		this.x=this.positionListX[positionIndex]*width_num;
		this.y=this.positionListY[positionIndex]*height_num;
		moveIndexCount+=moveStep;
		if(moveIndexCount>=this.positionListX.length){this.hide();}
	};

	strokeMoveTarget.prototype.hide = function(){
		this.apear=false;
		this.ishidden=true;
		setTimeout('delete_from_apearList('+this.targetNumber+')',500);
		clearInterval(this.timer);
		clearInterval(this.moveTimer);
	};


	strokeMoveTarget.prototype.stroketar =function(){
		if(this.hintshow){stroke_hint(this.x, this.y, this.hintRadius, Math.PI*2);strokeMove_hint(this.positionListX,this.positionListY,this.r,Math.PI*2);}
		if(this.apear && this.targetImg==null){strokeMove_hint(this.positionListX,this.positionListY,this.r,Math.PI*2);stroke_target(this.x, this.y, this.r, Math.PI*2);}
		if(this.apear && this.targetImg!=null){strokeMove_hint(this.positionListX,this.positionListY,this.r,Math.PI*2);stroke_targetImg(this.x, this.y, this.r, this.targetImg);}
		if(this.moving){hit_moving(this.x,this.y,this.r);}

		if(this.ishidden){

			if(moveEnd && !scoreFlug){
				totalScore+=combo*comboRate;
				if(comboRate!=0){combo++;
					if(comboRate==10){perfectNum++; accuracy+=(100/targetNum);}
						if(comboRate==5){goodNum++; accuracy+=(100/targetNum)/2;}
							if(comboRate==1){hitNum++; accuracy+=(100/targetNum)/4;}
				}
				else{
				 combo=0;
				 pekeNum++;
				}
				scoreFlug=true;
			}

			//var moveSumCount2=Math.floor((this.hideTime-this.showTime)/strokeSpeed);

			if(browser=="ipad")moveSumCount2=moveSumCount1;
			if(this.clickMovingCount>=moveSumCount2*2/3){
				write_text(this.x,this.y,this.r,"Perfect!");
				moveEnd=true;
				comboRate=10;
			}else if(this.clickMovingCount>=moveSumCount2/3){
				write_text(this.x,this.y,this.r,"Good!");
				moveEnd=true;
				comboRate=5;
			}else if(this.clickMovingCount>0){
				write_text(this.x,this.y,this.r,"Hit!");
				moveEnd=true;
				comboRate=1;
			}else {
				stroke_peke(this.x,this.y,this.r);
				moveEnd=true;
				comboRate=0;
			}

		}
	};
}

//動く的の出現
function move_target_show(){
	clearInterval(this.settingTimer);
	stroke_target(this.x, this.y, this.r, Math.PI*2);
	this.moveTimer =setInterval(this.move.bind(this), 100);
	this.timer= setInterval(this.hide.bind(this), this.rate*100);
	this.apear=true;
}

//的の描画
function stroke_target(x,y,r,pai){
	canvas_context.beginPath();
	canvas_context.arc(x,y,r,0,pai,false);
	canvas_context.strokeStyle='black';
	canvas_context.fillStyle='white';
	canvas_context.fill();
	canvas_context.lineWidth=1;
	canvas_context.stroke();
	canvas_context.beginPath();
	var gradient =canvas_context.createRadialGradient(x,y,0.1,x,y,r);
	gradient.addColorStop(0,"blue");
	gradient.addColorStop(1,"white");
	canvas_context.arc(x,y,r*4/7,0,pai,false);
	canvas_context.fillStyle=gradient;
	canvas_context.fill();
	canvas_context.beginPath();
	gradient.addColorStop(0,"red");
	gradient.addColorStop(1,"white");
	canvas_context.fillStyle=gradient;
	canvas_context.arc(x,y,r/3,0,pai,false);
	canvas_context.fill();
}

function stroke_targetImg(x,y,r,img){
	var hen =(2*r/Math.sqrt(2));
	canvas_context.beginPath();
	canvas_context.arc(x,y,r,0,Math.PI*2,false);
	canvas_context.strokeStyle='black';
	canvas_context.fillStyle='white';
	canvas_context.fill();
	canvas_context.lineWidth=1;
	canvas_context.stroke();
	canvas_context.beginPath();
	canvas_context.drawImage(img,x-hen/2,y-hen/2,hen,hen);
}

//的の削除
function clear_target(x,y,r,pai,spin){
	canvas_context.beginPath();
	canvas_context.clearRect(x-r-1,y-r-1,r*2+3,r*2+3);
	canvas_context.fill();
}

function stroke_peke(x,y,r){
	//clear_target(x, y, r, Math.PI, false);
	canvas_context.beginPath();
	var dx=x;
	var dy=y;
	//canvas_context.drawImage(pekeImg,x-r/2,y-r/2);
	canvas_context.strokeStyle="red";
	canvas_context.lineWidth=3;
	canvas_context.lineCap="round";
	canvas_context.moveTo(dx-r/2,dy-r/2);
	canvas_context.lineTo(dx+r/2,dy+r/2);
	canvas_context.moveTo(dx-r/2,dy+r/2);
	canvas_context.lineTo(dx+r/2+0.5,dy-r/2);
	canvas_context.stroke();
	//canvas_context.endPath();

}

var perfetImg= new Image();
perfetImg.src="img/perfect.gif";
var goodImg= new Image();
goodImg.src="img/good.gif";
var hitImg= new Image();
hitImg.src="img/hit.gif";
var pekeImg= new Image();
pekeImg.src="img/peke.gif";
function write_text(x,y,r,str){
	canvas_context.beginPath();
	var hen =100;
	if(str=='Perfect!'){
		canvas_context.drawImage(perfetImg,x-hen/2,y-hen/2,hen,hen);
	}
	if(str=='Good!'){
		canvas_context.drawImage(goodImg,x-hen/2,y-hen/2,hen,hen);
		}
	if(str=='Hit!'){
		canvas_context.drawImage(hitImg,x-hen/2,y-hen/2,hen,hen);
	}
	//canvas_context.font= "bold 20px sans-serif";
	//canvas_context.fillText(str,x-r/3,y+r/3);
}

function hit_moving(x,y,r){
	canvas_context.beginPath();
	canvas_context.lineWidth=5;
	canvas_context.strokeStyle="rgb(123,255,123)";
	canvas_context.arc(x,y,r*2,Math.PI*2,false);
	canvas_context.stroke();
	canvas_context.lineWidth=1;
}

function write_score(){
	var height_under=12;
	bgcanvas_ctx.beginPath();
	bgcanvas_ctx.fillStyle='rgb(255,200,0)';
	bgcanvas_ctx.font= "bold 25px sans-serif";
	bgcanvas_ctx.textAlign="end";
	bgcanvas_ctx.fillText("Score "+totalScore,width_num-10,20);
	bgcanvas_ctx.fillText("Combo "+combo,width_num-10,40);
	bgcanvas_ctx.textAlign="start";
}

function stroke_hint(x,y,r,pai){
	canvas_context.beginPath();
	canvas_context.strokeStyle=hintColor;
	canvas_context.arc(x,y,r,pai,false);
	canvas_context.stroke();
}

function stroke_shadow_hint(x,y,r,pai){
	canvas_context.beginPath();
	canvas_context.strokeStyle="rgba(0,0,255,0.2)";
	canvas_context.fillStyle="rgba(0,0,255,0.2)";
	canvas_context.arc(x,y,r,pai,false);
	canvas_context.stroke();
	canvas_context.fill();
}

function strokeMove_hint(listX,listY,r,pai){
	canvas_context.beginPath();
	canvas_context.strokeStyle="rgba(255,125,0,0.6)";
	canvas_context.fillStyle="rgba(125,255,0,0.6)";
	canvas_context.moveTo(listX[0]*width_num,listY[0]*height_num);
	for(var j=1;j<listX.length;j+=5){
	canvas_context.lineTo(listX[j]*width_num,listY[j]*height_num);
	//canvas_context.arc(listX[j],listY[j],r,Math.PI*2,false);
	}
	canvas_context.lineWidth=50;
	//canvas_context.fill();
	canvas_context.stroke();
	canvas_context.lineWidth=1;
}

var hintSize=2.0;
function stroke_hint_circle(x,y,r,rate){
	canvas_context.beginPath();
	canvas_context.strokeStyle="blue";
	canvas_context.arc(x,y,r*hintSize/(rate/1000),Math.PI*2,false);
	canvas_context.stroke();
}