describe('Game Page', () => {
    beforeEach(() => {
        cy.visit('/game');
    });

    it('should visit the game page', () => {
        cy.visit('/game');
    });

    it('should contain main element', () => {
        cy.get('main').should('exist');
    });

    it('should contain score board', () => {
        cy.get('main').should('contain', 'Score Board');
    });
});
