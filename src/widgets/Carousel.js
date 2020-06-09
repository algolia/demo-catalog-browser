/**
 * @requires module:instantsearch
 */

const renderCarousel = ({ widgetParams, hits }, isFirstRender) => {
  const container = document.querySelector(widgetParams.container);

  if (isFirstRender) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('carousel-single');

    container.appendChild(wrapper);

    const carouselTitle = document.createElement('h2');
    carouselTitle.textContent = widgetParams.title;
    wrapper.appendChild(carouselTitle);

    const carouselListContainer = document.createElement('ul');
    carouselListContainer.classList.add('carousels__list-container');
    carouselListContainer.setAttribute('id', widgetParams.context);
    wrapper.appendChild(carouselListContainer);

    wrapper.style.width = `${window.innerWidth -
      wrapper.getBoundingClientRect().left}px`;

    const leftArrow = document.createElement('button');
    leftArrow.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right-circle"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>';
    wrapper.appendChild(leftArrow);
    const rightArrow = document.createElement('button');
    rightArrow.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right-circle"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>';
    rightArrow.style.transform = 'rotate(180deg)';
    rightArrow.style.display = 'none';
    rightArrow.style.right = 'auto';
    rightArrow.style.left = '16px';
    wrapper.appendChild(rightArrow);

    leftArrow.addEventListener('click', () => {
      carouselListContainer.scroll(wrapper.clientWidth, 0);
      leftArrow.style.display = 'none';
      rightArrow.style.display = 'block';
    });
    rightArrow.addEventListener('click', () => {
      carouselListContainer.scroll(0, 0);
      rightArrow.style.display = 'none';
      leftArrow.style.display = 'block';
    });
  }

  const ul = container.querySelector(`ul#${widgetParams.context}`);
  ul.innerHTML = hits
    .map(
      (hit, index) => `
        <li class="analytics" data-object-id="${hit.objectID}" style="${
        index === hits.length - 1
          ? `padding-right: ${ul.getBoundingClientRect().left + 180}px`
          : ''
      }">
            <img src="${hit.image}" alt="${hit.title}">
            <h3>${hit.title}</h3>
            <ul>
                ${hit.genre
                  .map(
                    genre => `
                    <li>${genre}</li>
                `
                  )
                  .join('')}
            </ul>
        </li>
    `
    )
    .join('');
};

export const customCarousel = instantsearch.connectors.connectHits(
  renderCarousel
);
