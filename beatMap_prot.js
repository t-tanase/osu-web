new beatMapProt();
function beatMapProt(){
	 this.name ='name';
	 this.id ='id';
	 this.source ='directry/id';
	 this.backgroundImage ="bg.png";
	 this.targetImg =null;
	 this.musicRowLength=0;
	 this.length =1000;
	 this.radius =40;
	 this.targetObject = [];
	 this.videoSource='directry/bg.png';
	 this.levelList=[];
	 this.logText="";
	 beatMapProt.prototype.setOriginal = function (){
			 var targetCounter=0;
				while(true){
					console.log(this.id+"_"+targetCounter);
				var string =localStorage.getItem(this.id+"_"+targetCounter);
				if(localStorage.getItem(this.id+"_"+targetCounter)==null){
					break;
					}
				var arrayElem=string.split("_");
				if(arrayElem[0]=="normal"){
					this.targetObject[targetCounter]=new target(width_num*Number(arrayElem[1]),height_num*Number(arrayElem[2]),this.radius,targetCounter,Number(arrayElem[3]));
					this.logText+="this.targetObject["+targetCounter+"] = new target(width_num*"+Number(arrayElem[1])+",height_num*"+Number(arrayElem[2])+",this.radius,"+targetCounter+","+Number(arrayElem[3])+");\n";
					this.length=Number(arrayElem[3]);
				}else if(arrayElem[0]=="move"){
					var positionXList=[];
					var positionYList=[];
					var positionXStringList =arrayElem[5].split(",");
					var positionYStringList =arrayElem[6].split(",");
					for(var l=0;l<positionXStringList.length;l++){
						positionXList[l]=Number(positionXStringList[l]);
						positionYList[l]=Number(positionYStringList[l]);
					}
					this.targetObject[targetCounter]=new strokeMoveTarget(width_num*Number(arrayElem[1]),height_num*Number(arrayElem[2]),this.radius,targetCounter,Number(arrayElem[3]),Number(arrayElem[4]),positionXList,positionYList);
					this.logText+="this.targetObject["+targetCounter+"] = new strokeMoveTarget(width_num*"+Number(arrayElem[1])+",height_num*"+Number(arrayElem[2])+",this.radius,"+targetCounter+","+Number(arrayElem[3])+","+Number(arrayElem[4])+","+positionXStringList+","+positionYStringList+");\n";
					this.length=Number(arrayElem[4]);
				}
				targetCounter++;
				}
				for(var i=0;i<this.targetObject.length;i++){
					this.targetObject[i].targetImg=this.targetImg;
					}
				//console.log(this.logText);
			 return this.targetObject;
	 };
 }

