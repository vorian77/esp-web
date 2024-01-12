CREATE MIGRATION m1htl7qkh7i3moqv27r7kn2ht3ygvdpl7bzmor4wzlemar62dsldyq
    ONTO m1uls6o4ih4nxefol7a665ae72dalmzyrynapq44tlymq3get6qzfa
{
  CREATE TYPE app_cm::CsfCertification EXTENDING app_cm::CsfData {
      CREATE REQUIRED LINK codeCert: sys_core::Code;
      CREATE REQUIRED LINK course: app_cm_training::Course;
      CREATE REQUIRED LINK staffAgency: sys_user::Staff;
      CREATE PROPERTY dateExpires: cal::local_date;
      CREATE REQUIRED PROPERTY dateIssued: cal::local_date;
      CREATE PROPERTY imageCertification: std::json;
      CREATE PROPERTY note: std::str;
  };
};
