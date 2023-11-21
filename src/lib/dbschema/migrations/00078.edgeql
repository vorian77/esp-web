CREATE MIGRATION m1z6mzmyhntcg2dtihsmyyxhpuazimxc6agpbc4o53lgcemo4etgjq
    ONTO m1i7pzg4xvversnlpozf5wpffwtj2vb5sonzv7jl2ph7oupmznynca
{
  ALTER TYPE sys_core::Code {
      CREATE LINK parent: sys_core::Code;
      ALTER PROPERTY index {
          SET REQUIRED USING (<default::nonNegative>{});
      };
  };
  ALTER TYPE sys_core::CodeType {
      CREATE REQUIRED PROPERTY index: default::nonNegative {
          SET REQUIRED USING (<default::nonNegative>{});
      };
  };
};
