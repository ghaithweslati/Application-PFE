describe('PageAuthentification',()=>
{
  beforeEach(()=>
  {
    cy.visit('/login');
  });

  it('Test cas d authentification', () => {
    cy.get('#email').type("utilisateur@gmail.com");
    cy.get('#password').type("123456");
    cy.get('#login').click();
    cy.wait(1500);
    cy.get('#login').then(($btn) => {
      cy.url().then(url => {
        cy.url().should('not.eq', url);
      });
    })
  });
})


