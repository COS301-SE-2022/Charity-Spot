describe('client', () => {

    const input = "Hello World";

    it('Visit Page 2 and enter a string', () =>{
        cy.visit('http://localhost:4200')
        //cy.contains("Page 2").click();

        cy.get('input[type=email]').type("test@email");
        cy.get('input[type=password]').type("123");

        cy.contains('Log in').click();
    })



    it('Visit Page 2 and enter a string', () =>{
        cy.visit('http://localhost:4200')
        //cy.contains("Page 2").click();

        cy.get('input[type=email]').type("test@email");
        cy.get('input[type=password]').type("1235");

        cy.contains('Log in').click();
    })

    /*it('Go back to root', ()=>{
        cy.visit('http://localhost:4200')
    })*/
  
});
