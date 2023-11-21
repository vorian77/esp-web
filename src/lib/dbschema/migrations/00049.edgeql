CREATE MIGRATION m135feiyc2ipsv2lbhuw3icrsy5najp65oveocednzlhqsc6djf4ia
    ONTO m1javkof7wifbhvvygfrasvigfwfrggm24rdpeu24g6kv3b3aczehq
{
  ALTER TYPE app_cm_training::Course {
      DROP LINK codeCategory;
      DROP LINK userContact;
  };
};
