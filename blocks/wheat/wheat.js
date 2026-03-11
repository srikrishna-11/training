export default function decorate (block) {
const first = block.children[0]; if (!first) return;
first.classList.add('wheat-strategy');

  const second = block.children[1]; if (!second) return;
second.classList.add('wheat-grant');

  const third = block.children[2]; if (!third) return;
third.classList.add('wheat-management');

  const four = block.children[3]; if (!four) return;
four.classList.add('wheat-strategy');

  const five = block.children[4]; if (!five) return;
five.classList.add('wheat-grant');

  const six = block.children[5]; if (!six) return;
six.classList.add('wheat-management');
  

}
