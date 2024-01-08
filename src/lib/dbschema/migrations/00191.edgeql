CREATE MIGRATION m1bzannxogx45hm3cpnhdrp2bj5pbfbb6bmuxof2w6xmtgbvmu7hha
    ONTO m1jtosgtupblru4qznlfymanki6k7gsxmxxgeat6l6j6yh5rzwtsia
{
  ALTER TYPE sys_obj::NodeObj {
      CREATE PROPERTY queryActions: array<std::json>;
  };
};
