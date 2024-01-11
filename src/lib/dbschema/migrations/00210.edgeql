CREATE MIGRATION m1tgcjkcehfns2fbjjvs3bpynpurbmuugirzymdleu2oieinntexha
    ONTO m1z43zkuh4ry3ugijyu2vjtgosr64jnm3ncj42dj5qnz4xfxudovhq
{
  ALTER TYPE default::Person {
      CREATE LINK codeGender: sys_core::Code;
  };
  ALTER TYPE default::Person {
      DROP PROPERTY gender;
  };
};
