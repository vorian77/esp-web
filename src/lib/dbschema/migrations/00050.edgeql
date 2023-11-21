CREATE MIGRATION m1ck33zukfs6eb2kdhlu4emudwdiczautumirjfiqncclqy3gjitcq
    ONTO m135feiyc2ipsv2lbhuw3icrsy5najp65oveocednzlhqsc6djf4ia
{
  ALTER TYPE app_cm_training::Course {
      CREATE REQUIRED PROPERTY codeCategory: std::int16 {
          SET REQUIRED USING (<std::int16>{});
      };
      CREATE PROPERTY userContact: std::int16;
  };
};
