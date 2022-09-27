import { waitForDebugger } from "inspector";

describe('Charity-Spot performance test', () => {

    //console.log("Performance test on live Charity-Spot!")
    //cy.task('log', 'Performance test on live Charity-Spot!');

    //save cookies between tests

      Cypress.Cookies.defaults({
        preserve: ['ID', 'ID_EXT', 'foreignID'],
      });

    //register charity

    it('should navigate to register page', () => {
        cy.task('log', 'Performance test on live Charity-Spot!').then(()=>{cy.wait(2000);});
        cy.visit('http://localhost:4200/register').then(()=>{cy.wait(2000);});
        cy.url().should('include','register');
    })

    let start = 0;

    it('should register charity', () => {
        cy.get('#rgorgnm1').select("Willing to assist");
        cy.get('#rgorgnm2').type("Charity 1");
        cy.get('#emil1').type("charity1@email.comm");
        cy.get('button.custom-file-upload').click().then(() => { cy.wait(5000).then(() => { 

            cy.get('.modal').trigger('pointerdown', {clientX: 300, clientY: 600})
            cy.get('.modal').trigger('pointerup', {clientX: 300,clientY: 600})
        
            }); 
        });

        cy.get('.btn-close').click();

        cy.get('#rgpwd1').type('1234');
        cy.get('#rgpwd2').type('1234');

        cy.get('#rgsub_butt').click().then(() =>{ cy.wait(5000);});


    });

    it('should enter email verification', () => {

        //cy.get('#emailcodeinput').type('demo').then(() => {console.log("Charity registered in: " + (performance.now() - start) + " ms");});
        cy.get('#emailcodeinput').type('demo').then(() => {cy.wait(2000);});
        //start = 0;
        cy.get('.ripple').click().then(() => {cy.wait(10000);});
    })

    it('should direct to the login page', () => {
            
        cy.url().should('include','login').then(() => {console.log("Charity registered in: " + (performance.now() - start) + " ms");});;
    })

    start = 0;

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

        /*var start = 0;

        //login page
        it('should direct to the right url', () => {
            cy.visit('http://3.7.189.9:8082/login').then(() => { start = performance.now()});
            cy.url().should('include','login').then(() => {console.log("Login page loaded in: " + (performance.now() - start) + " ms");});
        })

        start = 0;

        it('The user should be able to login', () =>{

            cy.get('input[type=email]').type("client1@email.com");
            cy.get('input[type=password]').type("1234");

            cy.contains('Log in').click().then(() => { start = performance.now()});
        })


        //home page
        it('should direct to the right url', () => {
            console.log("Logging in client: ")
            cy.url().should('include','home').then(() => {console.log("Home page loaded in: " + (performance.now() - start) + " ms");});
        })*/

        start = 0;

        it('should be taken to profile page of org', () => {

            cy.get('[title="Charity 1"] > img').click().then(() => { start = performance.now()});

        });


        //profile page
        it('should direct to the right url', () => {
            cy.url().should('include','profile').then(() => {console.log("Profile page loaded in: " + (performance.now() - start) + " ms");});
        })

        it('should be taken to profile page of org', () => {

            cy.get('.blog').click();

        });

        it('should be able to view item', () => {
            cy.get(':nth-child(1) > .rapper > .collapsible > label').click();
            
        })

        it('should navigate back to profile page', () => {
            cy.get('.profTab').click();
        })


        //chat test

        start = 0;

        it('should open a chat window', () => {
            cy.get('#chatGo').click().then(() => { start = performance.now()});
            cy.url().should('include','chat').then(() => {console.log("Chat loaded in: " + (performance.now() - start) + " ms");});
        
        })

        it('should send message', () => {

            cy.get('#inputBoxM').type("hello world");
            cy.get('.client-chat_sndBT__3serM').click();

        });

        it('should navigate to active char sessions', () => {

            cy.get('[data-rr-ui-event-key="chatSession"]').click();

        })

    //charity test

        start = 0;

        it('should be logged out of client profile', () =>{

            cy.visit('http://localhost:4200/login').then(() => { start = performance.now()});
            cy.url().should('include','login').then(() => {console.log("Charity Login loaded in: " + (performance.now() - start) + " ms");});

        });

        start = 0;

        it('charity should be able to login', () =>{

            cy.get('input[type=email]').type("charity1@email.comm");
            cy.get('input[type=password]').type("1234");

            cy.contains('Log in').click().then(() => { start = performance.now()});
        });

        //home page
        it('should direct to the right url', () => {
            console.log("Logging in charity: ")
            cy.url().should('include','home').then(() => {console.log("Charity Home page loaded in: " + (performance.now() - start) + " ms");});
        })

        start = 0;

        //notifications
        it('should be able to view notifications', () => {

            cy.get('#notButton > svg > path').click().then(() => { start = performance.now()});
            cy.get('#chatHistGo').click();

        });

        //donate
        it('should direct to the right url', () => {
            cy.url().should('include','chat').then(() => {console.log("Chat window from notifications page loaded in: " + (performance.now() - start) + " ms");});
        })

        start = 0;

        it('should be able to navigate to profile', () => {
            cy.get('#chatNameP').click().then(() => { start = performance.now()});
        })

        it('should direct to the right url', () => {
            cy.url().should('include','profile').then(() => {console.log("Profile loaded from chat window: " + (performance.now() - start) + " ms");});
        })

        start = 0;

        it('should be able to navigate to scheduleDelivery', () => {
            cy.get('#delivGo').click().then(() => { start = performance.now()});
        })

        it('should direct to the right url', () => {
            cy.url().should('include','scheduleDelivery').then(() => {console.log("Schedule delivery page loaded in: " + (performance.now() - start) + " ms");});
        })

        it('should be able to confirm', () => {
            cy.get('#deliv_but').click();
        })

        //donate schedule

        start = 0;

        it('should be able to navigate to profile', () => {
            cy.get('[data-rr-ui-event-key="donationSchedule"]').click().then(() => { start = performance.now()});
        })

        it('should direct to the right url', () => {
            cy.url().should('include','donationSchedule').then(() => {console.log("Schedule delivery history page loaded in: " + (performance.now() - start) + " ms");});;
        })

        //return to home page

        start = 0;

        it('should be able to navigate to home', () => {
            cy.get('[data-rr-ui-event-key="home"]').click().then(() => { start = performance.now()});
        })

        it('should direct to the right url', () => {
            cy.url().should('include','home').then(() => {console.log("Home page return loaded in: " + (performance.now() - start) + " ms");});
        })

});