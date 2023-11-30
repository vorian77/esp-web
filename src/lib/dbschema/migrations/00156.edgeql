CREATE MIGRATION m1r2di7kyrlpt63xubn4kcrub4naemv6hvdhatn4ngx6xt7yymjnea
    ONTO m1qn5bm46ukxxnuhuribtg4dvd5oe6tv3wekcjgxijdq2atqzjeosa
{
  ALTER TYPE sys_obj::FormFieldEl {
      CREATE LINK codeCustomElType: sys_core::Code;
  };
  ALTER TYPE sys_obj::FormFieldEl {
      CREATE PROPERTY customElParms: std::json;
  };
  ALTER TYPE sys_obj::FormFieldEl {
      DROP PROPERTY labelDynamicKey;
  };
  ALTER TYPE sys_obj::FormFieldEl {
      DROP PROPERTY labelDynamicSource;
  };
  ALTER TYPE sys_obj::FormFieldEl {
      DROP PROPERTY labelHeader;
  };
  ALTER TYPE sys_obj::FormFieldEl {
      DROP PROPERTY labelText;
  };
};
