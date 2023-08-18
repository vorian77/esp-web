module default {
  scalar type Name extending str {
    constraint min_len_value(3);
  }

  abstract type Person {
    first_name: Name;
    last_name: Name;
    property full_name := .first_name ++ ' ' ++ .last_name;
  }

  abstract type Mgmt {
    required created_at: datetime {
      default := datetime_of_transaction();
      readonly := true;
    };

    required created_by: Person {
      readonly := true;
    };
    
    modified_at: datetime {
      rewrite insert, update using (datetime_of_transaction())
    }

    required modified_by: Person 
  }

  scalar type non_negative extending int64 {
    constraint min_value(0);
  }
}
