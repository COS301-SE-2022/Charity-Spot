describe('client', () => {

    describe('registration testing', () => {
        beforeEach(() =>cy.visit('http://localhost:4200/register'));
        it('should direct to the right url', () => {
            cy.url().should('include','register');
        })
      
      it('The user should be able to Register', () =>{
           cy.visit('http://localhost:4200/register')
            
            cy.get('#rgorgnm1').select('Organization').should('have.value','Organization');

            cy.get('#rgorgnm2').type("Organisation 1")
            cy.get('input[type=email]').type("test@gmail.com");
         })
      
 /*cy.get('id') - by tag
cy.get('.id') - by class 
cy.get('#id')- by id*/




});
