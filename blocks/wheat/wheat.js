export default function decorate(block) {
    const newsComponent = block.children[0];
    newsComponent.classList.add('news_component');
    const component = block.children[0].children[0];
    component.classList.add('component');
 
    const newsHeader = block.querySelector('.component h2');
    const newsDesc = block.querySelector('.component p');
    if (newsHeader) {
        newsHeader.classList.add('news_header');
    }
    if (newsDesc) {
        newsDesc.classList.add('news_desc');
    }
    
