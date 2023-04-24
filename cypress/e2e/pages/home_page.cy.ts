describe('Home Page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should visit the home page', () => {
        cy.visit('/');
    });

    it('should contain beginning of greeting', () => {
        cy.get('h1').should('contain', 'Welcome to');
    });

    it('should contain end of greeting', () => {
        cy.get('h1').should('contain', 'game!');
    });

    it('should contain Tic-Tac-Toe description for image', () => {
        cy.get('img').should('have.attr', 'alt', 'Tic-Tac-Toe logo');
    });

    it('should contain Tic-Tac-Toe image', () => {
        cy.get('img').should('exist');
    });

    it('should contain starting form', () => {
        cy.get('form').should('exist');
    });

    it('should contain starting form', () => {
        cy.get('form').should('exist');
    });

    it('should contain first player name input', () => {
        cy.get('input[name="first-player-name"]').should('exist');
    });

    it('should contain second player name input', () => {
        cy.get('input[name="second-player-name"]').should('exist');
    });

    it('should contain submit button', () => {
        cy.get('button[type="submit"]').should('exist');
    });

    it('should contain submit button with text "Start Game"', () => {
        cy.get('button[type="submit"]').should('contain', 'Start Game');
    });
});
