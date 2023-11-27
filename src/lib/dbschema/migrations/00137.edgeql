CREATE MIGRATION m1yxu35vaxld2w6t4k7p4tou7uemqjthzwukc6rewsuryyxsbvos4q
    ONTO m1dr6oc5qlmhuk65ofvzmlaahcwv56v2q5iud3c5ldluuo6xcz56da
{
  ALTER TYPE sys_user::Staff {
      CREATE MULTI LINK roles: sys_core::Code {
          ON TARGET DELETE ALLOW;
      };
  };
};
