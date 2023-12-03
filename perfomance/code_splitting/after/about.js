// about.js
export function renderAbout() {
  return `
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
}