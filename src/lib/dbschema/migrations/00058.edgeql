CREATE MIGRATION m177evj7aq5muzqm7ciomkf2rdcyrxt57lnexv3b2fjsamjzik5bhq
    ONTO m1selkuual2igdpwed6hoc3wagfkqfqlm3sqao5vuymfp5cn6wlxqa
{
  ALTER TYPE sys_obj::FormFieldItemsList {
      ALTER PROPERTY dbSelect {
          SET REQUIRED USING (<std::str>{});
      };
      ALTER PROPERTY propertyId {
          SET REQUIRED USING (<std::str>{});
      };
      ALTER PROPERTY propertyLabel {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
