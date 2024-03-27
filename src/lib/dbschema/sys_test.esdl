module sys_test {
  type Person {
    required name: str {
      constraint exclusive;
    };
  }

  type Movie {
    title: str;
    multi actors: Person;
  }
};