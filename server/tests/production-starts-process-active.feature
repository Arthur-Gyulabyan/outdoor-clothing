Feature: Production Process Management

  Scenario: Given a set schedule, when production starts, then process is active
    Given a set schedule
    When production starts
    Then process is active