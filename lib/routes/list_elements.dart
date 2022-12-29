
import 'package:flutter/material.dart';
import 'package:flutter_ui/client/element_service.dart';
import 'package:flutter_ui/component/bottom_bar.dart';
import 'package:flutter_ui/component/standard_card.dart';
import 'package:flutter_ui/domain/element_entity.dart';
import 'package:flutter_ui/main.dart';

class ListElements extends StatefulWidget {
  final StandardAppBar appBar;

  ListElements({this.appBar});

  @override
  _ListElements createState() => _ListElements();
}

class _ListElements extends State<ListElements> {
  Widget _asListView(List<Demande> elements) {
    return ListView.separated(
      separatorBuilder: (context, index) {
        return Divider(thickness: 1);
      },
      addAutomaticKeepAlives: true,
      scrollDirection: Axis.vertical,
      itemCount: elements.length,
      itemBuilder: (BuildContext context, int index) {
        Demande element = elements[index];
        return Dismissible(
          direction: DismissDirection.startToEnd,
          key: Key(element.id),
          background: Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                  colors: [Colors.red[400], Colors.white],
                  tileMode: TileMode.clamp),
            ),
          ),
          onDismissed: (direction) async {
            if (await elementService.deleteElement(element.id)) {
              ScaffoldMessenger.of(context)
                  .showSnackBar(SnackBar(content: Text("Element deleted")));
              setState(() {
                elements.removeAt(index);
              });
            } else {
              setState(() {});
            }
          },
          child: ListTile(
          /*  leading: element.etat
                ? Icon(Icons.label_important)
                : Icon(Icons.label_outline),*/
            title: Text(element.motif),
            subtitle: Text(element.description),
            trailing: Chip(
              backgroundColor: Colors.transparent,
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(100),
                  side: BorderSide(color: Colors.grey, width: 1)),
              label: Text(element.frais.toString()),
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: widget.appBar,
      bottomNavigationBar: BottomBar('Element list'),
      body: Container(
        child: FutureBuilder<List<Demande>>(
          future: elementService.getElements(),
          builder: (BuildContext context,
              AsyncSnapshot<List<Demande>> snapshot) {
               
            if (snapshot.hasData) {
             final List <Demande> data = snapshot.data;
              return data.isNotEmpty
                  ? this._asListView(data)
                  : StandardCard('No data', info: true);
            } else if (snapshot.hasError) {
              return StandardCard(
                  'Still Error');
            }
            return Center(child: CircularProgressIndicator());
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Navigator.of(context)
            .pushNamedAndRemoveUntil(ROUTE_FORM, (_) => false),
        child: Icon(Icons.add),
        backgroundColor: Colors.blue,
      ),
    );
  }
}
