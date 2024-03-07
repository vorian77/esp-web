CREATE MIGRATION m1zujjgifon5kzthw2ihqk5zio273kewxwxkhqagqk4nbkuzh5r3sq
    ONTO m1tkp7l45lt4htsxv74fnopaqmve4ksalmififu46utqvzmgkhp7sq
{
  ALTER TYPE sys_core::SysDataObjAction {
      ALTER LINK actionType {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
      ALTER PROPERTY checkObjChanged {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
