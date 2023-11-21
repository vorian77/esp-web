CREATE MIGRATION m1qm6b63lx3vjoernqtc6tpwpj3gouae4dhagdsz7akjg3ntsslpfq
    ONTO m1hiupzgtdtvarr4gawd34pkwcvi3eamwui2aerl5p7o3bbfdthnsa
{
  ALTER TYPE default::Person {
      CREATE PROPERTY favFood: std::str;
  };
};
