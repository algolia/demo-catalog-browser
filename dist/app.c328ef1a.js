// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"widgets/Carousel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customCarousel = void 0;

/**
 * @requires module:instantsearch
 */
var renderCarousel = function renderCarousel(_ref, isFirstRender) {
  var widgetParams = _ref.widgetParams,
      hits = _ref.hits;
  var container = document.querySelector(widgetParams.container);

  if (isFirstRender) {
    var wrapper = document.createElement('div');
    wrapper.classList.add('carousel-single');
    container.appendChild(wrapper);
    var carouselTitle = document.createElement('h2');
    carouselTitle.textContent = widgetParams.title;
    wrapper.appendChild(carouselTitle);
    var carouselListContainer = document.createElement('ul');
    carouselListContainer.classList.add('carousels__list-container');
    carouselListContainer.setAttribute('id', widgetParams.context);
    wrapper.appendChild(carouselListContainer);
    wrapper.style.width = "".concat(window.innerWidth - wrapper.getBoundingClientRect().left, "px");
  }

  var ul = container.querySelector("ul#".concat(widgetParams.context));
  ul.innerHTML = hits.map(function (hit, index) {
    return "\n        <li class=\"analytics\" data-object-id=\"".concat(hit.objectID, "\" style=\"").concat(index === hits.length - 1 ? "padding-right: ".concat(ul.getBoundingClientRect().left + 180, "px") : '', "\">\n            <img src=\"").concat(hit.image, "\" alt=\"").concat(hit.title, "\">\n            <div class=\"overlay\">\n              <h3>").concat(hit.title, "</h3>\n              <ul>\n                ").concat(hit.genre.map(function (genre) {
      return "\n                  <li>".concat(genre, "</li>\n                ");
    }).join(''), "\n              </ul>\n          </div>\n        </li>\n    ");
  }).join('');
};

var customCarousel = instantsearch.connectors.connectHits(renderCarousel);
exports.customCarousel = customCarousel;
},{}],"app.js":[function(require,module,exports) {
"use strict";

var _Carousel = require("./widgets/Carousel");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global algoliasearch instantsearch */
var searchClient = algoliasearch('GENYJWQIK2', '61a10f4c69aee59a993ebc3021574681');
var search = instantsearch({
  indexName: 'perso_movies_carousel',
  searchClient: searchClient
}); // const movies = searchClient.initIndex('perso_movies_carousel');
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

var referenceHit = {
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
  objectID: '439434880'
};
var searchParams = new URLSearchParams(window.location.search);
var userToken = searchParams.get('userToken') || 'alphonse';
var myCarousels = userToken ? [{
  title: 'Trending',
  context: 'trending',
  indexName: 'perso_movies_carousel_trending'
}, {
  title: 'Most Popular',
  context: 'most-popular',
  indexName: 'perso_movies_carousel'
}, {
  title: 'Last chance',
  context: 'last-chance',
  indexName: 'perso_movies_carousel_last_chance'
}, {
  title: 'Fantasy Comedy',
  context: 'comedy_fantasy',
  indexName: 'perso_movies_carousel'
}, {
  title: 'You started watching',
  context: 'ongoing',
  indexName: 'perso_movies_carousel',
  extraConfig: {
    facetFilters: 'ongoing_watch: user_1',
    hitsPerPage: 5
  }
}, {
  title: 'Because you watched The Imitation Game',
  context: 'related',
  indexName: 'perso_movies_carousel_related',
  relatedRef: referenceHit
}, {
  title: 'Curated for you',
  context: 'curated',
  indexName: 'perso_movies_carousel',
  extraConfig: {
    enablePersonalization: true,
    userToken: userToken
  }
}] : [{
  title: 'Trending',
  context: 'trending',
  indexName: 'perso_movies_carousel_trending'
}, {
  title: 'Most Popular',
  context: 'most-popular',
  indexName: 'perso_movies_carousel'
}, {
  title: 'Last chance',
  context: 'last-chance',
  indexName: 'perso_movies_carousel_last_chance'
}, {
  title: 'Fantasy Comedy',
  context: 'comedy_fantasy',
  indexName: 'perso_movies_carousel'
}];

var addWidgets = function addWidgets() {
  search.addWidgets(myCarousels.map(function (carousel) {
    return instantsearch.widgets.index({
      indexName: carousel.indexName,
      indexId: carousel.context
    }).addWidgets(!carousel.relatedRef ? [instantsearch.widgets.configure(_objectSpread({
      ruleContexts: carousel.context,
      hitsPerPage: 15,
      query: ''
    }, carousel.extraConfig)), (0, _Carousel.customCarousel)({
      container: '.carousels',
      title: carousel.title,
      context: carousel.context
    })] : [instantsearch.widgets.configure(_objectSpread({
      ruleContexts: carousel.context,
      hitsPerPage: 15,
      query: ''
    }, carousel.extraConfig)), instantsearch.widgets.EXPERIMENTAL_configureRelatedItems({
      hit: carousel.relatedRef,
      matchingPatterns: {
        genre: {
          score: 3
        },
        actors: {
          score: 2
        }
      }
    }), (0, _Carousel.customCarousel)({
      container: '.carousels',
      title: carousel.title,
      context: carousel.context
    })]);
  }));
};

addWidgets();
search.start(); // document.querySelector('#user_select').addEventListener('change', e => {
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
},{"./widgets/Carousel":"widgets/Carousel.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59629" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map