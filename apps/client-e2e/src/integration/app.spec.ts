describe('client', () => {

    //login page
    describe('login page testing', () => {
        beforeEach(() =>cy.visit('/login-page'));
        it('should direct to the right url', () => {
            cy.url().should('include','login');
        })

    it('The user should be able to login', () =>{
        //cy.visit('http://localhost:4200/login')

        cy.get('input[type=email]').type("timo@email");
        cy.get('input[type=password]').type("1234");

        cy.contains('Log in').click();

    })
});
