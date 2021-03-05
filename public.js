(function() {

// PUBLIC API exposed to moi: (for keyboard shortcuts, etc.)

window.copyToClipboard = graphcanvas.copyToClipboard.bind(graphcanvas);
window.pasteFromClipboard = graphcanvas.pasteFromClipboard.bind(graphcanvas);
window.invertSelection = graphcanvas.invertSelection.bind(graphcanvas);
window.deleteSelectedNodes = graphcanvas.deleteSelectedNodes.bind(graphcanvas)
window.arrange = graph.arrange.bind(graph);
window.storeSelection = function() {
    var selectedObjects = moi.geometryDatabase.getSelectedObjects();
    if (selectedObjects.length == 0) return;
    var store = LiteGraph.createNode("basic/store");
    store.title = "Store selection";
    graph.add(store, false, true);
    store.addInput("a", "objectlist");
    var info = graph.nodeForObjects(selectedObjects);
    var source = info[0], wasCreated = info[1];
    source.connect(0, store, 0);
    graph.addHistoryItem(wasCreated, store);
    return store;
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
        if (input.type == 8 || input.type == 7) { // objectlist || (geo)object
            var info;
            if (input.type == 8) {
                if (node.name == "loft") {
                    info = graph.nodeForObjects_preserveOrder(value);
                } else {
                    info = graph.nodeForObjects(value);
                }
            } else {
                info = graph.nodeForObject(value);
            }
            if (info == null) continue;

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

window.commit = function(factory, newFactory) {
    graphcanvas.pause_rendering = true;
    var node = LiteGraph.createNodeFromFactory(factory);
    graph.add(node, false, true);

    var sources = createAndConnectSources(factory, node);
    factory.update();
    var createdObjects = factory.getCreatedObjects();
    if (newFactory != null) {
        factory.commitAndPrepOther(newFactory);
    } else {
        factory.commit();
    }
    graph.addHistoryItem(sources, node);
    graph.updateIndex(node, createdObjects);
    graphcanvas.pause_rendering = false;
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