describe('client', () => {

    //login page
    describe('login page testing', () => {
        beforeEach(() =>cy.visit('/login-page'));
        it('should direct to the right url', () => {
            cy.url().should('include','login');
        })

    })
});
