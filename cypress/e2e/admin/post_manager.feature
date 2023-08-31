Feature: Create Read Edit Delete Post
  Scenario: Enter to Create Page
    Given Start to post page
    When click create button
    Then Visit create page. Url should contain "/admin/create"
  Scenario: Invalid Title,Summary, InsertDate, ImageFile,Content  Validation
    Given create page
    When User enter Title "ahmad aghamohammadi aghamohammadi aghamohammadi aghamohammadi aghamohammadi".user will recieve a message "You have reached your maximum limit of characters allowed (70)"
    And User click on Submit button
    Then user will stay on create page "/admin/create"

  Scenario: User Creates, Read, Edit, Delete a Post
    Given user enter to create page
    When user creates a post with following data
      | Title | Summary | InsertDate | Content | ImageFile | Published |
      | CypressTitle | CypressSummary | 2023-08-30 | CypressContent | cypress/e2e/admin/image.jpg | True |
    Then user can get all posts and filter with below data and get "1" record
      | Title | Summary | InsertDate | Content | ImageFile | Published |
      | CypressTitle | CypressSummary | 2023-08-30 | CypressContent | cypress/e2e/admin/image.jpg | True |
    When user edit post with new data by Title of "CypressTitle"
      | Title | Summary | InsertDate | Content | ImageFile | Published |
      | CypressTitle2 | CypressSummary2 | 2023-08-31 | CypressContent2 | cypress/e2e/admin/image.jpg | True |
    Then user can get all posts and filter with below data and get "0" record
      | Title | Summary | InsertDate | Content | ImageFile | Published |
      | CypressTitle | CypressSummary | 2023-08-30 | CypressContent | cypress/e2e/admin/image.jpg | True |
    When user can get all posts and filter with below data and get "1" record
      | Title | Summary | InsertDate | Content | ImageFile | Published |
      | CypressTitle2 | CypressSummary2 | 2023-08-31 | CypressContent2 | cypress/e2e/admin/image.jpg | True |
    And user delete post with Title of "CypressTitle2"
    Then user can get all posts and filter with below data and get "0" record
      | Title | Summary | InsertDate | Content | ImageFile | Published |
      | CypressTitle2 | CypressSummary2 | 2023-08-31 | CypressContent2 | cypress/e2e/admin/image.jpg | True |
