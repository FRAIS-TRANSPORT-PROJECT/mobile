// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'element_entity.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Demande _$DemandeFromJson(Map<String, dynamic> json) {
  return Demande(
    json['id'] as String,
    json['name'] as String,
    json['description'] as String,
    json['amount'] as int,
    json['success'] as bool,
  );
}

Map<String, dynamic> _$DemandeToJson(Demande instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'description': instance.description,
      'amount': instance.amount,
      'success': instance.success,
    };
