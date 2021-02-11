(function() {

// PUBLIC API exposed to moi: (for keyboard shortcuts, etc.)

window.copyToClipboard = graphcanvas.copyToClipboard.bind(graphcanvas);
window.pasteFromClipboard = graphcanvas.pasteFromClipboard.bind(graphcanvas);
window.deleteSelectedNodes = graphcanvas.deleteSelectedNodes.bind(graphcanvas)
window.arrange = graph.arrange.bind(graph);
window.storeSelection = function() {
    var selectedObjects = moi.geometryDatabase.getSelectedObjects();
    var store = LiteGraph.createNode("basic/store");
    store.title = "Store selection";
    graph.add(store, false, true);
    for (var i = 0; i < selectedObjects.length; i++) {
        var item = selectedObjects.item(i);
        var info = graph.nodeForObject(item);
        if (info != null) {
            var source = info[0], wasCreated = info[1];
            var letter = "abcdefghijklmnopqrstuvwxyz"[i];
            store.addInput(letter, "objectlist")
            if (source != null) {
                source.connect(0, store, i, true);
            } else {
                console.log("adding property");
                var itemz = moi.geometryDatabase.createObjectList();
                itemz.addObject(item);
                store.addProperty(letter, itemz, "objectlist");
            }
        }
    }
    graph.addHistoryItem(wasCreated, store);
}
window.selectNodes = graphcanvas.selectNodes.bind(graphcanvas);
window.deselectAllNodes = graphcanvas.deselectAllNodes.bind(graphcanvas);

// For automatic node creation:

function createAndConnectSources(factory, node) {
    var allCreated = [];
    for (var i = 0; i < factory.numInputs; i++) {
        var input = factory.getInput(i);
        var value;
        try {
            value = input.getValue();
        } catch (e) {
            continue;
        }
        if (input.type == 8 || input.type == 7) { // objectlist
            var info = graph.nodeForObjects(value);
            var source = info[0], created = info[1];
            if (source != null) {
                source.connect(0, node, i, true);
                delete node.properties[node.args[i].name];
            }
            allCreated = allCreated.concat(created);
        }
    }
    return allCreated;
}

window.commit = function(factory) {
    var node = LiteGraph.createNodeFromFactory(factory);
    graph.add(node, false, true);

    var sources = createAndConnectSources(factory, node);
    var rev = moi.geometryDatabase.revision;
    factory.update(); // This is a hack. By capturing the revision and forcing an update, any temporary objects that would actually be committed are recreated, allowing us to "easily" identify everything created by this factory.
    factory.commit();
    var createdObjects = Created(rev);
    graph.addHistoryItem(sources, node);
    graph.updateIndex(node, createdObjects);
}

function Created(rev) {
    var allObjects = moi.geometryDatabase.getObjects();
    var createdObjects = [];
    for ( var i = 0; i < allObjects.length; ++i ) {
        var obj = allObjects.item(i);
        if (obj.databaseRevision > rev) {
            createdObjects.push(obj);
        }
    }
    return createdObjects;
}
})();