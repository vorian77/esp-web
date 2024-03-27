CREATE MIGRATION m1xwajey4vjpnk3jfnvdwmmx76r3x3uvugyw2pdvgokcbyjdlrdqga
    ONTO m1ofv32trnnbppsmh5syvw3hgctxqw7zfemqfpssaa2ktulwjfeida
{
  CREATE TYPE sys_core::SysDataObjFieldListConfig EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK dataObjConfig: sys_core::SysDataObj {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
      };
      CREATE REQUIRED LINK dataObjDisplay: sys_core::SysDataObj {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
      };
      CREATE REQUIRED PROPERTY btnLabelComplete: std::str;
      CREATE REQUIRED PROPERTY isMultiSelect: std::bool;
  };
};
