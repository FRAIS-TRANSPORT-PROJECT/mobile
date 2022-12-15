// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'element_entity.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Demande _$DemandeFromJson(Map<String, dynamic> json) {
  return Demande(
    json['id'] as String,
    json['motif'] as String,
    json['description'] as String,
    json['frais'] as int,
    json['etat'] as String,
    json['dateDebut'] as String,
    json['dateFin'] as String,
    json['villeDepart'] as String,
    json['villeArrive'] as String,
    json['justification'] as String,
  );
}

Map<String, dynamic> _$DemandeToJson(Demande instance) => <String, dynamic>{
      'id': instance.id,
      'motif': instance.motif,
      'description': instance.description,
      'frais': instance.frais,
      'etat': instance.etat,
      'dateDebut' : instance.dateDebut,
      'dateFin' : instance.dateFin,
      'villeDepart' : instance.villeDepart,
      'villeArrive'  : instance.villeArrive,
      'justification' : instance.justification

    };
