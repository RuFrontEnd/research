// contact.js
export function renderContact() {
  return `
  <div class="contact-page">
  <header>
    <h1>Contact Us</h1>
  </header>
  <main>
    <section class="contact-info">
      <h2>Contact Information</h2>
      <address>
        <p>123 Main Street,</p>
        <p>City, Country</p>
      </address>
      <div class="contact-methods">
        <p>Email: contact@example.com</p>
        <p>Phone: +1234567890</p>
      </div>
    </section>
    <section class="contact-form">
      <h2>Get in Touch</h2>
      <form>
        <input type="text" placeholder="Your Name" required>
        <input type="email" placeholder="Your Email" required>
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Send</button>
      </form>
    </section>
  </main>
  <footer>
    <p>We'd love to hear from you!</p>
  </footer>
</div>
  `;
}