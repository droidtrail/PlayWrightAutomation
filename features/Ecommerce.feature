Feature: Feature name
  Scenario: Placing the order
    Given a login to Ecommerce application with "leandro.pereiracr@gmail.com" and "x85.2eRYwab6BY"
    When Add "zara coat 3" to Cart
    Then Verify "zara coat 3" is displayed in Cart
    When Enter valid details and place the Order
    Then Verify order in present in the OrderHistory