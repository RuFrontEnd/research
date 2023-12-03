// 路由处理函数
function handleRoute(route) {
  const content = document.getElementById('content');

  // 根据不同的路由渲染不同的视图
  switch (route) {
    case '#home':
      content.innerHTML = `
      <h2>Welcome to Home Page</h2>
      <p>This is a dynamic content section for the Home Page.</p>
    `;
      break;
    case '#about':
      content.innerHTML = `
      <div class="about-page">
      <header>
        <h1>About Us</h1>
      </header>
      <main>
        <section class="about-section">
          <h2>Our Story</h2>
          <p>Welcome to our story section. We are dedicated to...</p>
        </section>
        <section class="team-section">
          <h2>Our Team</h2>
          <div class="team-member">
            <img src="team-member1.jpg" alt="Team Member 1" width="200" height="300">
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div class="team-member">
            <img src="team-member2.jpg" alt="Team Member 2" width="300" height="205.75">
            <h3>Jane Smith</h3>
            <p>CTO</p>
          </div>
          <!-- 更多团队成员 -->
        </section>
        <section class="achievements-section">
          <h2>Our Achievements</h2>
          <ul>
            <li>2018 - Best Company Award</li>
            <li>2019 - Innovation Award</li>
            <li>2020 - Top 10 Fastest Growing Companies</li>
          </ul>
        </section>
      </main>
      <footer>
        <p>Contact us for more information.</p>
      </footer>
    </div>
    `;
      break;
    case '#contact':
      content.innerHTML = `
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
      break;
    case '#contact':
      content.innerHTML = `
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
      break;
    default:
      content.innerHTML = '<h2>Page Not Found</h2>';
  }
}

// 初始化函数，用于设置初始路由并监听路由变化
function init() {
  if (!window.location.hash) {
    window.location.hash = '#home';
  } else {
    handleRoute(window.location.hash);
  }
  // 根据当前 URL 设置初始路由
  handleRoute(window.location.hash);

  // 监听路由变化
  window.addEventListener('hashchange', () => {
    handleRoute(window.location.hash);
  });
}

// 页面加载完毕后初始化应用
window.addEventListener('DOMContentLoaded', () => {
  init();
});