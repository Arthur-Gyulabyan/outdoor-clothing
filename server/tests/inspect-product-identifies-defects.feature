Feature: Inspect Product Identifies Defects

  Scenario: Given a finished product, when inspection occurs, then defects are identified
    Given a finished product
    When inspection occurs
    Then defects are identified