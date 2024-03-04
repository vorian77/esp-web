CREATE MIGRATION m1ofv32trnnbppsmh5syvw3hgctxqw7zfemqfpssaa2ktulwjfeida
    ONTO m1ukrc5ve5xsd6vidnlnquk253pw6izzodmqcm3fjsgg2l36ktuw5q
{
  ALTER TYPE sys_db::SysColumn {
      CREATE PROPERTY toggleValueShow: std::bool;
  };
};
