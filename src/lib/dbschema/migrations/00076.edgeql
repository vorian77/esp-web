CREATE MIGRATION m1h5ykzzlqhx3aqzjmmuvpnene3s7wghk5k6zoqyvowj3toqor4vvq
    ONTO m1eq6f3jiapbtkunlsynvzk3ga745gfav636t5ge4sxyndu5jjthda
{
  ALTER TYPE sys_core::SysOrg {
      ALTER LINK state {
          RENAME TO codeState;
      };
  };
};
