export default function decorate(block) {
  if (!block) return;

  const children = block.querySelectorAll(':scope > div');

  children.forEach((el, index) => {
    if (index < 6) {
      el.classList.add('card', 'wheat-strategy');
    }
  });
}
