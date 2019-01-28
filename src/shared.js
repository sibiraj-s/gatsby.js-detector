document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = 0;
  document.body.style.transition = 'opacity ease-out 0.4s';
  requestAnimationFrame(() => {
    document.body.style.opacity = 1;
  });
});
