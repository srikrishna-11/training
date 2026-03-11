<script>
  (function () {
    // Map card keys to routes or custom actions
    const routes = {
      'strategy':        () => window.location.href = '#strategy',
      'grant-writing':   () => window.location.href = '#grant-writing',
      'management':      () => window.location.href = '#management',
      'teaching':        () => window.location.href = '#teaching',
      'campaign':        () => window.location.href = '#campaign',
      '247-support':     () => window.location.href = '#support'
    };

    // Delegate clicks
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.svc-card');
      if (!card) return;
      const key = card.dataset.key;
      if (routes[key]) routeskey;
      else console.log('Card clicked:', key);
    });

    // Keyboard: Enter/Space
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('.svc-card');
      if (!card) return;
      e.preventDefault();
      const key = card.dataset.key;
      if (routes[key]) routeskey;
      else console.log('Card activated via keyboard:', key);
    });
  })();
</script>
