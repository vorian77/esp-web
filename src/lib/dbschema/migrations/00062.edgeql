CREATE MIGRATION m1yjqycirt7r5i3f3d6oar6cq2rnx7e6qupj5u2kszyuytvt3q4dtq
    ONTO m1er4l47sify2653ly5m3iv6ztdvkmz5zpkgnxd5jqyuyh2gqrjqeq
{
  CREATE TYPE sys_obj::FormFieldItemsList EXTENDING sys_core::Obj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE MULTI LINK fieldsDb: sys_obj::FormFieldDb {
          ON SOURCE DELETE DELETE TARGET;
      };
      CREATE REQUIRED PROPERTY dbSelect: std::str;
      CREATE REQUIRED PROPERTY propertyId: std::str;
      CREATE REQUIRED PROPERTY propertyLabel: std::str;
  };
  CREATE FUNCTION sys_obj::getFormFieldItemsList(name: std::str) -> OPTIONAL sys_obj::FormFieldItemsList USING (SELECT
      sys_obj::FormFieldItemsList
  FILTER
      (.name = name)
  );
  CREATE TYPE sys_obj::FormFieldItemsElement {
      CREATE PROPERTY itemId: std::int32;
      CREATE PROPERTY label: std::str;
  };
  ALTER TYPE sys_obj::FormFieldEl {
      CREATE MULTI LINK items: sys_obj::FormFieldItemsElement {
          ON SOURCE DELETE DELETE TARGET;
      };
      CREATE MULTI LINK itemsList: sys_obj::FormFieldItemsList {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
