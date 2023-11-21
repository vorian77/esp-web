CREATE MIGRATION m1ylscn7bpat3aclaepa3bls5zssrywf2vngumi6nyn4ntdiwuiazq
    ONTO m1mc3bwjnv74tzr7r3sio4wxycf45qqvefgwsaktftc7fc7z2yp4aa
{
  ALTER TYPE sys_obj::FormFieldDb {
      ALTER PROPERTY isDbIdentity {
          RENAME TO isDbFilter;
      };
  };
};
