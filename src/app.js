import { customCarousel } from './widgets/Carousel';

/* global algoliasearch instantsearch */
const searchClient = algoliasearch(
  'GENYJWQIK2',
  'd7a56394e700ad117ef483c12bc04481'
);

const search = instantsearch({
  indexName: 'perso_movies_carousel',
  searchClient,
});

const referenceHit = {
  title: 'The Imitation Game',
  image: 'https://image.tmdb.org/t/p/w154/ntZGfHt4d73A9fDD4KUN4nbDQlq.jpg',
  color: '#192229',
  popularity_score: 108.4335114104872,
  actors: ['Benedict Cumberbatch', 'Keira Knightley', 'Matthew Goode'],
  genre: ['History', 'Drama', 'Thriller', 'War'],
  ongoing_watch: [],
  tmdb_id: 205596,
  views_last_7_days: 596898,
  days_to_expire: 44,
  objectID: '439434880',
};

const myCarousels = [
  {
    title: 'Trending',
    context: 'trending',
    indexName: 'perso_movies_carousel_trending',
  },
  {
    title: 'Most Popular',
    context: 'most-popular',
    indexName: 'perso_movies_carousel',
  },
  {
    title: 'Last chance',
    context: 'last-chance',
    indexName: 'perso_movies_carousel_last_chance',
  },
  {
    title: 'You started watching',
    context: 'ongoing',
    indexName: 'perso_movies_carousel',
    extraConfig: {
      facetFilters: 'ongoing_watch: user_1',
      hitsPerPage: 5,
    },
  },
  {
    title: 'Because you watched The Imitation Game',
    context: 'related',
    indexName: 'perso_movies_carousel_related',
    relatedRef: referenceHit,
  },
  {
    title: 'Fantasy Comedy',
    context: 'comedy_fantasy',
    indexName: 'perso_movies_carousel',
  },
];

search.addWidgets(
  myCarousels.map(carousel =>
    instantsearch.widgets
      .index({
        indexName: carousel.indexName,
        indexId: carousel.context,
      })
      .addWidgets(
        !carousel.relatedRef
          ? [
              instantsearch.widgets.configure({
                ruleContexts: carousel.context,
                hitsPerPage: 15,
                query: '',
                ...carousel.extraConfig,
              }),
              customCarousel({
                container: '.carousels',
                title: carousel.title,
                context: carousel.context,
              }),
            ]
          : [
              instantsearch.widgets.configure({
                ruleContexts: carousel.context,
                hitsPerPage: 15,
                query: '',
                ...carousel.extraConfig,
              }),
              instantsearch.widgets.EXPERIMENTAL_configureRelatedItems({
                hit: carousel.relatedRef,
                matchingPatterns: {
                  genre: { score: 3 },
                  actors: { score: 2 },
                },
              }),
              customCarousel({
                container: '.carousels',
                title: carousel.title,
                context: carousel.context,
              }),
            ]
      )
  )
);

search.start();

document.addEventListener('click', e => {
  if (e.target.matches('.analytics')) {
    console.log('click', e.target.dataset.objectId);

    aa('clickedObjectIDs', {
      index: 'perso_movies_carousel',
      eventName: 'CLICKED_MOVIE',
      objectIDs: [e.target.dataset.objectId],
    });

    aa('viewedObjectIDs', {
      index: 'perso_movies_carousel',
      eventName: 'VIEWED_MOVIE',
      objectIDs: [e.target.dataset.objectId],
    });

    if (Math.floor(Math.random() * 10) < 4) {
      aa('convertedObjectIDs', {
        index: 'perso_movies_carousel',
        eventName: 'WATCHED_MOVIE',
        objectIDs: [e.target.dataset.objectId],
      });
    }
  }
});
