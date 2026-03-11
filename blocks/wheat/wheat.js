<script>
  // Example: programmatically handle buttons with data-action
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.feature__cta[data-action]');
    if (!btn) return;

    const action = btn.getAttribute('data-action');
    // TODO: your logic here
    console.log('CTA clicked:', action);

    // Example action routing
    if (action === 'management') {
      // open modal, route, fetch, etc.
      alert('Open Management details…');
    }
  });

  // Optional: Make Enter/Space trigger on custom elements (if you ever use divs)
  // (Not needed for <a> or <button>, they already work.)
  function makeKeyboardClickable(el) {
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        el.click();
      }
    });
  }
  // Example usage: document.querySelectorAll('.some-div-cta').forEach(makeKeyboardClickable);
</script>
