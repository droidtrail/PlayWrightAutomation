Feature: Feature name
  @Regression
  @foo
  Scenario: Placing the order
    Given a login to Ecommerce application with "leandro.pereiracr@gmail.com" and "x85.2eRYwab6BY"
    When Add "zara coat 4" to Cart
    Then Verify "zara coat 3" is displayed in Cart
    When Enter valid details and place the Order
    Then Verify order in present in the OrderHistory

  @Validation
  Scenario Outline: Placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
      | username           | password |
      | rahulshettyacademy | learninx |
      | hello@123.com      | learninw |