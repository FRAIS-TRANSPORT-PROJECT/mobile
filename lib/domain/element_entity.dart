import 'package:json_annotation/json_annotation.dart';

part 'element_entity.g.dart';

@JsonSerializable()
class Demande {
  String id;
  String motif;
  String description;
  int frais;
  String dateDebut;
  String dateFin;
  String villeDepart;
  String villeArrive;
  String etat;
  String justification;

  Demande(
    this.id,
    this.motif,
    this.description,
    this.frais,
    this.dateDebut,
    this.dateFin,
    this.etat,
    this.justification,
    this.villeArrive,
    this.villeDepart,
  );

  Demande.empty({
    this.frais = 0,
    this.etat = "true",
  });

  factory Demande.fromJson(Map<String, dynamic> json) =>
      _$DemandeFromJson(json);

  Map<String, dynamic> toJson() => _$DemandeToJson(this);
}
