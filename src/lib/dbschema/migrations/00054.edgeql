CREATE MIGRATION m16klr4c7yynxw5py7uqu6wgv5or3q7gb46xob2lgjs7wabgfam4aa
    ONTO m1tyv3pgohtfry6he3vlwtknwbunegx4hw3dky7eyjie2iwvgwvvca
{
  ALTER TYPE sys_obj::FormFieldElItem RENAME TO sys_obj::FormFieldItemsElement;
};
