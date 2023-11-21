CREATE MIGRATION m1uk4nz2h2mu3ts5fjmshdb5sacfcbn3k5ha562aoulrcqysp7fx2q
    ONTO m1snzg6myang4xa32xaxelszdp7vjpoc3apgdlshtwvlr3pucf6h6a
{
  ALTER TYPE sys_obj::FormFieldEl {
      CREATE MULTI LINK itemsList: sys_obj::FormFieldItemsList {
          ON SOURCE DELETE ALLOW;
      };
      CREATE PROPERTY isMultiSelect: std::bool;
      CREATE PROPERTY itemsListParms: std::str;
  };
};
