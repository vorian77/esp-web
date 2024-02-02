CREATE MIGRATION m1mjh3zqpagu4qbuei2x7xil2ogemfyvy6qbslqluldkt25k7jkh7a
    ONTO m1eezpkurg44kg3zhnluy7dffghwkmr62q3ygiibye6odfyzpeiaoq
{
  CREATE FUNCTION sys_core::getOverlayNode(overlayNodeName: std::str) -> OPTIONAL sys_core::SysOverlayNode USING (SELECT
      sys_core::SysOverlayNode
  FILTER
      (.name = overlayNodeName)
  );
};
