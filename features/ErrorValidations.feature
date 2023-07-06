Feature: Feature name
  @Validation
  Scenario Outline: Placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
      | username           | password |
      | rahulshettyacademy | learninx |
      | hello@123.com      | learninw |
