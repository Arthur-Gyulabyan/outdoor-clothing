Feature: Clothing Packaging
  As a logistics manager
  I want to package finished clothing items
  So that they can be prepared for shipment

  Scenario: Given approval, when packaging occurs, then item is ready for shipping
    Given a clothing item has successfully completed production and passed quality inspection
    When the packaging process is initiated for the approved item
    Then the item should be successfully packaged and marked as ready for shipping