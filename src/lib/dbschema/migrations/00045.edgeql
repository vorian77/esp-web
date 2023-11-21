CREATE MIGRATION m1ntcfellh3l6oixabetw3eaed3yr6vpgpdd73rruptm7lnvqrn35a
    ONTO m1rajvm2ex4kxgeb7ld4pfqvfouz6vpqtvtg56uqkskiyjnei2lu6q
{
  CREATE MODULE app_cm_training IF NOT EXISTS;
  CREATE TYPE app_cm_training::Course EXTENDING sys_core::Obj, default::Mgmt {
      CREATE REQUIRED LINK codeCategory: sys_core::Code;
      CREATE LINK userContact: sys_user::User;
      CREATE REQUIRED PROPERTY active: std::bool;
      CREATE PROPERTY description: std::str;
  };
  CREATE TYPE app_cm_training::Section EXTENDING sys_core::Obj, default::Mgmt {
      CREATE REQUIRED LINK course: app_cm_training::Course;
      CREATE REQUIRED LINK codeStatus: sys_core::Code;
      CREATE LINK userInstructor: sys_user::User;
      CREATE PROPERTY dateEnd: cal::local_date;
      CREATE REQUIRED PROPERTY dateStart: cal::local_date;
      CREATE PROPERTY note: std::str;
  };
};
