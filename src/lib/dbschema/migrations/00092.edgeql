CREATE MIGRATION m1d2rcfkcnkk7zlxux4f2rsfgy32lj6x5yj36f3qkar26236x7yhtq
    ONTO m1kzmhlyiaubbmjsatrffaxte5bw2wzf2quwi3lmwbtk5eilvs6pla
{
  ALTER TYPE sys_core::SysDataObjFieldItems RENAME TO sys_core::SysDataObjFieldListItems;
};
