describe('Game Board', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('input[name="first-player-name"]').type('John');
        cy.get('input[name="second-player-name"]').type('Jane');
        cy.get('button[type="submit"]').click();
    });

    it('should render the game board', () => {
        cy.get('[data-test="game-board"]').should('exist');
    });

    it('should render the board', () => {
        cy.get('[data-test="board"]').should('exist');
    });

    it('should render the rows', () => {
        cy.get('[data-test="row"]').should('exist');
    });

    it('should render the cells', () => {
        cy.get('[data-test="cell-0-0"]').should('exist');
    });

    it('should render the "winner" message for the first player', () => {
        cy.get('[data-test="cell-0-0"]').as('btn').click();
        cy.get('[data-test="cell-0-1"]').as('btn').click();
        cy.get('[data-test="cell-1-0"]').as('btn').click();
        cy.get('[data-test="cell-0-2"]').as('btn').click();
        cy.get('[data-test="cell-2-0"]').as('btn').click();
        cy.get('[data-test="game-info-status"]').should('contain', 'Winner: ');
    });

    it('should render the "winner" message for the second player', () => {
        cy.get('[data-test="cell-0-0"]').as('btn').click();
        cy.get('[data-test="cell-0-1"]').as('btn').click();
        cy.get('[data-test="cell-1-0"]').as('btn').click();
        cy.get('[data-test="cell-1-1"]').as('btn').click();
        cy.get('[data-test="cell-2-2"]').as('btn').click();
        cy.get('[data-test="cell-2-1"]').as('btn').click();
        cy.get('[data-test="game-info-status"]').should('contain', 'Winner: ');
    });

    it('should render the "draw" message', () => {
        cy.get('[data-test="cell-0-0"]').as('btn').click();
        cy.get('[data-test="cell-0-1"]').as('btn').click();
        cy.get('[data-test="cell-0-2"]').as('btn').click();
        cy.get('[data-test="cell-1-0"]').as('btn').click();
        cy.get('[data-test="cell-1-2"]').as('btn').click();
        cy.get('[data-test="cell-1-1"]').as('btn').click();
        cy.get('[data-test="cell-2-0"]').as('btn').click();
        cy.get('[data-test="cell-2-2"]').as('btn').click();
        cy.get('[data-test="cell-2-1"]').as('btn').click();
        cy.get('[data-test="game-info-status"]').should('contain', 'DRAW');
    });
});