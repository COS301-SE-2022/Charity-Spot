describe('testing client', () => {

    //save cookies between tests

      beforeEach(function () {
        cy.getCookies().then(cookies => {
          const namesOfCookies = cookies.map(c => c.name)
          Cypress.Cookies.preserveOnce(...namesOfCookies)
        })
      })

    
    //client test

        //login page
        it('should direct to the right url', () => {
            cy.visit('http://3.7.189.9:8082/login');
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
        })

        it('should be taken to profile page of org', () => {

            cy.get('[title="charity1"] > img').click();

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

            cy.visit('http://3.7.189.9:8082/login');
            cy.url().should('include','login');

        });

        it('charity should be able to login', () =>{

            cy.get('input[type=email]').type("charity1@email.com");
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

});