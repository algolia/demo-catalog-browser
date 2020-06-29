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
            <div class="overlay">
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
          </div>
        </li>
    `
    )
    .join('');
};

export const customCarousel = instantsearch.connectors.connectHits(
  renderCarousel
);
