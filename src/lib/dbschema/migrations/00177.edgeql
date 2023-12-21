CREATE MIGRATION m17jne5oorm7xlms7tblnnkzce47mipd66aeyhxneh7xedneifq7ya
    ONTO m1tc6twsrcikudhlscxqlos3feiha5f2ivog7pfdahxamxgasp4eza
{
  ALTER TYPE sys_obj::DataObj {
      CREATE PROPERTY allTabs: std::bool;
  };
};
