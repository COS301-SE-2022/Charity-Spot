/*describe('client', () => {

    it('helll worllddd', () =>{
        cy.visit('http://localhost:4200/login')
        //cy.contains("Page 2").click();

        cy.get('input[type=email]').type("timo@email");
        cy.get('input[type=password]').type("1234");

        cy.contains('Log in').click();

    })
  
});*/

describe('client', () => {

    Cypress.Cookies.debug(true) 

    //login page
    describe('login page testing', () => {
        beforeEach(() =>cy.visit('/login-page'));
        it('should direct to the right url', () => {
            cy.url().should('include','login');
        })

    it('The user should be able to login', () =>{
        cy.visit('http://localhost:4200/login')

        cy.get('input[type=email]').type("seal@email");
        cy.get('input[type=password]').type("123");

        cy.contains('Log in').click();

        //cy.visit('http://localhost:4200/profile')

    });
    });
    
    
    /*describe('profile page testing', () => {
        beforeEach(() =>cy.visit('/profile'));
        it('should direct to the right url', () => {
            cy.url().should('include','profile');
        })

    it('The user should be able to view their organisations profile page', () =>{
        cy.visit('http://localhost:4200/profile')

        cy.contains('#logout1');
        cy.contains('Type');
        cy.contains('Email');
        cy.contains('Name');
        cy.contains('Date Registered');
        cy.contains('Location');

        cy.contains('Home').click();


    
    });
    });*/

});
