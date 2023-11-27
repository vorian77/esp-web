CREATE MIGRATION m1vrhstjixavelqvpta5fqdczitsvirtezpl77oaqdckg25fn5qufa
    ONTO m1eh7nbtm6pv6r7mtwbhxcxa2m3m3vc6oxgrfv7nakqtpevngxh22a
{
  CREATE FUNCTION app_cm_training::getCMTrainingCourse(name: std::str) -> OPTIONAL app_cm_training::Course USING (SELECT
      std::assert_single((SELECT
          app_cm_training::Course
      FILTER
          (.name = name)
      ))
  );
};
