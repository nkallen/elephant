LiteGraph.node_images_path = "./litegraph/imgs/";
var editor = new LiteGraph.Editor("main",{miniwindow:false, skip_livemode:true, skip_maximize:true});
var graphcanvas = editor.graphcanvas;
window.graphcanvas = graphcanvas;
window.graph = editor.graph;
graph.supported_types = ["number","string","boolean","numarray","pointarray","objectlist"];


///

window.addEventListener("resize", function() { editor.graphcanvas.resize(); } );
//window.addEventListener("keydown", editor.graphcanvas.processKey.bind(editor.graphcanvas) );
window.onbeforeunload = function(){
	var data = JSON.stringify( graph.serialize() );
	localStorage.setItem("litegraphg demo backup", data );
}

LiteGraph.allow_scripts = true;

//create scene selector
var elem = document.createElement("span");
elem.className = "selector";
elem.innerHTML = "<button class='btn' id='save'>Save</button><button class='btn' id='load'>Load</button>";
editor.tools.appendChild(elem);

elem.querySelector("#save").addEventListener("click",function(){
	if (editor.graph.blocked) return;
	var saveFilePath = moi.filesystem.getSaveFileName( lang.getTranslation('Save as')+' ..',  lang.getTranslation('MoI Nodeeditor files')+' (*.nod)|*.nod' );
	if ( !saveFilePath ) return false;
	if ( editor.graph.status !== LGraph.STATUS_STOPPED ) editor.onPlayButton();
	var file = moi.filesystem.openFileStream( saveFilePath, 'w' );
	file.writeLine(LiteGraph.JSONprettify(editor.graph.serialize(), {"indent":"	", 'maxLength':150}));
	file.close();
	editor.graph.filename = saveFilePath;
	editor.graph.setDirtyCanvas(true,true);
});

elem.querySelector("#load").addEventListener("click",function(){
	var loadFilePath = moi.filesystem.getOpenFileName(  lang.getTranslation('Open'),  lang.getTranslation('MoI Nodeeditor files')+' (*.nod)|*.nod' );
	if ( !loadFilePath ) return false;
	if ( loadFilePath.substr(loadFilePath.length - 4) !== ".nod") return false;
	if ( graph.status !== LGraph.STATUS_STOPPED ) editor.onPlayButton();
	editor.graphcanvas.deselectAllNodes();
	while ( editor.graphcanvas.graph._is_subgraph ) editor.graphcanvas.closeSubgraph();
	var data = '', file = moi.filesystem.openFileStream( loadFilePath, 'r' );
	while ( !file.AtEOF ) data += file.readLine();
	file.close();
	editor.graph.sendEventToAllNodes("onClear");
	editor.graph.configure( JSON.parse(data), false, true);
	editor.graph.filename = loadFilePath;
});

LiteGraph.JSONprettify = function (obj, options)
{
	var get = function (options, name, defaultValue) { return (name in options ? options[name] : defaultValue) }
	options = options || {};
	var indent = get(options, 'indent', '  ');
	var maxLength = (indent === '' ? Infinity : get(options, 'maxLength', 100));
	var prettify = function (string)
	{
		var stringOrChar = /("(?:[^"]|\\.)*")|[:,]/g
		return string.replace(stringOrChar, function (match, string) { return string ? match : match + ' ' });
	}
	var stringify = function (obj, cIndent, reserved)
	{
		if (obj && typeof obj.toJSON === 'function') obj = obj.toJSON();
		var string = JSON.stringify(obj);
		if (string === undefined) { return string }

		var length = maxLength - cIndent.length - reserved;
		if (string.length <= length)
		{
			var prettified = prettify(string);
	  		if (prettified.length <= length) return prettified;
		}

		if (typeof obj === 'object' && obj !== null)
		{
			var nextIndent = cIndent + indent;
			var items = [];
			var delimiters;
			var isSimpleArray = true;
			var comma = function (array, index) { return (index === array.length - 1 ? 0 : 1) }

			if (Array.isArray(obj))
			{
				for (var index = 0; index < obj.length; index++) if ( typeof obj[index] !== 'number' && typeof obj[index] !== 'string') { isSimpleArray = false; break; }
				if ( isSimpleArray ) return string;
				for (var index = 0; index < obj.length; index++) items.push(stringify(obj[index], nextIndent, comma(obj, index)) || 'null');
				delimiters = '[]';
			}
	  		else
			{
				Object.keys(obj).forEach(function (key, index, array)
				{
					var keyPart = JSON.stringify(key) + ': ';
					var value = stringify(obj[key], nextIndent, keyPart.length + comma(array, index));
		  			if (value !== undefined) items.push(keyPart + value);
				});
				delimiters = '{}';
			}
			if (items.length > 0) { return [ delimiters[0], indent + items.join(',\n' + nextIndent), delimiters[1]].join('\n' + cIndent) }
		}
		return string;
	}
	return stringify(obj, '', 0);
}