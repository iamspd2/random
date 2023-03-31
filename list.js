<script type="text/javascript">
RED.nodes.registerType('my-custom-node', {
    category: 'function',
    color: '#a6bbcf',
    defaults: {
        name: {value:""},
        inputList: {value:["Input 1", "Input 2"], required:true},
        outputs: {value: 2, required:true}
    },
    inputs:1,
    outputs: function() {
        return this.outputs;
    },
    icon: "file.png",
    label: function() {
        return this.name || "My Custom Node";
    },
    oneditprepare: function() {
        var node = this;
        var inputList = node.property("inputList");
        var outputCount = node.property("outputs");
        var inputDiv = $("#node-input-inputList-div");
        inputDiv.empty();
        for (var i = 0; i < inputList.length; i++) {
            inputDiv.append('<input type="text" class="node-input" value="' + inputList[i] + '">');
        }
        $('#node-input-outputs').change(function() {
            var newOutputCount = parseInt($(this).val());
            if (newOutputCount < outputCount) {
                node.disconnectOutput(newOutputCount);
            }
            outputCount = newOutputCount;
            for (var i = node.outputs; i < outputCount; i++) {
                node.addOutput();
            }
            node.outputs = outputCount;
        });
    },
    oneditsave: function() {
        var node = this;
        var inputDiv = $("#node-input-inputList-div");
        var inputList = [];
        inputDiv.find("input.node-input").each(function() {
            inputList.push($(this).val());
        });
        node.property("inputList", inputList);
    },
    oneditresize: function(size) {
        var rows = $("#node-input-inputList-div input").length;
        if (size.h < rows * 25 + 30) {
            size.h = rows * 25 + 30;
        }
        return size;
    }
});
</script>

<script type="text/x-red" data-template-name="my-custom-node">
    <div class="form-row">
        <label for="node-input-inputList"><i class="fa fa-list"></i> Input List</label>
        <div id="node-input-inputList-div"></div>
    </div>
    <div class="form-row">
        <label for="node-input-outputs"><i class="fa fa-circle-o"></i> Number of Outputs</label>
        <select id="node-input-outputs">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    </div>
</script>
