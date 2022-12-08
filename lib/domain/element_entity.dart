import 'package:json_annotation/json_annotation.dart';

part 'element_entity.g.dart';

@JsonSerializable()
class Demande {
  String _embedded;
  String id;
  String name;
  String description;
  int amount;
  bool success;

  Demande(
    this.id,
    this.name,
    this.description,
    this.amount,
    this.success,
  );

  Demande.empty({
    this.amount = 0,
    this.success = true,
  });

  factory Demande.fromJson(Map<String, dynamic> json) =>
      _$DemandeFromJson(json);

  Map<String, dynamic> toJson() => _$DemandeToJson(this);
}
