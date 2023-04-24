describe('Starting Form Validation', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should show error message when first player name is empty', () => {
        cy.get('input[name="first-player-name"]').type(' ');
        cy.get('input[name="second-player-name"]').type('John');
        cy.get('button[type="submit"]').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Please enter a valid name.');
        });
    });

    it('should show error message when second player name is empty', () => {
        cy.get('input[name="first-player-name"]').type('John');
        cy.get('input[name="second-player-name"]').type(' ');
        cy.get('button[type="submit"]').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Please enter a valid name.');
        });
    });

    it('should show error message when both player names are empty', () => {
        cy.get('input[name="first-player-name"]').type(' ');
        cy.get('input[name="second-player-name"]').type(' ');
        cy.get('button[type="submit"]').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Please enter a valid name.');
        });
    });

    it('should show error message when both player names are same', () => {
        cy.get('input[name="first-player-name"]').type('John');
        cy.get('input[name="second-player-name"]').type('John');
        cy.get('button[type="submit"]').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Please enter different names.');
        });
    });
});
