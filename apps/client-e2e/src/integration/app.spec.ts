describe('client', () => {

    it('helll worllddd', () =>{
        cy.visit('http://localhost:4200/login')
        //cy.contains("Page 2").click();

        cy.get('input[type=email]').type("timo@email");
        cy.get('input[type=password]').type("1234");

        cy.contains('Log in').click();

    })
  
});
