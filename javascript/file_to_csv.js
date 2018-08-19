function fileToCsv(reader){
  // 行単位で配列にする
  var lineArr = reader.result.split("\n");
  // 行と列の二次元配列にする
  var itemArr = [];
  for (var i = 0; i < lineArr.length; i++) {
    itemArr[i] = lineArr[i].split(",");
  }

  var arr1=[],arr2=[];
  //xに列、yに行を格納
  for (var i = 0; i < itemArr.length; i++) {
    arr1[i]=[];
    for (var j = 0; j < itemArr[i].length-1; j++) {
      arr1[i][j]= Number(itemArr[i][j]);
    }
    arr2[i]=Number(itemArr[i][itemArr[i].length-1]);
  }
  return [arr1,arr2];
}

function fileToCsvHeader(reader){
 // 行単位で配列にする
  var lineArr = reader.result.split("\n");
  // 行と列の二次元配列にする
  var itemArr = [];
  for (var i = 0; i < lineArr.length; i++) {
    itemArr[i] = lineArr[i].split(",");
  }
  return itemArr;
}
