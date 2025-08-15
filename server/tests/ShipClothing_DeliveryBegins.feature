Feature: Outdoor Clothing Shipment Process
  As a logistics manager
  I want to initiate shipments
  So that packaged clothing can be delivered to customers

  Scenario: Given packaged items, when shipment is initiated, then delivery begins
    Given packaged items are ready for shipment
    When a shipment is initiated for these items
    Then the system confirms that delivery has begun