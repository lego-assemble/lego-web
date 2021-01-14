/* eslint-disable */

var vue
function install(element) {
  vue = element
}

function showMessage(message, type) {
  vue.showMessage(message, type)
}

function dateFormat(date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();  
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute; 
    var second= date.getSeconds();  
    second = minute < 10 ? ('0' + second) : second;  
    return y + '-' + m + '-' + d;  
}

function parserDate(date) {  
    var t = Date.parse(date);  
    if (!isNaN(t)) {  
        return new Date(Date.parse(date.replace(/-/g, "/")));  
    } else {  
        return new Date();  
    }  
}

function swapItems(arr ,index, tindex){
  if(index > tindex){
    arr.splice(tindex, 0, arr[index]);
    arr.splice(index + 1, 1)
  } else {
    arr.splice(tindex + 1, 0, arr[index]);
    arr.splice(index, 1)
  }
}

function safityValue(data, key, defaultValue) {
  if (null == data) {
    return defaultValue
  }

  var value = data[key]
  return null == value ? defaultValue : value
}

function safityMapValue(param, key) {
  var keys = key.split(".")
  var context = param
  for (var index = 0; index < keys.length; index++) {
    var key = keys[index]
    if (typeof(param) != "object") {
      return null
    }

    context = context[key]
    if (null == context) {
      return null
    }
  }

  return context
}

function formatString(query, args) {
  if (typeof(query) != "string") {
    return query
  }

  if (typeof(args) != "object") {
    return query
  }

  if (null == args || args.length == 0) {
    return query
  }

  if (null == query) {
    return query
  }

  var reg = new RegExp('\\${(.*?)}', 'gmi')
  var params = query.match(reg)
  if (null == params || params.length == 0) {
    return query
  }
  
  var result = query
  for (var index = 0; index < params.length; index++) {
    var param = params[index]
    var key = param.substring(2, param.length - 1)
    var res = safityMapValue(args, key)
    if (null != res) {
      result = result.replace(param, res)
    }
  }

  return result
}

function formatMap(map, args) {
  for (var key in map) {
    var value = map[key]
    if (typeof(value) == 'object') {
      formatMap(value, args)
    } else if (typeof(value) == 'string') {
      map[key] = formatString(value, args)
    }
  }
}

export {
  install,
  showMessage,
  dateFormat,
  parserDate,
  swapItems,
  safityValue,
  formatString,
  formatMap
}