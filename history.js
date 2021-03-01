(function(){
    var cursor = 100;
    var objectIds = {};
    var subobjectIds = {};
    var history = [];
    var history_output = null;
    
    LGraph.prototype.clearHistory = function() {
        cursor = 100;
        objectIds = {};
        subobjectIds = {};
        history = [];
        history_output = null;
    }

    LGraph.prototype.addHistoryItem = function(sources, node) {
        history.push(node);
        var onRemoved = node.onRemoved;
        node.onRemoved = function() {
            if (onRemoved) onRemoved.call(this);
            // history is mutable so we must always search
            for (var i = 0; i < history.length; i++) {
                var candidate = history[i];
                if (candidate.id == node.id) {
                    history.splice(i, 1);
                    break;
                }
            }
        }

        var ids = {};
        ids[node.id] = true;
        for (var i = 0; i < sources.length; i++) ids[sources[i].id] = true;
    
        var startx = 20;
        var maxheight = 0;
        for (var i = 0; i < this._nodes.length; i++) {
            var n = this._nodes[i];
            if (n.id in ids) continue;
            maxheight = Math.max(maxheight, n.pos[1] + n.size[1]);
        }
        cursor = maxheight + 50;
    
        // Layout newly created sources on the left
        if (sources.length > 0) {
            var maxwidth = 0;
            for (var i = 0; i < sources.length; i++) {
                var source = sources[i];
                source.pos = [startx + 10 * i, cursor + i * 50];
                maxwidth = Math.max(maxwidth, source.size[0] + 10 * i);
            }
            startx += maxwidth + 40;
        }
    
        // Layout the node
        node.pos = [startx, cursor];
    
        this.setDirtyCanvas(true, true);
        return node;
    }
    
    LGraph.prototype.showHistoryItem = function(i) {
        if (history.length == 0) return;
        if (history_output == null) history_output = LiteGraph.createNode("basic/Output");
        var node = history[i];
        history_output.pos[0] = node.pos[0] + 200;
        history_output.pos[1] = node.pos[1];
        if (history_output.graph == null)
            this.add(history_output);
        node.connect(0, history_output, 0);
        this.sendActionToCanvas("centerOnNode", [node]);
    }
    
    // Note any objects created by the node for lookup later
    LGraph.prototype.updateIndex = function(node, createdObjects) {
        if (createdObjects.length == 0) return;
        var positionNecessary = createdObjects.length > 1
        node.createdObjectIds = [];
        
        for (var i = 0; i < createdObjects.length; i++) {
            var object = createdObjects[i];
            var index = positionNecessary ? i : null;
            objectIds[object.id] = {nodeId: node.id, index: index};
            node.createdObjectIds.push(object.id);
    
            var subobjects = object.getSubObjects();
            for (var j = 0; j < subobjects.length; j++) {
                var subobj = subobjects.item(j);
                subobjectIds[subobj.id] = { nodeId: node.id, type: subobj.type, parentIndex: index, subobjectIndex: j }
            }
        }
    }
    
    LGraph.prototype.nodeForObject = function(object) {
        var objectlist = moi.geometryDatabase.createObjectList();
        objectlist.addObject(object);
        return this.nodeForObjects(objectlist);
    }
    
    // Find the litegraph node that created the moi geo object.
    // If the object is a subobject, or one of many created by the node,
    // Dynamically create nodes to narrow the selection.
    LGraph.prototype.nodeForObjects = function(objectlist) {
        if (objectlist.length == 0) return null;
    
        var allCreated = [];
        var idxs = {}, subobjs = {}, free = moi.geometryDatabase.createObjectList();
        // First, aggregate everything we want to connect together
        for (var j = 0; j < objectlist.length; j++) {
            var item = objectlist.item(j);
            var id = item.id;
            if (id in objectIds) {
                var info = objectIds[id];
                if (this.getNodeById(info.nodeId) == null) { // the node may have been deleted;
                    free.addObject(item.clone());
                } else {
                    if (!(info.nodeId in idxs)) idxs[info.nodeId] = [];
                    if (info.index != null) idxs[info.nodeId].push(info.index);
                }
            } else if (id in subobjectIds) {
                var info = subobjectIds[id];
                var key = [info.nodeId, info.parentIndex];
                if (this.getNodeById(info.nodeId) == null) {
                    free.addObject(item.clone());
                } else {
                    if (!(key in subobjs)) subobjs[key] = {nodeId: info.nodeId, parentIndex: info.parentIndex, subobjectIndexes: []};
                    subobjs[key].subobjectIndexes.push(info.subobjectIndex);
                }
            } else {
                free.addObject(item.clone());
            }
        }
        // Next, build the compact node graph; there are things ref'd by index, subobject, and "free"/lacking a ref
        var toBeConcatted = [];
        for (var nodeId in idxs) {
            var item = idxs[nodeId];
            if (item.length > 0) {
                var idx_node = LiteGraph.createNode("basic/array[]");
                this.add(idx_node, false, true);
                idx_node.collapse();
                idx_node.setProperty("index", item);
                var parent_node = this.getNodeById(nodeId);
                parent_node.connect(0, idx_node, 0, true);
                toBeConcatted.push(idx_node);
                allCreated.push(idx_node);
            } else {
                toBeConcatted.push(this.getNodeById(nodeId));
            }
        }
        for (var k in subobjs) {
            var item = subobjs[k];
            var nodeId = item.nodeId, parentIndex = item.parentIndex;
            var parent_node = this.getNodeById(nodeId);
            if (parentIndex != null) {
                var idx_node = LiteGraph.createNode("basic/array[]");
                this.add(idx_node, false, true);
                idx_node.collapse();
                idx_node.setProperty("index", [parentIndex]);
                parent_node.connect(0, idx_node, 0, true);
                allCreated.push(idx_node);
                parent_node = idx_node;
            }
            var subobject_node = LiteGraph.createNode("basic/subobject");
            subobject_node.properties["Index"] = item.subobjectIndexes;
            this.add(subobject_node, false, true);
            subobject_node.collapse();
            parent_node.connect(0, subobject_node, 0, true);
            toBeConcatted.push(subobject_node);
            allCreated.push(subobject_node);
        }
        if (free.length > 0) {
            var store = LiteGraph.createNode("basic/store");
            this.add(store, false, true);
            store.collapse();
            store.addInput("a", "objectlist");
            store.addProperty("a", free, "objectlist");
            toBeConcatted.push(store);
            allCreated.push(store);
        }
        // Finally, create a concat node if necessary!
        if (toBeConcatted.length == 0) {
            return [null, allCreated];
        } if (toBeConcatted.length == 1) {
            return [toBeConcatted[0], allCreated];
        } else {
            var concat = LiteGraph.createNode("basic/concat");
            this.add(concat);
            allCreated.push(concat);
            for (var j = 0; j < toBeConcatted.length; j++) {
                var source = toBeConcatted[j];
                source.connect(0, concat, j, true);
            }
            return [concat, allCreated];
        }
    }
    
    LGraph.prototype.nodeForObjectId0 = function(id) { // FIXME nk rename
        if (!(id in objectIds)) return null;
    
        var info = objectIds[id];
        return this.getNodeById(info.nodeId);
    }
    
    var history_cursor = -1;
    
    LGraph.prototype.showPreviousHistoryItem = function() {
        history_cursor = Math.min(history_cursor+1, history.length-1);
        var i = history.length-1 - history_cursor;
        this.showHistoryItem(i);
    }
    
    LGraph.prototype.showNextHistoryItem = function() {
        history_cursor = Math.max(history_cursor-1, 0);
        var i = history.length-1 - history_cursor;
        this.showHistoryItem(i);
    }
    
    })();