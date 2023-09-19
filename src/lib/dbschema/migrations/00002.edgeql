CREATE MIGRATION m1r7w7zrg5vcalthukfmkmbzyggvk3dclhk5q325l2pnrhwzpvy6cq
    ONTO m1r3urhrjvipjkcj6xfbny6caqzw4p7fhaq6gyenzffifjnhie57pa
{
  ALTER TYPE sys_form::FormField {
      ALTER PROPERTY header {
          RENAME TO label;
      };
  };
};
