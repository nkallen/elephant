LiteGraph.node_images_path = "./litegraph/imgs/";
var editor = new LiteGraph.Editor("main",{miniwindow:false, skip_livemode:true, skip_maximize:true});
window.graphcanvas = editor.graphcanvas;
window.graph = editor.graph;
window.addEventListener("resize", function() { editor.graphcanvas.resize(); } );
//window.addEventListener("keydown", editor.graphcanvas.processKey.bind(editor.graphcanvas) );
window.onbeforeunload = function(){
	var data = JSON.stringify( graph.serialize() );
	localStorage.setItem("litegraphg demo backup", data );
}

//enable scripting
LiteGraph.allow_scripts = true;

//create scene selector
var elem = document.createElement("span");
elem.className = "selector";
elem.innerHTML = "<button class='btn' id='save'>Save</button><button class='btn' id='load'>Load</button>";
editor.tools.appendChild(elem);

elem.querySelector("#save").addEventListener("click",function(){
	console.log("saved");
	localStorage.setItem( "graphdemo_save", JSON.stringify( graph.serialize() ) );
});

elem.querySelector("#load").addEventListener("click",function(){
	var data = localStorage.getItem( "graphdemo_save" );
	if(data)
		graph.configure( JSON.parse( data ) );
	console.log("loaded");
});