CREATE MIGRATION m1n4way6kgmbcdquorlalw4gencit2zxhr7w7o3nzhfwrx3wp4dq6q
    ONTO m1cwewvcdeqdeb3t46jovmb2mtt4wcepdgk3aehwhdzcbtavdhuqua
{
  ALTER TYPE default::SysPerson {
      CREATE PROPERTY phoneAlt: std::str;
  };
};
