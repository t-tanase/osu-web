/*------------------------------------*/
/* require.js - 2009.11.22
/* http://tshinobu.com/lab/javascript/require/
/*------------------------------------*/
(function(){
	var s = document.getElementsByTagName("script");
	var d = s[s.length-1].src.substring(0, s[s.length-1].src.lastIndexOf("/")+1);
	for(var i=0; i<arguments.length; i++){
		document.write('<script type="text/javascript" src="'+d+arguments[i]+'" charset="UTF-8"></script>');
	}
})(
"lib/jquery-1.7.js",
"lib/modernizr-2.0.6.js",
"beatMap_prot.js",
"beatshoot.js",
"action.js",
"supernova.js",
"akb.js",
"butter.js",
"melt.js",
"connect.js",
"steins.js",
"race.js",
"banbe.js",
"ultra.js",
"caruma.js",
"base.js"
);



/*<script type="text/javascript" src="lib/jquery-1.7.js"></script>
<script type="text/javascript" src="lib/modernizr-2.0.6.js"></script>
<script type="text/javascript" src="beatMap_prot.js"  charset="UTF-8"></script>
 <script type="text/javascript" src="beatshoot.js"  charset="UTF-8"></script>
 <script type="text/javascript" src="action.js" charset="UTF-8"></script>
<script type="text/javascript" src="race.js"  charset="UTF-8"></script>
 <script type="text/javascript" src="steins.js"  charset="UTF-8"></script>
 <script type="text/javascript" src="banbe.js"  charset="UTF-8"></script>
  <script type="text/javascript" src="ultra.js"  charset="UTF-8"></script>
  <script type="text/javascript" src="caruma.js"  charset="UTF-8"></script>
  <script type="text/javascript" src="connect.js"  charset="UTF-8"></script>
  <script type="text/javascript" src="butter.js"  charset="UTF-8"></script>
   <script type="text/javascript" src="melt.js" charset="UTF-8"></script>
   <script type="text/javascript" src="supernova.js" charset="UTF-8"></script>
<script type="text/javascript" src="base.js" charset="UTF-8"></script>*/


