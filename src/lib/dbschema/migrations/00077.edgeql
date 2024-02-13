CREATE MIGRATION m1iwgid2l73nxck3xpryvq4yq6o2cifwivcw6vzc3dxmlvgtyyysza
    ONTO m1h5ykzzlqhx3aqzjmmuvpnene3s7wghk5k6zoqyvowj3toqor4vvq
{
  ALTER TYPE sys_core::SysOrg {
      ALTER LINK codeState {
          SET TYPE sys_core::SysCode USING (.codeState[IS sys_core::SysCode]);
      };
  };
};
