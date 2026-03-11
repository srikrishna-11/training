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
    const newsContainer = block.children[1];
    if (newsContainer) {
        newsContainer.classList.add('news_items');
    }
    const news = block.querySelectorAll('.news_items > div');
    news.forEach((element) => {
        element.classList.add('news_methods');
    });
    const newsMethods = block.querySelectorAll('.news_methods > h3');
    newsMethods.forEach((element) => {
        element.classList.add('news_title');
    });   
    const newsPara = block.querySelectorAll('.news_methods > p');
    newsPara.forEach((element) => {
        element.classList.add('news_para');
    });
    const newsInfo = block.querySelectorAll('.news_methods > h4');
    newsInfo.forEach((element) => {
        element.classList.add('news_info');
    });
    const newsRead = block.querySelectorAll('.news_methods > h5');
    newsRead.forEach((element) => {
        element.classList.add('news_read');
    });
