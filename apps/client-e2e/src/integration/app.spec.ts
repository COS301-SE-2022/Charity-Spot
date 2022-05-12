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

   //registration page
    describe('registration testing', () => {
        beforeEach(() =>cy.visit('/registration-page'));
        it('should direct to the right url', () => {
            cy.url().should('include','registration');
        })

        it('The user should be able to Register', () =>{
            //cy.visit('http://localhost:4200/register')
            cy.contains('Charity-Spot')
            
            cy.get('#rgorgnm2').type("Organisation 1")
            cy.get('input[type=email]').type("timo@email");
            cy.get('#lct1').type("1166 Burnett Street,Hatfield");
            cy.get('#rgpwd1').type("1234");
            cy.get('#rgpwd2').type("1234");
            
    
            cy.contains('Register').click();
            cy.contains('click to Login').click();
        })

    });
