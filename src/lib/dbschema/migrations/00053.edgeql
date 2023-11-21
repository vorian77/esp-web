CREATE MIGRATION m1tyv3pgohtfry6he3vlwtknwbunegx4hw3dky7eyjie2iwvgwvvca
    ONTO m1bh35f6pqbnzqql6q27kudx7ayy3mgwdqes4ihvqpviwgvcxubhka
{
  ALTER TYPE sys_obj::DataObjAction {
      CREATE PROPERTY color: std::str;
  };
};
