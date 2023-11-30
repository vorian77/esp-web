CREATE MIGRATION m1gh5lm2ep63fitpijognrvujzchfm6akkhgrsz4c5ztcxoxpmeyiq
    ONTO m16plceto2d27cj4fd645cc227jf5djmssv7uoc6gsgppaixrajwua
{
  ALTER TYPE sys_obj::Form {
      ALTER PROPERTY exprProcess {
          RENAME TO exprObject;
      };
  };
};
