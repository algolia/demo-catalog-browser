import { customCarousel } from './widgets/Carousel';

/* global algoliasearch instantsearch */
const searchClient = algoliasearch(
  'GENYJWQIK2',
  '61a10f4c69aee59a993ebc3021574681'
);

const search = instantsearch({
  indexName: 'perso_movies_carousel',
  searchClient,
});

// const movies = searchClient.initIndex('perso_movies_carousel');

// movies
//   .search('', {
//     filters: 'genre:action AND genre:crime',
//     hitsPerPage: 100,
//   })
//   .then(({ hits }) => {
//     aa('clickedObjectIDs', {
//       index: 'perso_movies_carousel',
//       eventName: 'CLICKED_MOVIE',
//       userToken: 'action_crime_fan',
//       objectIDs: hits
//         .filter(() => Math.floor(Math.random() * 10) < 7)
//         .slice(43, 61)
//         .map(hit => hit.objectID),
//     });

//     aa('viewedObjectIDs', {
//       index: 'perso_movies_carousel',
//       eventName: 'VIEWED_MOVIE',
//       userToken: 'action_crime_fan',
//       objectIDs: hits.slice(65, 87).map(hit => hit.objectID),
//     });

//     aa('convertedObjectIDs', {
//       index: 'perso_movies_carousel',
//       eventName: 'WATCHED_MOVIE',
//       userToken: 'action_crime_fan',
//       objectIDs: hits
//         .filter(() => Math.floor(Math.random() * 10) < 3)
//         .slice(1, 19)
//         .map(hit => hit.objectID),
//     });
//   });

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

const searchParams = new URLSearchParams(window.location.search);

const userToken = searchParams.get('userToken') || 'alphonse';

const myCarousels = userToken
  ? [
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
        title: 'Fantasy Comedy',
        context: 'comedy_fantasy',
        indexName: 'perso_movies_carousel',
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
        title: 'Curated for you',
        context: 'curated',
        indexName: 'perso_movies_carousel',
        extraConfig: {
          enablePersonalization: true,
          userToken,
        },
      },
    ]
  : [
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
        title: 'Fantasy Comedy',
        context: 'comedy_fantasy',
        indexName: 'perso_movies_carousel',
      },
    ];

const addWidgets = () => {
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
};

addWidgets();

search.start();

// document.querySelector('#user_select').addEventListener('change', e => {
//   window.location.href = `${window.location.href}?userToken=${e.currentTarget.value}`;
// });

// document.addEventListener('click', e => {
//   if (e.target.matches('.analytics')) {
//     console.log('click', e.target.dataset.objectId);

//     aa('clickedObjectIDs', {
//       index: 'perso_movies_carousel',
//       eventName: 'CLICKED_MOVIE',
//       objectIDs: [e.target.dataset.objectId],
//     });

//     aa('viewedObjectIDs', {
//       index: 'perso_movies_carousel',
//       eventName: 'VIEWED_MOVIE',
//       objectIDs: [e.target.dataset.objectId],
//     });

//     if (Math.floor(Math.random() * 10) < 4) {
//       aa('convertedObjectIDs', {
//         index: 'perso_movies_carousel',
//         eventName: 'WATCHED_MOVIE',
//         objectIDs: [e.target.dataset.objectId],
//       });
//     }
//   }
// });
