import 'dart:async';
import 'dart:html';

import 'package:flutter_ui/client/rest.dart';
import 'package:flutter_ui/domain/element_entity.dart';

final ElementService elementService = ElementService._private();

class ElementService {
  ElementService._private();

  Future<List<Demande>> getElements() async {
    final response = await Rest.requestGet('/demandes/');
print("test"+response.body);
    switch (response.statusCode) {
      case 200:
      
        return List.of(Rest.decodeResponse(response))
            .map((o) => Demande.fromJson(o))
            .toList();
      default:
        throw Exception('request failed');
    }
  }

  Future<bool> saveElement(Demande Demande) async {
    final response = await Rest.requestPost('/demandes/', Demande);

    switch (response.statusCode) {
      case 201:
        return Future.value(true);
        break;
      default:
        throw Exception('request failed');
    }
  }

  Future<bool> deleteElement(String id) async {
    final response = await Rest.requestDelete('/demandes/$id');

    switch (response.statusCode) {
      case 204:
        return true;
        break;
      case 404:
        return false;
        break;
      default:
        throw Exception('request failed');
    }
  }
}
