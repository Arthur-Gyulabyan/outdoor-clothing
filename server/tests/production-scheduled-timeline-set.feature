Feature: Production Scheduling

  Scenario: Given existing orders, when production is scheduled, then timeline is set
    Given existing orders
    When production is scheduled
    Then timeline is set