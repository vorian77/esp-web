CREATE MIGRATION m14cpq63q5dt2ehqw5q73gl7wnmqo5yact44ts5ighzehx5fpboj2a
    ONTO m1dxn54aoru7tnmhaivuyclzqm3ljdjtmtpjqckwcaazkfz2v5qhoq
{
  ALTER TYPE sys_core::SysDataObjFieldLink {
      ALTER LINK tabColDisplayDisplay {
          RENAME TO tabColDisplay;
      };
  };
};
