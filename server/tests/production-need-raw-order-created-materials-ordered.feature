Feature: Outdoor Clothing Production
  As a production manager
  I want to order materials
  So that I can fulfill production needs

  Scenario: Given production need, when raw order is created, then materials are ordered
    Given production need
    When raw order is created
    Then materials are ordered