function draw(estimator,header) {
  var node = [];
  var text = [];
  var trees = [];
  for(var j=0;j<estimator.nEstimators;j++){
    trees[j] = {};
    var n_nodes = estimator.trees[j].nodes.length;
    for(var i=0;i<n_nodes;i++){
      node[i] = estimator.trees[j].nodes[i];
      if(i<n_last_nodes(estimator.depth)){
        text[i] = header[0][node[i].j] + "x["+ node[i].j+ "] < " + node[i].threshold + ":" + node[i].threshold + "<" + header[0][node[i].j]+ "x[" + node[i].j + "]";
      }
      else{
        text[i]="define = " + node[i].label;
      }
    }

    trees[j]['0']={};
    trees[j]['0']['value'] = text[0];
    trees[j]['0']['parent'] = "";
    var num = 0;
    for(var i=1;i<n_nodes;i++){
      trees[j][String(i)]={};
      trees[j][String(i)]['value'] = text[i];
      trees[j][String(i)]['parent'] = String(num);
      if(i % 2 == 0){
        num+=1;
      }

    }
  }
  return trees;
}


//一番下のノードの一番左側の番号を返す
function n_last_nodes(depth){
  var n=0;
  if(depth == 1){
    return 0;
  }
  else{
    for(k=1;k<=depth-1;k++){
      n += Math.pow(2,k-1);
    }
    return n;
  }
}

function print_canvas(n,target){
  var div = $('<div id="container">');
  for(var i=0;i<n;i++){
    div.append($('<div id="tree' + i + '">'));
    for(var j=0;j<20;j++){
      div.append($('<br>'));
    }
  }
  $(target).append(div);
}

function print_table(header,x,y,target,caption,id){
  var div = $('<div class="table-responsive" style="display:none">');
  div.attr('id',id);
  div.append($('<h1>').html(caption));
  div.append($('<p class="help-block">').html('※左右にスクロールできます'));
  var table = $('<table class ="table table-striped table-bordered table-hover">');
  var thead = $("<thead>");
  var tr = $("<tr>");
  var i;
  for(i=0;i<x[0].length;i++){
    tr.append($("<th>").html(header[0][i]+'(x['+i+'])'));
  }
  tr.append($("<th>").html( header[0][i]+"(解y)"));
  thead.append(tr);

  var tbody = $('<tbody>');
  var i=0;
  x.forEach(function(v1){
    var tr = $('<tr>');
    v1.forEach(function(v2){
      tr.append($('<td>').html(v2));
    });
    tr.append($('<td>').html(y[i]));
    tbody.append(tr);
    i++;
  });

  table.append(thead);
  table.append(tbody);
  div.append(table);
  $(target).append(div);

}

function createJSON(tree,header){
  var json = [];
  var depth = tree["depth"];

  for(var i = n_last_nodes(depth); i <= n_last_nodes(depth) *2; i++){
    json[i] = {name:["define =" + tree.nodes[i].label],children: false };
  }
  depth--;


  while(depth != 0){
    for(var i = n_last_nodes(depth); i <= n_last_nodes(depth) *2; i++){
      var text =  header[0][tree.nodes[i].j] + "(x["+ tree.nodes[i].j+ "]) < " + tree.nodes[i].threshold + "↑:" + tree.nodes[i].threshold + " < " + header[0][tree.nodes[i].j]+ "(x[" + tree.nodes[i].j + "])↓";
      text = text.split(':');
      json[i] = {name:text  , children: [] };
      json[i]["children"].push(json[tree["nodes"][i]["left"]]);
      json[i]["children"].push(json[tree["nodes"][i]["right"]]);
    }
    depth--;
  }

  return json[0];

}
