CREATE MIGRATION m1dr6oc5qlmhuk65ofvzmlaahcwv56v2q5iud3c5ldluuo6xcz56da
    ONTO m1hoztq6fmnvbnlsaspj3p5f6u4sxhvwlyatv4uclvjs7q5rklpvha
{
  ALTER TYPE sys_user::Staff {
      DROP LINK roles;
  };
};
