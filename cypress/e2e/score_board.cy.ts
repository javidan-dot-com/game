describe('Score Board', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('input[name="first-player-name"]').type('John');
        cy.get('input[name="second-player-name"]').type('Jane');
        cy.get('button[type="submit"]').click();
    });

    it('should render the score board', () => {
        cy.get('[data-test="score-board"]').should('exist');
    });

    it('should render the score board list and list item', () => {
        cy.get('[data-test="score-board-list"]').should('exist');
        cy.get('[data-test="score-board-list-item"]').should('exist');
    });

    it('should render "see previous results" button if there is history', () => {
        cy.get('[data-test="see-pre-results-button"]').should('not.exist');
        cy.get('[data-test="cell-0-0"]').as('btn').click();
        cy.get('[data-test="cell-0-1"]').as('btn').click();
        cy.get('[data-test="cell-1-0"]').as('btn').click();
        cy.get('[data-test="cell-0-2"]').as('btn').click();
        cy.get('[data-test="cell-2-0"]').as('btn').click();
        cy.get('[data-test="see-pre-results-button"]').should('exist');
    });

    it('should take to "/scores" page if button clicked', () => {
        cy.get('[data-test="cell-0-0"]').as('btn').click();
        cy.get('[data-test="cell-0-1"]').as('btn').click();
        cy.get('[data-test="cell-1-0"]').as('btn').click();
        cy.get('[data-test="cell-0-2"]').as('btn').click();
        cy.get('[data-test="cell-2-0"]').as('btn').click();
        cy.get('[data-test="see-pre-results-button"]').click();
        cy.url().should('include', '/scores');
    });
});