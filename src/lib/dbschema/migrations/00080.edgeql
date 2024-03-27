CREATE MIGRATION m1y2ffnmbaomub52ululfettcsqbyxh6hur3ojla3aosr3pfyhm7ya
    ONTO m1m4wgybju5nhcksvyx6z2ce7c4sll2bgb7crkn7qvysappqxpwcaq
{
  CREATE TYPE app_cm::CmCsfDocument EXTENDING app_cm::CmCsfData {
      CREATE REQUIRED LINK codeCategory: sys_core::SysCode;
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE REQUIRED LINK staffAgency: sys_user::SysStaff;
      CREATE PROPERTY dateExpires: cal::local_date;
      CREATE REQUIRED PROPERTY dateIssued: cal::local_date;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY file: std::json;
      CREATE PROPERTY note: std::str;
      CREATE PROPERTY other: std::str;
  };
};
