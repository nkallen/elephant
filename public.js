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
    var created = [];
    for (var i = 0; i < selectedObjects.length; i++) {
        var item = selectedObjects.item(i);
        var info = graph.nodeForObject(item);
        if (info != null) {
            var source = info[0], wasCreated = info[1];
            created = created.concat(wasCreated);
            var letter = "abcdefghijklmnopqrstuvwxyz"[i];
            store.addInput(letter, "objectlist")
            if (source != null) {
                source.connect(0, store, i, true);
            } else {
                var itemz = moi.geometryDatabase.createObjectList();
                itemz.addObject(item.clone());
                store.addProperty(letter, itemz, "objectlist");
            }
        }
    }
    graph.addHistoryItem(created, store);
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
            var info = input.type == 8 ? graph.nodeForObjects(value) : graph.nodeForObject(value);
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