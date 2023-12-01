CREATE MIGRATION m1il4zg3l2f5rcedqzwpbvjfdabdfpdbg5u6sgithsrdij4iikuuia
    ONTO m1dkzu7uhy42lc42go3adga2eaaom5c44hdxdol4oiqtyrfenmruua
{
  ALTER TYPE app_cm::Student RENAME TO app_cm::Client;
  ALTER TYPE app_cm::ClientServiceFlow {
      ALTER LINK student {
          RENAME TO client;
      };
  };
};
