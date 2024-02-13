module default {
  scalar type Name extending str;

  type SysPerson {
    addr1: str;
    addr2: str;
    avatar: json;
    birthDate: cal::local_date;
    city: str;
    codeEthnicity: sys_core::SysCode;
    codeGender: sys_core::SysCode;
    codeRace: sys_core::SysCode;
    codeState: sys_core::SysCode;
    email: str;
    favFood: str;
    required firstName: Name;
    property fullName := .firstName ++ ' ' ++ .lastName;
    required lastName: Name;
    note: str;
    phoneAlt: str;
    phoneMobile: str;
    title: str;
    zip: str;
  }
  
  scalar type nonNegative extending int64 {
    constraint min_value(0);
  }
}