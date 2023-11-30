CREATE MIGRATION m1swjgxcrodohyrot7w7snetrom76kaiqabybxorrv3br6n3fhtfea
    ONTO m15nfn7qqfhy3pl73zgijy4sfs65fev6x7765vuvsnhpy2l5yna33q
{
  CREATE TYPE app_cm::ClientData EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK clientServiceFlow: app_cm::ClientServiceFlow;
  };
  CREATE TYPE app_cm::ClientNote EXTENDING app_cm::ClientData {
      CREATE REQUIRED LINK codePrivacy: sys_core::Code;
      CREATE REQUIRED LINK codeType: sys_core::Code;
      CREATE REQUIRED PROPERTY date: cal::local_date;
      CREATE PROPERTY note: std::str;
  };
};
