CREATE MIGRATION m1oykd23w4w7k53lulqjdedcp4zctisgmxo6d6ycxdeznxc4uuf4aa
    ONTO m1mjh3zqpagu4qbuei2x7xil2ogemfyvy6qbslqluldkt25k7jkh7a
{
  ALTER TYPE sys_core::SysOverlayNode {
      ALTER PROPERTY btnLabelCompelte {
          RENAME TO btnLabelComplete;
      };
  };
};
