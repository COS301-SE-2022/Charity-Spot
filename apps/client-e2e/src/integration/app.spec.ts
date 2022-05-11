describe('client', () => {

    const input = "Hello World";

    it('Visit Page 2 and enter a string', () =>{
        cy.visit('http://localhost:4200')
        cy.contains("Page 2").click();

        cy.get('input[name=username]').type("Hello World!");
    })

    it('Go back to root', ()=>{
        cy.visit('http://localhost:4200')
    })
  
});
