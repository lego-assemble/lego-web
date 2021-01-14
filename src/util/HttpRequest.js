/* eslint-disable */

import axios from 'axios'
import pako from 'pako'
import {showMessage} from './EasyUtils.js'

var vue;

var TEST_HOST = "http://localhost:7001/"

function get(url, params, success, failed) {
  if (!url.startsWith("http")) {
    url = TEST_HOST + url
  }
  
  axios.get(url, {
    params: params
  }).then(function (response) {
    resolveResponse(response.data, success, failed)
  }).catch(function (error) {
    if (failed == null) {
      return
    }

    failed(error)
  })
}

function post(url, params, success, failed) {
  if (!url.startsWith("http")) {
    url = TEST_HOST + url
  }
  
  axios.post(url, params).then(function (response) {
    resolveResponse(response.data, success, failed)
  }).catch(function (error) {
    if (failed == null) {
      return
    }

    failed(error)
  })
}

function resolveResponse(response, success, failed) {
    var code = response.code
    var msg = response.msg
    var content = response.content
    if (0 == code) {
      success(content)
    } else {
      showMessage(msg, 'error')
      failed(msg)
    }
}

function install(element) {
  vue = element
}

export {
  get,
  post,
  install
}
