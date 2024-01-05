CREATE MIGRATION m1jtosgtupblru4qznlfymanki6k7gsxmxxgeat6l6j6yh5rzwtsia
    ONTO m1w7y7dxa6jkwv25rwvievnn7tenjaj4nq7avn2oizscot5al2266q
{
  ALTER TYPE sys_obj::DataObjFieldEl {
      DROP LINK codeCustomElType;
  };
  ALTER TYPE sys_obj::DataObjFieldEl {
      ALTER PROPERTY customElParms {
          RENAME TO customElement;
      };
  };
};
