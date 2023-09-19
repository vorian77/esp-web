module default {
  scalar type Name extending str {
    constraint min_len_value(3);
  }

  abstract type Person {
    firstName: Name;
    lastName: Name;
    property fullName := .firstName ++ ' ' ++ .lastName;
  }

  abstract type Mgmt {
    required createdAt: datetime {
      default := datetime_of_transaction();
      readonly := true;
    };

    required createdBy: Person {
      readonly := true;
    };
    
    modifiedAt: datetime {
      rewrite insert, update using (datetime_of_transaction())
    }

    required modifiedBy: Person 
  }

  scalar type nonNegative extending int64 {
    constraint min_value(0);
  }
}