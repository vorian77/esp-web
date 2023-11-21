// GENERATED by @edgedb/generate v0.3.4

import * as $ from "../reflection";
import * as _ from "../imports";
import type * as _std from "./std";
export type $MovieλShape = $.typeutil.flatten<_std.$Object_6b06be9b27fe11ee83ff159af7e1bb81λShape & {
  "actors": $.LinkDesc<$Person, $.Cardinality.Many, {}, false, false,  false, false>;
  "title": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
}>;
type $Movie = $.ObjectType<"sys_test::Movie", $MovieλShape, null, [
  ..._std.$Object_6b06be9b27fe11ee83ff159af7e1bb81['__exclusives__'],
]>;
const $Movie = $.makeType<$Movie>(_.spec, "c7b5c8f1-71ae-11ee-ba86-eb87304eac3e", _.syntax.literal);

const Movie: $.$expr_PathNode<$.TypeSet<$Movie, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Movie, $.Cardinality.Many), null);

export type $PersonλShape = $.typeutil.flatten<_std.$Object_6b06be9b27fe11ee83ff159af7e1bb81λShape & {
  "name": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "<actors[is sys_test::Movie]": $.LinkDesc<$Movie, $.Cardinality.Many, {}, false, false,  false, false>;
  "<actors": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Person = $.ObjectType<"sys_test::Person", $PersonλShape, null, [
  ..._std.$Object_6b06be9b27fe11ee83ff159af7e1bb81['__exclusives__'],
  {name: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Person = $.makeType<$Person>(_.spec, "c7b3e011-71ae-11ee-8234-6fa387f35638", _.syntax.literal);

const Person: $.$expr_PathNode<$.TypeSet<$Person, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Person, $.Cardinality.Many), null);



export { $Movie, Movie, $Person, Person };

type __defaultExports = {
  "Movie": typeof Movie;
  "Person": typeof Person
};
const __defaultExports: __defaultExports = {
  "Movie": Movie,
  "Person": Person
};
export default __defaultExports;
