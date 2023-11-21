CREATE MIGRATION m1snzg6myang4xa32xaxelszdp7vjpoc3apgdlshtwvlr3pucf6h6a
    ONTO m16klr4c7yynxw5py7uqu6wgv5or3q7gb46xob2lgjs7wabgfam4aa
{
  CREATE TYPE sys_obj::FormFieldItemsList EXTENDING sys_core::Obj {
      CREATE MULTI LINK fieldsDb: sys_obj::FormFieldDb {
          ON SOURCE DELETE DELETE TARGET;
      };
      CREATE PROPERTY dbSelect: std::str;
      CREATE PROPERTY propertyId: std::str;
      CREATE PROPERTY propertyLabel: std::str;
  };
};
