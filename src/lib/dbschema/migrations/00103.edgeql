CREATE MIGRATION m1use27bzdibeho7juqoqa7sgr3wblqs5kcgubwjgqyhsizejcr55a
    ONTO m13jcgranvc2pmby7cqasyvdbms7gyuhq3rjsl5fymjzul4jtk6ktq
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      CREATE LINK codeReferralEndType: sys_core::SysCode;
      CREATE LINK codeReferralType: sys_core::SysCode;
  };
};
