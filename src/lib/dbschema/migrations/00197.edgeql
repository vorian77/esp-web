CREATE MIGRATION m1hrbu6myaogtlmtszlhznpkb6qofckaakx2miqa5br277l47yly6a
    ONTO m1zrtgwnu5jx6s2fqn4hwacbgpqcr6fyth6cad2asyi2zefh6jpvaa
{
  ALTER TYPE app_cm_training::CsfCohort {
      ALTER LINK codeOutcomes {
          RENAME TO codeMultiCerts;
      };
  };
};
