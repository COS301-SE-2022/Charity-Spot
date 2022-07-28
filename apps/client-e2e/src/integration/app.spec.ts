describe('client', () => {

    //registration page
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
            cy.get('#lct1').type("Pretoria");
            cy.get('#rgpwd1').type("1234");
            cy.get('#rgpwd2').type("1234");
            
            //cy.contains('Register').click();
            cy.get('#rgsub_butt').click();
        })

    });


    //login page
    describe('login page testing', () => {
        //beforeEach(() =>cy.visit('/login-page'));
        beforeEach(() =>cy.visit('http://localhost:4200/login'));
        it('should direct to the right url', () => {
            cy.url().should('include','login');
        })

    it('The user should be able to login', () =>{
        //cy.visit('http://localhost:4200/login')

        cy.get('input[type=email]').type("test@gmail.com");
        cy.get('input[type=password]').type("1234");

        cy.contains('Log in').click();

    })

});
    
    //donation page
    describe('donate page testing', () => {
        beforeEach(() => cy.visit('http://localhost:4200/donate'));
        it('should direct you to the right url', () => {
            cy.url().should('include','donate');

        it('The user should be able to donate an item', () => {
            cy.get('.din1').type('Jackets');//Name
            cy.get('.din2').type('4');//Quantity
            //cy.get('select').select('Clothing').should('have.value','Clothes');//Food Item
            cy.get('.din3').select('Clothing').should('have.value','Clothes');//Food Item
            cy.get('.din4').select('Used').should('have.value','Used');//Condition
            cy.get('.din5').type('Consists of 1 pink,1 black,1 green and 1 blue jacket');//Description
            cy.get('#dnt_but').click();
        })

        })
    });
    
      //profile page
    describe('profile page testing', () => {
        beforeEach(() => cy.visit('http://localhost:4200/profile'));
        it('should direct you to the right url', () => {
            cy.url().should('include','profile');

        it('The user should be able to view an organisations profile page', () => {
            cy.get('#chatGo').click();
        })

        })
    });
    
    //chat page
    describe('chat page testing', () => {
        beforeEach(() => cy.visit('http://localhost:4200/chat'));
        it('should direct you to the right url', () => {
            cy.url().should('include','chat');

        it('The user should be able to view the chat area', () => {
            //cy.get('#chatGo').click();
            cy.get('.client-chat_myText__3vWpw').type("Hello i am testing the chat feature");
            cy.get('.client-chat_sndBT__3serM').click();
        })

        })
    });

/*cy.get('id') - by tag
cy.get('.id') - by class 
cy.get('#id')- by id*/

});
