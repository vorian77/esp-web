CREATE MIGRATION m1vpuuirxkybjbmfy7adbkrsox24kiplytrowvigzyro2zoswi2g2q
    ONTO m1lbma5acvrz2jl7jegecgg2vgx6oqwtqfi3jsnvgsufx2yximcwpa
{
  CREATE TYPE app_cm_training::Cohort EXTENDING sys_core::Obj {
      CREATE LINK codeStatus: sys_core::Code;
      CREATE REQUIRED LINK course: app_cm_training::Course;
      CREATE LINK staffAdmin: sys_user::Staff;
      CREATE LINK staffAgency: sys_user::Staff;
      CREATE LINK staffInstructor: sys_user::Staff;
      CREATE LINK venue: sys_core::Org;
      CREATE PROPERTY capacity: std::int16;
      CREATE PROPERTY isCohortRequired: std::str;
      CREATE PROPERTY note: std::str;
      CREATE PROPERTY schedule: std::str;
  };
};
