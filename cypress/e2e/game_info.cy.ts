describe('Game Info', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('input[name="first-player-name"]').type('John');
        cy.get('input[name="second-player-name"]').type('Jane');
        cy.get('button[type="submit"]').click();
    });

    it('should render the game info', () => {
        cy.get('[data-test="game-info"]').should('exist');
    });

    it('should render the first player info', () => {
        cy.get('[data-test="game-info-first-player"]').should('exist');
        cy.get('[data-test="game-info-first-player"]').should('contain', 'Player 1:');
        cy.get('[data-test="game-info-first-player"]').should('contain', 'John');
    });

    it('should render the second player info', () => {
        cy.get('[data-test="game-info-second-player"]').should('exist');
        cy.get('[data-test="game-info-second-player"]').should('contain', 'Player 2:');
        cy.get('[data-test="game-info-second-player"]').should('contain', 'Jane');
    });

    it('should render the round info', () => {
        cy.get('[data-test="game-info-round"]').should('exist');
        cy.get('[data-test="game-info-round"]').should('contain', 'Round:');
        cy.get('[data-test="game-info-round"]').should('contain', '1');
    });

    it('should render the current player name', () => {
        cy.get('[data-test="game-info-status"]').should('exist');
    });

    it('should display current player while game is in progress and winner if game is over', () => {
        cy.get('[data-test="game-info-status"]').should('contain', 'John');
        cy.get('[data-test="cell-0-0"]').as('btn').click();
        cy.get('[data-test="cell-0-1"]').as('btn').click();
        cy.get('[data-test="cell-1-0"]').as('btn').click();
        cy.get('[data-test="cell-0-2"]').as('btn').click();
        cy.get('[data-test="cell-2-0"]').as('btn').click();
        cy.get('[data-test="game-info-status"]').should('contain', 'John');
    });

    it('should display "restart round" button while game is in progress and "next round" button if game is over', () => {
        cy.get('[data-test="restart-round-button"]').should('exist');
        cy.get('[data-test="cell-0-0"]').as('btn').click();
        cy.get('[data-test="cell-0-1"]').as('btn').click();
        cy.get('[data-test="cell-1-0"]').as('btn').click();
        cy.get('[data-test="cell-0-2"]').as('btn').click();
        cy.get('[data-test="cell-2-0"]').as('btn').click();
        cy.get('[data-test="next-round-button"]').should('exist');
    });

    it('should take to home page when "restart game" button is clicked', () => {
        cy.get('[data-test="restart-game-button"]').click();
        cy.url().should('include', '/');
    });
});