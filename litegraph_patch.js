/**
 * The code in this file changes the behavior of the LiteGraph library.
 * The goal is to keep all changes isolated so upgrading the library is
 * easier.
 */
(function(){

LGraphNode.prototype.getInputData = function(slot, defaultdata) {
    if (!this.inputs)  return;

    if (slot >= this.inputs.length || this.inputs[slot].link == null) {
        return defaultdata;
    }

    var link_id = this.inputs[slot].link;
    var link = this.graph.links[link_id];
    if (!link) {
        //bug: weird case but it happens sometimes
        return defaultdata;
    }

    switch (this.inputs[slot].type) {
        case "pointarray":
            return link.data.clone();
        case "numarray":
            return link.data.slice(0);
        default:
            return link.data;
    }
};

// The execution model differs from vanilla LiteGraph. Most nodes are lazy and should only
// be executed when something upstream has changed. Only quartz/timer nodes are considered
// to always need updates; these are given an IMMORTAL mode to contrast with ALWAYS (which)
// will be lazy here.

var immortal = {};
var executable = [];
LiteGraph.IMMORTAL = 4;
LGraph.prototype.updateExecutionOrder = function() {
    this._nodes_in_order = this.computeExecutionOrder(false);
    for (var i = 0; i < this._nodes_in_order.length; ++i) {
        var node = this._nodes_in_order[i];
        if (node.onExecute) executable.push(node);
        if (node.mode == LiteGraph.IMMORTAL) {
            immortal[node.id] = true;
        }
    }
};

var runStep = LGraph.prototype.runStep;
var hasChanged = {};
LGraph.prototype.onConnectionChange = function(node) {
    hasChanged[node.id] = true;
}
LGraph.prototype.onNodeAdded = function(node) {
    hasChanged[node.id] = true;
}
LGraph.prototype.runStep = function(num, do_not_catch_errors, limit ) {
    if (Object.keys(hasChanged).length == 0) return;

    var needsExecution = this.computeNeedsExecution();
    var _nodes_executable = [];
    for (var i = 0; i < executable.length; i++) {
        if (executable[i].id in needsExecution) {
            _nodes_executable.push(executable[i]);
        }
    }
    this._nodes_executable = _nodes_executable;
    runStep.call(this, num, do_not_catch_errors, limit);
    delete this._nodes_executable;
    hasChanged = {};
    for (var id in immortal) hasChanged[id] = true;
};

LGraph.prototype.computeNeedsExecution = function() {
    var result = {};
    var S = [];
    for (var id in hasChanged) {
        var node = this.getNodeById(id);
        S.push(node);
    }
    var visited_links = {};
    while (S.length > 0) {
        var node = S.shift();
        result[node.id] = true;
        if (node.outputs == null) continue;
        for (var i = 0; i < node.outputs.length; i++) {
            var output = node.outputs[i];
            if (output == null || output.links == null || output.links.length == 0)
                continue;

            //for every connection
            for (var j = 0; j < output.links.length; j++) {
                var link_id = output.links[j];
                var link = this.links[link_id];
                if (!link) continue;
                if (visited_links[link.id]) continue;

                var target_node = this.getNodeById(link.target_id);
                if (target_node == null) {
                    visited_links[link.id] = true;
                    continue;
                }
                
                visited_links[link.id] = true;
                S.push(target_node);
            }
        }
    }
    return result;
}

})();