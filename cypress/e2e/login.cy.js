/**
 * - Login spec
 *   - should display login page correctly
 *   - should alert when email is empty but password is filled
 *   - should alert when password is empty but email is filled
 *   - should alert when both email and password are empty
 *   - should display toast when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    cy.contains('h1', 'NuThread').should('be.visible');
    cy.contains('p', /NuThread adlah tempat untuk berdiskusi/).should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button').contains(/^Masuk$/).should('be.visible');
    cy.contains('a', /^Lupa kata sandi\?$/).should('be.visible');
    cy.contains('a', /^Buat Akun Baru$/).should('be.visible');
  });

  it('should alert when email is empty but password is filled', () => {
    cy.get('input[name="password"]').type('secret123');
    cy.get('button').contains(/^Masuk$/).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Email dan kata sandi tidak boleh kosong');
    });
  });

  it('should alert when password is empty but email is filled', () => {
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('button').contains(/^Masuk$/).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Email dan kata sandi tidak boleh kosong');
    });
  });

  it('should alert when both email and password are empty', () => {
    cy.get('button').contains(/^Masuk$/).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Email dan kata sandi tidak boleh kosong');
    });
  });

  it('should display toast when username and password are wrong', () => {
    cy.get('input[name="email"]').type('gatauapa@example.com');
    cy.get('input[name="password"]').type('gatauapa12');
    cy.get('button').contains(/^Masuk$/).click();

    cy.get('.Toastify__toast--error', { timeout: 5000 })
      .should('be.visible')
      .and('contain', 'email or password is wrong');
  });

  it('should display homepage when username and password are correct', () => {
    cy.get('input[name="email"]').type('wadidaw@gmail.com');
    cy.get('input[name="password"]').type('wadidaw');
    cy.get('button').contains(/^Masuk$/).click();
    cy.get('nav').contains(/^Home$/).should('be.visible');
    cy.get('button').contains('Logout').should('be.visible');
  });
});
