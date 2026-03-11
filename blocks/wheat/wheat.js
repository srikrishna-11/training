export default function decorate (block) {
 
const first = block.children[0]; if (!first) return;
 
first.classList.add('wheat-strategy');
}
