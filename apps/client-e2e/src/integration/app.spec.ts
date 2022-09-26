import { waitForDebugger } from "inspector";

describe('Charity-Spot Integration Test', () => {

    //save cookies between tests

      Cypress.Cookies.defaults({
        preserve: ['ID', 'ID_EXT', 'foreignID'],
      });

    //register charity

    it('should navigate to register page', () => {
        cy.visit('http://localhost:4200/register');
        cy.url().should('include','register');
    })

    it('should register charity', () => {
        cy.get('#rgorgnm1').select("Willing to assist");
        cy.get('#rgorgnm2').type("Charity 1");
        cy.get('#emil1').type("charity1@email.comm");
        cy.get('button.custom-file-upload').click().then(() => { cy.wait(2000).then(() => { 

            cy.get('.modal').trigger('pointerdown', {clientX: 300, clientY: 600})
            cy.get('.modal').trigger('pointerup', {clientX: 300,clientY: 600})
        
            }); 
        });

        cy.get('.btn-close').click();

        cy.get('#rgpwd1').type('1234');
        cy.get('#rgpwd2').type('1234');

        cy.get('#rgsub_butt').click();


    });

    it('should enter email verification', () => {

        cy.get('#emailcodeinput').type('demo');
        cy.get('.ripple').click().then(() => { cy.wait(10000);});
    })

    it('should direct to the login page', () => {
            
        cy.url().should('include','login');
    })

    it('The user should be able to login', () =>{

        cy.get('input[type=email]').type("charity1@email.comm");
        cy.get('input[type=password]').type("1234");

        cy.contains('Log in').click();
    })

    it('should direct to the home page', () => {
            
        cy.url().should('include','home');
    })

    //Donate item
    it("Do to donate page", () => {

        cy.get('[data-rr-ui-event-key="donate"]').click();

    });

    it('should direct to the donate page', () => {
            
        cy.url().should('include','donate');
    })

    it("donate item", () => {

        cy.get('.din1').type("apples");
        cy.get('.din2').type("1");
        cy.get('.din5').type("This is an apple");

        cy.get('#dnt_but').click();
    })

    //register client


    it('should navigate to register page', () => {
        cy.visit('http://localhost:4200/register');
        cy.url().should('include','register');
    })

    it('should register client', () => {
        cy.get('#rgorgnm1').select("In Need");
        cy.get('#rgorgnm2').type("Client 1");
        cy.get('#emil1').type("client1@email.comm");
        cy.get('button.custom-file-upload').click().then(() => { cy.wait(2000).then(() => { 

            cy.get('.modal').trigger('pointerdown', {clientX: 300, clientY: 600})
            cy.get('.modal').trigger('pointerup', {clientX: 300,clientY: 600})
        
            }); 
        });

        cy.get('.btn-close').click();

        cy.get('#rgpwd1').type('1234');
        cy.get('#rgpwd2').type('1234');

        cy.get('#rgsub_butt').click();


    });

    it('should enter email verification', () => {

        cy.get('#emailcodeinput').type('demo');
        cy.get('.ripple').click().then(() => { cy.wait(10000);});
    })

    it('should direct to the login page', () => {
            
        cy.url().should('include','login');
    })

    it('The user should be able to login', () =>{

        cy.get('input[type=email]').type("client1@email.comm");
        cy.get('input[type=password]').type("1234");

        cy.contains('Log in').click();
    })

    it('should direct to the home page', () => {
            
        cy.url().should('include','home');

    })


    
    //client test

        //login page
        /*it('should direct to the right url', () => {
            cy.visit('http://localhost:4200/login');
            cy.url().should('include','login');
        })


        it('The user should be able to login', () =>{

            cy.get('input[type=email]').type("client1@email.com");
            cy.get('input[type=password]').type("1234");

            cy.contains('Log in').click();
        })


        //home page
        it('should direct to the right url', () => {
            
            cy.url().should('include','home');
        })*/

        it('should be taken to profile page of org', () => {

            cy.get('[title="Charity 1"] > img').click();

        });


        //profile page
        it('should direct to the right url', () => {
            cy.url().should('include','profile');
        })

        it('should be taken to profile page of org', () => {

            cy.get('.blog').click();

        });

        it('should be able to view item', () => {
            cy.get(':nth-child(1) > .rapper > .collapsible > label').click();

            //cy.get('#P10pic').should('be.visible');
            
        })

        it('should navigate back to profile page', () => {
            cy.get('.profTab').click();
        })


        //chat test
        it('should open a chat window', () => {
            cy.get('#chatGo').click();
            cy.url().should('include','chat');
        
        })

        it('should send message', () => {

            cy.get('#inputBoxM').type("hello world");
            cy.get('.client-chat_sndBT__3serM').click();

        });

        it('should navigate to active char sessions', () => {

            cy.get('[data-rr-ui-event-key="chatSession"]').click();

        })

    //charity test

        it('should be logged out of client profile', () =>{

            cy.visit('http://localhost:4200/login');
            cy.url().should('include','login');

        });

        it('charity should be able to login', () =>{

            cy.get('input[type=email]').type("charity1@email.comm");
            cy.get('input[type=password]').type("1234");

            cy.contains('Log in').click();
        });

        //home page
        it('should direct to the right url', () => {
            cy.url().should('include','home');
        })

        //notifications
        it('should be able to view notifications', () => {

            cy.get('#notButton > svg > path').click();
            cy.get('#chatHistGo').click();

        });

        //donate
        it('should direct to the right url', () => {
            cy.url().should('include','chat');
        })

        it('should be able to navigate to profile', () => {
            cy.get('#chatNameP').click();
        })

        it('should direct to the right url', () => {
            cy.url().should('include','profile');
        })

        it('should be able to navigate to profile', () => {
            cy.get('#delivGo').click();
        })

        it('should direct to the right url', () => {
            cy.url().should('include','scheduleDelivery');
        })

        it('should be able to confirm', () => {
            cy.get('#deliv_but').click();
        })

        //donate schedule

        it('should be able to navigate to profile', () => {
            cy.get('[data-rr-ui-event-key="donationSchedule"]').click();
        })

        it('should direct to the right url', () => {
            cy.url().should('include','donationSchedule');
        })

        //return to home page

        it('should be able to navigate to home', () => {
            cy.get('[data-rr-ui-event-key="home"]').click();
        })

        it('should direct to the right url', () => {
            cy.url().should('include','home');
        })

});