CREATE MIGRATION m1mn6dfqymi33tsh2gvjnlx3l6jh467m6tihb2mxm6zkim2npq2i2a
    ONTO m12mkwgqftvwncnqb6hwnhxnowewkhwc3okspldjip2hztbkuwjs3q
{
  ALTER TYPE sys_core::Ent {
      ALTER LINK roles {
          RESET ON SOURCE DELETE;
          ON TARGET DELETE ALLOW;
      };
  };
};
