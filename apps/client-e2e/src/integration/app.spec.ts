describe('client', () => {

    describe('registration testing', () => {
        beforeEach(() =>cy.visit('http://localhost:4200/register'));
        it('should direct to the right url', () => {
            cy.url().should('include','register');
        })
      
      
 /*cy.get('id') - by tag
cy.get('.id') - by class 
cy.get('#id')- by id*/




});
