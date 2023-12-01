CREATE MIGRATION m1cznynbcticgh2vgaefjktxewsfyaapzcj6qeqycyyyj2vhtkafmq
    ONTO m1tyzwehsoocsgmvjtunfhi3btliuhu65iiwwybm7lpkyvb2j4jnwq
{
  ALTER TYPE app_cm::ClientServiceFlow {
      ALTER PROPERTY dateReferral {
          SET REQUIRED USING (<cal::local_date>{});
      };
  };
};
