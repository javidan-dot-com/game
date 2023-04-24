describe('Scores Page', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('input[name="first-player-name"]').type('John');
        cy.get('input[name="second-player-name"]').type('Jane');
        cy.get('button[type="submit"]').click();
        cy.get('[data-test="cell-0-0"]').as('btn').click();
        cy.get('[data-test="cell-0-1"]').as('btn').click();
        cy.get('[data-test="cell-1-0"]').as('btn').click();
        cy.get('[data-test="cell-0-2"]').as('btn').click();
        cy.get('[data-test="cell-2-0"]').as('btn').click();
    });

    it('should contain main element', () => {
        cy.get('[data-test="see-pre-results-button"]').click();
        cy.get('main').should('exist');
    });

    it('should contain table, its head and body', () => {
        cy.get('[data-test="see-pre-results-button"]').click();
        cy.get('table').should('exist');
        cy.get('thead').should('exist');
        cy.get('tbody').should('exist');
    });

    it('should contain two columns in table head with "round" and "winner" values', () => {
        cy.get('[data-test="see-pre-results-button"]').click();
        cy.get('thead').find('th').should('have.length', 2);
        cy.get('thead').find('th').eq(0).should('contain', 'Round');
        cy.get('thead').find('th').eq(1).should('contain', 'Result');
    });

    it('should contain two rows in table body with round number and winner values', () => {
        cy.get('[data-test="next-round-button"]').click();
        cy.get('[data-test="cell-0-0"]').as('btn').click();
        cy.get('[data-test="cell-0-1"]').as('btn').click();
        cy.get('[data-test="cell-1-0"]').as('btn').click();
        cy.get('[data-test="cell-1-1"]').as('btn').click();
        cy.get('[data-test="cell-2-2"]').as('btn').click();
        cy.get('[data-test="cell-2-1"]').as('btn').click();
        cy.get('[data-test="next-round-button"]').click();
        cy.get('[data-test="see-pre-results-button"]').click();
        cy.get('tbody').find('tr').should('have.length', 2);
        cy.get('tbody').find('tr').eq(0).find('td').eq(0).should('contain', '1');
        cy.get('tbody').find('tr').eq(0).find('td').eq(1).should('contain', 'John');
        cy.get('tbody').find('tr').eq(1).find('td').eq(0).should('contain', '2');
        cy.get('tbody').find('tr').eq(1).find('td').eq(1).should('contain', 'Jane');
    });

    it('should contain "Back to Game" button', () => {
        cy.get('[data-test="see-pre-results-button"]').click();
        cy.get('[data-test="back-to-game-button"]').should('exist');
    });

    it('should contain "Start fresh" button', () => {
        cy.get('[data-test="see-pre-results-button"]').click();
        cy.get('[data-test="restart-game-button"]').should('exist');
    });

    it('should take to game page when "Back to Game" button is clicked', () => {
        cy.get('[data-test="see-pre-results-button"]').click();
        cy.get('[data-test="back-to-game-button"]').click();
        cy.url().should('include', '/game');
    });

    it('should restart game when "Start fresh" button is clicked', () => {
        cy.get('[data-test="see-pre-results-button"]').click();
        cy.get('[data-test="restart-game-button"]').click();
        cy.url().should('include', '/');
    });
});