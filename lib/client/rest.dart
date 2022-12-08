import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;

class Rest {
  static const Duration restHttpDurationTimeout = Duration(seconds: 5);

  static const URL = 'http://localhost:8085/api/v1';

  static dynamic decodeResponse(http.Response response) {
    return jsonDecode(utf8.decode(response.bodyBytes));
  }

  static Future<http.Response> requestGet(String path) async {
    return await http.get(URL + path, headers: {
      HttpHeaders.contentTypeHeader: 'application/json'
    }).timeout(restHttpDurationTimeout);
  }

  static Future<http.Response> requestPost(String path, var request) async {
    return await http
        .post(URL + path,
            headers: {HttpHeaders.contentTypeHeader: 'application/json'},
            body: jsonEncode(request))
        .timeout(restHttpDurationTimeout);
  }

  static Future<http.Response> requestDelete(String path) async {
    return await http.delete(URL + path, headers: {
      HttpHeaders.contentTypeHeader: 'application/json'
    }).timeout(restHttpDurationTimeout);
  }
}
