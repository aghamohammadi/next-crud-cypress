Feature: Home
  Scenario: visiting the home page
    When I visit home page
    Then Title should "Home | Next js CRUD sample & cypress test", Home link should "/", Admin link should "/admin"
    When click Home link
    Then Home click result : Title should "Home | Next js CRUD sample & cypress test", Home link should "/", Admin link should "/admin"
    When click Admin link
    Then Url should contain "/admin"
