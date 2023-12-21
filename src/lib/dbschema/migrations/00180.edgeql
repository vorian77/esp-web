CREATE MIGRATION m1wrwjuas4ofqzkyj672iej3jqrg437z2nxyrye7j4vluw3u5ejloa
    ONTO m13rj4ddpixc4vmvxwukdejysszd44ophmaahd73eifvt2ywxqtd4q
{
  DROP TYPE sys_obj::Form;
  ALTER TYPE sys_obj::FormFieldDb RENAME TO sys_obj::DataObjFieldDb;
  ALTER TYPE sys_obj::FormFieldItemsList RENAME TO sys_obj::DataObjFieldItems;
  ALTER FUNCTION sys_obj::getFormFieldItemsList(name: std::str) {
      RENAME TO sys_obj::getDataObjFieldItems;
  };
  ALTER TYPE sys_obj::DataObj {
      CREATE MULTI LINK fieldsDb: sys_obj::DataObjFieldDb {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
  ALTER TYPE sys_obj::FormFieldEl RENAME TO sys_obj::DataObjFieldEl;
  ALTER TYPE sys_obj::DataObj {
      CREATE MULTI LINK fieldsEl: sys_obj::DataObjFieldEl {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
