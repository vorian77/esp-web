CREATE MIGRATION m15nfn7qqfhy3pl73zgijy4sfs65fev6x7765vuvsnhpy2l5yna33q
    ONTO m1jsepnv34visufnc27uoglm3hs3zyiwxdhztbss25eg3zkfpvd3tq
{
  CREATE TYPE app_cm::ServiceFlow EXTENDING sys_core::Obj;
  CREATE TYPE app_cm::ClientServiceFlow EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeStatus: sys_core::Code;
      CREATE REQUIRED LINK serviceFlow: app_cm::ServiceFlow;
      CREATE REQUIRED LINK student: app_cm::Student;
      CREATE PROPERTY dateEnd: cal::local_date;
      CREATE PROPERTY dateEndEst: cal::local_date;
      CREATE PROPERTY dateStart: cal::local_date;
      CREATE PROPERTY dateStartEst: cal::local_date;
      CREATE PROPERTY note: std::str;
  };
};
