CREATE MIGRATION m1266sg5jryv5di6itepa335oow7ydtiylxirjbnnkkymc4hykonsq
    ONTO m17jne5oorm7xlms7tblnnkzce47mipd66aeyhxneh7xedneifq7ya
{
  ALTER TYPE sys_obj::DataObj {
      DROP PROPERTY allTabs;
  };
  ALTER TYPE sys_obj::DataObjAction {
      CREATE PROPERTY allTabs: std::bool;
  };
};
