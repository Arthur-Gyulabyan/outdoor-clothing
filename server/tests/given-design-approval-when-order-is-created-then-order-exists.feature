Feature: Outdoor Clothing Production Workflow

  Scenario: Given design approval, when order is created, then order exists
    Given design approval
    When order is created
    Then order exists