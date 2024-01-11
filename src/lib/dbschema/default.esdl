module default {
  scalar type Name extending str;

  type Person {
    addr1: str;
    addr2: str;
    avatar: json;
    birthDate: cal::local_date;
    city: str;
    codeEthnicity: sys_core::Code;
    codeGender: sys_core::Code;
    codeRace: sys_core::Code;
    codeState: sys_core::Code;
    email: str;
    favFood: str;
    required firstName: Name;
    property fullName := .firstName ++ ' ' ++ .lastName;
    required lastName: Name;
    note: str;
    phoneMobile: str;
    zip: str;
  }
  
  scalar type nonNegative extending int64 {
    constraint min_value(0);
  }
}