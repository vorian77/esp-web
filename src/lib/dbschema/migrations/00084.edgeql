CREATE MIGRATION m1xen4t6jswixqot3hp5kf5pxsr4dq2odd62mc4nzbmkutc5z7rlta
    ONTO m1fudawqjs3dacu3ke7fo7smcskaiczqt4qhaflacjxvfb34mkhsxq
{
  ALTER TYPE sys_db::SysColumn {
      ALTER PROPERTY isExcludeInsert {
          SET REQUIRED USING (<std::bool>{});
      };
      ALTER PROPERTY isExcludeSelect {
          SET REQUIRED USING (<std::bool>{});
      };
      ALTER PROPERTY isExcludeUpdate {
          SET REQUIRED USING (<std::bool>{});
      };
      ALTER PROPERTY isMultiSelect {
          SET REQUIRED USING (<std::bool>{});
      };
      ALTER PROPERTY isSelfReference {
          SET REQUIRED USING (<std::bool>{});
      };
      ALTER PROPERTY isSetBySys {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
