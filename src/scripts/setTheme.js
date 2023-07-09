function setTheme() {
  const themeButton = document.getElementById('theme-button');
  const sun = document.getElementById('sun');
  const moon = document.getElementById('moon');

  themeButton.addEventListener('click', () => {
    if (sun.classList.contains('disable')) {
      sun.classList.remove('disable');
      moon.classList.add('disable');
    } else if (moon.classList.contains('disable')) {
      moon.classList.remove('disable');
      sun.classList.add('disable');
    }
  });
}

export default setTheme;
