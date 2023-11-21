CREATE MIGRATION m1ilnd3nce6xwofpucl4hkabfshu3p3bruptsmhyheimx5ur56uzlq
    ONTO m17aryvorhexq27symzvz6wzsgcg3y5mtqiajqelenakadu6ea4ypa
{
  CREATE TYPE sys_user::Staff EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK owner: sys_core::ObjRoot;
      CREATE REQUIRED LINK person: default::Person {
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK roles: sys_core::Code;
  };
};
