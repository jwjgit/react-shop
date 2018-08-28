var area = require('./area.json')

var arr = area.result.areaList
var arr1 = []
var arr2 = []
var arr3 = []
for (var n = 0; n < arr.length; n++) {
    if (arr[n].areaDeep.toString() === '1') {
        arr1.push(arr[n])
    } else if (arr[n].areaDeep.toString() === '2') {
        arr2.push(arr[n])
    } else {
        arr3.push(arr[n])
    }
}
// console.log(arr)
var areaArr = []
for (var i = 0; i < arr1.length; i++) {
    let obj1 = {}
    obj1['label'] = arr1[i].areaName
    obj1['value'] = arr2[i].areaId
    let children1 = []
    for (var j = 0; j < arr2.length; j++) {
        if (arr2[j].areaParentId === arr1[i].areaId) {
            let obj2 = {}
            obj2['label'] = arr2[j].areaName
            obj2['value'] = arr2[j].areaId
            let children2 = []
            for (var k = 0; k < arr3.length; k++) {
                if (arr3[k].areaParentId === arr2[j].areaId) {
                    let obj3 = {}
                    obj3['label'] = arr3[k].areaName
                    obj3['value'] = arr3[k].areaId
                    children2.push(obj3)
                }
            }
            obj2['children'] = children2
            children1.push(obj2)
        }
    }
    obj1['children'] = children1
    areaArr.push(obj1)
}
// console.log(JSON.stringify(areaArr) )