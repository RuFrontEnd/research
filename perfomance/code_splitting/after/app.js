
async function handleRoute(route) {
  const content = document.getElementById('content');

  switch (route) {
    case '#home':
      content.innerHTML = `    <h2>Welcome to Home Page</h2>
      <p>This is a dynamic content section for the Home Page.</p>
      <button onclick="alert('Button Clicked on Home Page')">Click me!</button>`
      break;
    case '#about':
      const aboutModule = await import('./about.js');
      content.innerHTML = aboutModule.renderAbout();
      break;
    case '#contact':
      const contactModule = await import('./contact.js');
      content.innerHTML = contactModule.renderContact();
      break;
    default:
      content.innerHTML = '<h2>Page Not Found</h2>';
  }
}

function init() {
  if (!window.location.hash) {
    window.location.hash = '#home';
  } else {
    handleRoute(window.location.hash);
  }


  window.addEventListener('hashchange', () => {
    handleRoute(window.location.hash);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  init();
});