module default {
  scalar type Name extending str;

  type Person {
    addr1: str;
    addr2: str;
    avatar: json;
    birthDate: cal::local_date;
    city: str;
    codeRace: sys_core::Code;
    codeState: sys_core::Code;
    email: str;
    ethnicity: json;
    favFood: str;
    required firstName: Name;
    property fullName := .firstName ++ ' ' ++ .lastName;
    gender: str;
    required lastName: Name;
    note: str;
    phoneMobile: str;
    zip: str;
  }
  
  scalar type nonNegative extending int64 {
    constraint min_value(0);
  }
}