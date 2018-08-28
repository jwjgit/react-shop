// export const BASE_URL = 'https://api.njdexin.cn/router'
//export const BASE_URL = 'http://apiserver.njdexin.cn/router'
//  export const BASE_URL = 'http://192.168.0.188:8181/njdexin-apiservice/router'
 export const BASE_URL = 'http://192.168.0.118:8080/api/router' 
const BASE_OBJ = {
    appKey: "10000",
    format: "json",
    v: "1.0"
}
const SECRET = 'F661DC8AC32D448FAB31C68787497A64'

//import Abc from 'crypto-js'

var CryptoJS = require("crypto-js");


function sort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}
function stringToHex(str) {
    var val = "";
    for (var i = 0; i < str.length; i++) {
        if (val == "")
            val = str.charCodeAt(i).toString(16);
        else
            val += "," + str.charCodeAt(i).toString(16);
    }
    return val;
}
function sign(body) {
    let keyArr = []
    let newKey = {}
    for (var key in body) {
        keyArr.push(key)
    }
    let newArr = sort(keyArr)
    for (let i = 0; i < newArr.length; i++) {
        newKey[newArr[i]] = body[newArr[i]]
    }
    return newKey
}


export const postBody = (jsonArr) => {
    let body = {}
    let obj = {}
    let tempStr = SECRET
    let newObj = {}
    let bodyObj = {}
    body = Object.assign(jsonArr, BASE_OBJ)
    // console.log(body)
    newObj = sign(body)
    for (var key in newObj) {
        if (key === 'password') {
            continue
        } else {
            tempStr += key + newObj[key]
        }
    }
    tempStr += SECRET
    let secretStr = tempStr.replace(/[^a-zA-Z0-9]*/ig, "")
    let secretData = CryptoJS.SHA1(secretStr).toString(CryptoJS.enc.Hex)
    obj['sign'] = secretData.toUpperCase()

    bodyObj = Object.assign(obj, body)
    // console.log(bodyObj)


    let formData = new FormData();
    for (var key in bodyObj) {
        formData.append(key, bodyObj[key])
    }

    return formData
}

export const postImgBody = (jsonArr) => {
    let body = jsonArr
    //body = Object.assign(BASE_OBJ, jsonArr)
    let formData = new FormData();
    // console.log(body)
    for (var key in body) {
        formData.append(key, body[key])
    }

    return formData
}

