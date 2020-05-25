Webruntime.moduleRegistry.define('c/locationMap', ['lwc', '@salesforce/i18n/locale', 'lightning/configProvider', '@salesforce/i18n/dir', 'force/lds'], function (lwc, locale, configProvider, dir, lds) { 'use strict';

    locale = locale && locale.hasOwnProperty('default') ? locale['default'] : locale;
    dir = dir && dir.hasOwnProperty('default') ? dir['default'] : dir;

    function stylesheet(hostSelector, shadowSelector, nativeShadow) {
      return ".slds-map" + shadowSelector + " {height: 100%;}\n";
    }
    var _implicitStylesheets = [stylesheet];

    function tmpl($api, $cmp, $slotset, $ctx) {
      const {
        b: api_bind,
        h: api_element
      } = $api;
      const {
        _m0
      } = $ctx;
      return [api_element("iframe", {
        style: $cmp.frameStyle,
        attrs: {
          "src": $cmp.src,
          "title": $cmp.title,
          "width": $cmp.width,
          "height": $cmp.height
        },
        key: 2,
        on: {
          "load": _m0 || ($ctx._m0 = api_bind($cmp.handleContentLoad))
        }
      }, [])];
    }

    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.stylesheets = [];
    tmpl.stylesheetTokens = {
      hostAttribute: "lightning-primitiveIframe_primitiveIframe-host",
      shadowAttribute: "lightning-primitiveIframe_primitiveIframe"
    };

    // Closure to hold the APIs if and when available
    const Domains = [];
    function registerDomain(domain) {
      if (!domain || domain === '') {
        return;
      }

      const found = Domains.find(item => item.domain === domain);

      if (found) {
        found.ref += 1;
      } else {
        Domains.push({
          domain,
          ref: 1
        });
      }
    }
    function unregisterDomain(domain) {
      if (!domain || domain === '') {
        return;
      }

      const index = Domains.findIndex(item => item.domain === domain);

      if (index >= 0) {
        const found = Domains[index];
        found.ref -= 1;

        if (found.ref === 0) {
          Domains.splice(index, 1);
        }
      }
    }

    /**
     * Class representing primitive iframe.
     * @extends Element
     */

    class LightningPrimitiveIframe extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.src = void 0;
        this.domain = void 0;
        this.width = '100%';
        this.height = '100%';
        this.frameStyle = '';
        this.title = void 0;
      }

      connectedCallback() {
        registerDomain(this.src);
      }

      disconnectedCallback() {
        unregisterDomain(this.src);
      }

      handleContentLoad() {
        const iframeload = new CustomEvent('iframeload', {
          detail: {
            callbacks: {
              postToWindow: this.postToWindow.bind(this)
            }
          }
        });
        this.contentWindow = this.template.querySelector('iframe').contentWindow;
        this.dispatchEvent(iframeload);
      }

      postToWindow(message) {
        if (this.contentWindow) {
          this.contentWindow.postMessage(message, this.domain);
        }
      }

    }

    lwc.registerDecorators(LightningPrimitiveIframe, {
      publicProps: {
        src: {
          config: 0
        },
        domain: {
          config: 0
        },
        width: {
          config: 0
        },
        height: {
          config: 0
        },
        frameStyle: {
          config: 0
        },
        title: {
          config: 0
        }
      },
      publicMethods: ["postToWindow"]
    });

    var _lightningPrimitiveIframe = lwc.registerComponent(LightningPrimitiveIframe, {
      tmpl: _tmpl
    });

    function stylesheet$1(hostSelector, shadowSelector, nativeShadow) {
      return "_:-ms-lang(x)" + shadowSelector + ", svg" + shadowSelector + " {pointer-events: none;}\n";
    }
    var _implicitStylesheets$1 = [stylesheet$1];

    function tmpl$1($api, $cmp, $slotset, $ctx) {
      const {
        fid: api_scoped_frag_id,
        h: api_element
      } = $api;
      return [api_element("svg", {
        className: $cmp.computedClass,
        attrs: {
          "focusable": "false",
          "data-key": $cmp.name,
          "aria-hidden": "true"
        },
        key: 2
      }, [api_element("use", {
        attrs: {
          "xlink:href": lwc.sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", api_scoped_frag_id($cmp.href))
        },
        key: 3
      }, [])])];
    }

    var _tmpl$1 = lwc.registerTemplate(tmpl$1);
    tmpl$1.stylesheets = [];

    if (_implicitStylesheets$1) {
      tmpl$1.stylesheets.push.apply(tmpl$1.stylesheets, _implicitStylesheets$1);
    }
    tmpl$1.stylesheetTokens = {
      hostAttribute: "lightning-primitiveIcon_primitiveIcon-host",
      shadowAttribute: "lightning-primitiveIcon_primitiveIcon"
    };

    const proto = {
      add(className) {
        if (typeof className === 'string') {
          this[className] = true;
        } else {
          Object.assign(this, className);
        }

        return this;
      },

      invert() {
        Object.keys(this).forEach(key => {
          this[key] = !this[key];
        });
        return this;
      },

      toString() {
        return Object.keys(this).filter(key => this[key]).join(' ');
      }

    };
    function classSet(config) {
      if (typeof config === 'string') {
        const key = config;
        config = {};
        config[key] = true;
      }

      return Object.assign(Object.create(proto), config);
    }

    /**
     * Takes label strings with placeholder params (`{0}`) and updates the label with given `args`
     * @param {string} str - any label string requiring injections of other strings/params (e.g., 'foo {0}')
     * @param  {string|array} arguments - string(s) to be injected into the `string` param
     * @returns {string} fully replaced string, e.g., '{0} is a {1}' -> 'Hal Jordan is a Green Lantern'
     */

    // NOTE: lightning-utils is a public library. adding new utils here means we

    /**
     * Create a deep copy of an object or array
     * @param {object|array} obj - item to be copied
     * @returns {object|array} copy of the item
     */
    function deepCopy(obj) {
      if (Object(obj) !== obj) {
        // primitives
        return obj;
      }

      if (obj instanceof Set) {
        return new Set(obj);
      }

      if (obj instanceof Date) {
        return new Date(obj);
      }

      if (typeof obj === 'function') {
        return obj.bind({});
      }

      if (Array.isArray(obj)) {
        const obj2 = [];
        const len = obj.length;

        for (let i = 0; i < len; i++) {
          obj2.push(deepCopy(obj[i]));
        }

        return obj2;
      }

      const result = Object.create({});
      let keys = Object.keys(obj);

      if (obj instanceof Error) {
        // Error properties are non-enumerable
        keys = Object.getOwnPropertyNames(obj);
      }

      const len = keys.length;

      for (let i = 0; i < len; i++) {
        const key = keys[i];
        result[key] = deepCopy(obj[key]);
      }

      return result;
    }

    /**
     * Utility function to generate an unique guid.
     * used on state objects to provide a performance aid when iterating
     * through the items and marking them for render
     * @returns {String} an unique string ID
     */
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    function classListMutation(classList, config) {
      Object.keys(config).forEach(key => {
        if (typeof key === 'string' && key.length) {
          if (config[key]) {
            classList.add(key);
          } else {
            classList.remove(key);
          }
        }
      });
    }

    /**
    A string normalization utility for attributes.
    @param {String} value - The value to normalize.
    @param {Object} config - The optional configuration object.
    @param {String} [config.fallbackValue] - The optional fallback value to use if the given value is not provided or invalid. Defaults to an empty string.
    @param {Array} [config.validValues] - An optional array of valid values. Assumes all input is valid if not provided.
    @return {String} - The normalized value.
    **/
    function normalizeString(value, config = {}) {
      const {
        fallbackValue = '',
        validValues,
        toLowerCase = true
      } = config;
      let normalized = typeof value === 'string' && value.trim() || '';
      normalized = toLowerCase ? normalized.toLowerCase() : normalized;

      if (validValues && validValues.indexOf(normalized) === -1) {
        normalized = fallbackValue;
      }

      return normalized;
    }

    const isIE11 = isIE11Test(navigator);
    const isChrome = isChromeTest(navigator);
    const isSafari = isSafariTest(window.safari); // The following functions are for tests only

    function isIE11Test(navigator) {
      // https://stackoverflow.com/questions/17447373/how-can-i-target-only-internet-explorer-11-with-javascript
      return /Trident.*rv[ :]*11\./.test(navigator.userAgent);
    }
    function isChromeTest(navigator) {
      // https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
      return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    }
    function isSafariTest(safari) {
      // via https://stackoverflow.com/a/9851769
      return safari && safari.pushNotification && safari.pushNotification.toString() === '[object SafariRemoteNotification]';
    }

    /**
     * Set an attribute on an element, if it's a normal element
     * it will use setAttribute, if it's an LWC component
     * it will use the public property
     *
     * @param {HTMLElement} element The element to act on
     * @param {String} attribute the attribute to set
     * @param {Any} value the value to set
     */

    // hide panel on scroll

    var _tmpl$2 = void 0;

    // Taken from https://github.com/jonathantneal/svg4everybody/pull/139
    // Remove this iframe-in-edge check once the following is resolved https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8323875/
    const isEdgeUA = /\bEdge\/.(\d+)\b/.test(navigator.userAgent);
    const inIframe = window.top !== window.self;
    const isIframeInEdge = isEdgeUA && inIframe;
    var isIframeInEdge$1 = lwc.registerComponent(isIframeInEdge, {
      tmpl: _tmpl$2
    });

    // Taken from https://git.soma.salesforce.com/aura/lightning-global/blob/999dc35f948246181510df6e56f45ad4955032c2/src/main/components/lightning/SVGLibrary/stamper.js#L38-L60
    function fetchSvg(url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr);
            }
          }
        };
      });
    }

    // Which looks like it was inspired by https://github.com/jonathantneal/svg4everybody/blob/377d27208fcad3671ed466e9511556cb9c8b5bd8/lib/svg4everybody.js#L92-L107
    // Modify at your own risk!

    const newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/;
    const webkitUA = /\bAppleWebKit\/(\d+)\b/;
    const olderEdgeUA = /\bEdge\/12\.(\d+)\b/;
    const isIE = newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537;
    const supportsSvg = !isIE && !isIframeInEdge$1;
    var supportsSvg$1 = lwc.registerComponent(supportsSvg, {
      tmpl: _tmpl$2
    });

    /**
    This polyfill injects SVG sprites into the document for clients that don't
    fully support SVG. We do this globally at the document level for performance
    reasons. This causes us to lose namespacing of IDs across sprites. For example,
    if both #image from utility sprite and #image from doctype sprite need to be
    rendered on the page, both end up as #image from the doctype sprite (last one
    wins). SLDS cannot change their image IDs due to backwards-compatibility
    reasons so we take care of this issue at runtime by adding namespacing as we
    polyfill SVG elements.

    For example, given "/assets/icons/action-sprite/svg/symbols.svg#approval", we
    replace the "#approval" id with "#${namespace}-approval" and a similar
    operation is done on the corresponding symbol element.
    **/
    const svgTagName = /svg/i;

    const isSvgElement = el => el && svgTagName.test(el.nodeName);

    const requestCache = {};
    const symbolEls = {};
    const svgFragments = {};
    const spritesContainerId = 'slds-svg-sprites';
    let spritesEl;
    function polyfill(el) {
      if (!supportsSvg$1 && isSvgElement(el)) {
        if (!spritesEl) {
          spritesEl = document.createElement('svg');
          spritesEl.xmlns = 'http://www.w3.org/2000/svg';
          spritesEl['xmlns:xlink'] = 'http://www.w3.org/1999/xlink';
          spritesEl.style.display = 'none';
          spritesEl.id = spritesContainerId;
          document.body.insertBefore(spritesEl, document.body.childNodes[0]);
        }

        Array.from(el.getElementsByTagName('use')).forEach(use => {
          // We access the href differently in raptor and in aura, probably
          // due to difference in the way the svg is constructed.
          const src = use.getAttribute('xlink:href') || use.getAttribute('href');

          if (src) {
            // "/assets/icons/action-sprite/svg/symbols.svg#approval" =>
            // ["/assets/icons/action-sprite/svg/symbols.svg", "approval"]
            const parts = src.split('#');
            const url = parts[0];
            const id = parts[1];
            const namespace = url.replace(/[^\w]/g, '-');
            const href = `#${namespace}-${id}`;

            if (url.length) {
              // set the HREF value to no longer be an external reference
              if (use.getAttribute('xlink:href')) {
                use.setAttribute('xlink:href', href);
              } else {
                use.setAttribute('href', href);
              } // only insert SVG content if it hasn't already been retrieved


              if (!requestCache[url]) {
                requestCache[url] = fetchSvg(url);
              }

              requestCache[url].then(svgContent => {
                // create a document fragment from the svgContent returned (is parsed by HTML parser)
                if (!svgFragments[url]) {
                  const svgFragment = document.createRange().createContextualFragment(svgContent);
                  svgFragments[url] = svgFragment;
                }

                if (!symbolEls[href]) {
                  const svgFragment = svgFragments[url];
                  const symbolEl = svgFragment.querySelector(`#${id}`);
                  symbolEls[href] = true;
                  symbolEl.id = `${namespace}-${id}`;
                  spritesEl.appendChild(symbolEl);
                }
              });
            }
          }
        });
      }
    }

    const validNameRe = /^([a-zA-Z]+):([a-zA-Z]\w*)$/;
    const underscoreRe = /_/g;
    let pathPrefix;
    const tokenNameMap = Object.assign(Object.create(null), {
      action: 'lightning.actionSprite',
      custom: 'lightning.customSprite',
      doctype: 'lightning.doctypeSprite',
      standard: 'lightning.standardSprite',
      utility: 'lightning.utilitySprite'
    });
    const tokenNameMapRtl = Object.assign(Object.create(null), {
      action: 'lightning.actionSpriteRtl',
      custom: 'lightning.customSpriteRtl',
      doctype: 'lightning.doctypeSpriteRtl',
      standard: 'lightning.standardSpriteRtl',
      utility: 'lightning.utilitySpriteRtl'
    });
    const defaultTokenValueMap = Object.assign(Object.create(null), {
      'lightning.actionSprite': '/assets/icons/action-sprite/svg/symbols.svg',
      'lightning.actionSpriteRtl': '/assets/icons/action-sprite/svg/symbols.svg',
      'lightning.customSprite': '/assets/icons/custom-sprite/svg/symbols.svg',
      'lightning.customSpriteRtl': '/assets/icons/custom-sprite/svg/symbols.svg',
      'lightning.doctypeSprite': '/assets/icons/doctype-sprite/svg/symbols.svg',
      'lightning.doctypeSpriteRtl': '/assets/icons/doctype-sprite/svg/symbols.svg',
      'lightning.standardSprite': '/assets/icons/standard-sprite/svg/symbols.svg',
      'lightning.standardSpriteRtl': '/assets/icons/standard-sprite/svg/symbols.svg',
      'lightning.utilitySprite': '/assets/icons/utility-sprite/svg/symbols.svg',
      'lightning.utilitySpriteRtl': '/assets/icons/utility-sprite/svg/symbols.svg'
    });

    const getDefaultBaseIconPath = (category, nameMap) => defaultTokenValueMap[nameMap[category]];

    const getBaseIconPath = (category, direction) => {
      const nameMap = direction === 'rtl' ? tokenNameMapRtl : tokenNameMap;
      return configProvider.getToken(nameMap[category]) || getDefaultBaseIconPath(category, nameMap);
    };

    const getMatchAtIndex = index => iconName => {
      const result = validNameRe.exec(iconName);
      return result ? result[index] : '';
    };

    const getCategory = getMatchAtIndex(1);
    const getName = getMatchAtIndex(2);
    const isValidName = iconName => validNameRe.test(iconName);
    const getIconPath = (iconName, direction = 'ltr') => {
      pathPrefix = pathPrefix !== undefined ? pathPrefix : configProvider.getPathPrefix();

      if (isValidName(iconName)) {
        const baseIconPath = getBaseIconPath(getCategory(iconName), direction);

        if (baseIconPath) {
          // This check was introduced the following MS-Edge issue:
          // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/9655192/
          // If and when this get fixed, we can safely remove this block of code.
          if (isIframeInEdge$1) {
            // protocol => 'https:' or 'http:'
            // host => hostname + port
            const origin = `${window.location.protocol}//${window.location.host}`;
            return `${origin}${pathPrefix}${baseIconPath}#${getName(iconName)}`;
          }

          return `${pathPrefix}${baseIconPath}#${getName(iconName)}`;
        }
      }

      return '';
    };
    const computeSldsClass = iconName => {
      if (isValidName(iconName)) {
        const category = getCategory(iconName);
        const name = getName(iconName).replace(underscoreRe, '-');
        return `slds-icon-${category}-${name}`;
      }

      return '';
    };

    class LightningPrimitiveIcon extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.iconName = void 0;
        this.src = void 0;
        this.svgClass = void 0;
        this.size = 'medium';
        this.variant = void 0;
        this.privateIconSvgTemplates = configProvider.getIconSvgTemplates();
      }

      get inlineSvgProvided() {
        return !!this.privateIconSvgTemplates;
      }

      renderedCallback() {
        if (this.iconName !== this.prevIconName && !this.inlineSvgProvided) {
          this.prevIconName = this.iconName;
          const svgElement = this.template.querySelector('svg');
          polyfill(svgElement);
        }
      }

      get href() {
        return this.src || getIconPath(this.iconName, dir);
      }

      get name() {
        return getName(this.iconName);
      }

      get normalizedSize() {
        return normalizeString(this.size, {
          fallbackValue: 'medium',
          validValues: ['xx-small', 'x-small', 'small', 'medium', 'large']
        });
      }

      get normalizedVariant() {
        // NOTE: Leaving a note here because I just wasted a bunch of time
        // investigating why both 'bare' and 'inverse' are supported in
        // lightning-primitive-icon. lightning-icon also has a deprecated
        // 'bare', but that one is synonymous to 'inverse'. This 'bare' means
        // that no classes should be applied. So this component needs to
        // support both 'bare' and 'inverse' while lightning-icon only needs to
        // support 'inverse'.
        return normalizeString(this.variant, {
          fallbackValue: '',
          validValues: ['bare', 'error', 'inverse', 'warning', 'success']
        });
      }

      get computedClass() {
        const {
          normalizedSize,
          normalizedVariant
        } = this;
        const classes = classSet(this.svgClass);

        if (normalizedVariant !== 'bare') {
          classes.add('slds-icon');
        }

        switch (normalizedVariant) {
          case 'error':
            classes.add('slds-icon-text-error');
            break;

          case 'warning':
            classes.add('slds-icon-text-warning');
            break;

          case 'success':
            classes.add('slds-icon-text-success');
            break;

          case 'inverse':
          case 'bare':
            break;

          default:
            // if custom icon is set, we don't want to set
            // the text-default class
            if (!this.src) {
              classes.add('slds-icon-text-default');
            }

        }

        if (normalizedSize !== 'medium') {
          classes.add(`slds-icon_${normalizedSize}`);
        }

        return classes.toString();
      }

      resolveTemplate() {
        const name = this.iconName;

        if (isValidName(name)) {
          const [spriteName, iconName] = name.split(':');
          const template = this.privateIconSvgTemplates[`${spriteName}_${iconName}`];

          if (template) {
            return template;
          }
        }

        return _tmpl$1;
      }

      render() {
        if (this.inlineSvgProvided) {
          return this.resolveTemplate();
        }

        return _tmpl$1;
      }

    }

    lwc.registerDecorators(LightningPrimitiveIcon, {
      publicProps: {
        iconName: {
          config: 0
        },
        src: {
          config: 0
        },
        svgClass: {
          config: 0
        },
        size: {
          config: 0
        },
        variant: {
          config: 0
        }
      }
    });

    var _lightningPrimitiveIcon = lwc.registerComponent(LightningPrimitiveIcon, {
      tmpl: _tmpl$1
    });

    function tmpl$2($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        d: api_dynamic,
        h: api_element
      } = $api;
      return [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
        props: {
          "iconName": $cmp.state.iconName,
          "size": $cmp.size,
          "variant": $cmp.variant,
          "src": $cmp.state.src
        },
        key: 2
      }, []), $cmp.alternativeText ? api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        key: 3
      }, [api_dynamic($cmp.alternativeText)]) : null];
    }

    var _tmpl$3 = lwc.registerTemplate(tmpl$2);
    tmpl$2.stylesheets = [];
    tmpl$2.stylesheetTokens = {
      hostAttribute: "lightning-icon_icon-host",
      shadowAttribute: "lightning-icon_icon"
    };

    /**
     * Represents a visual element that provides context and enhances usability.
     */

    class LightningIcon extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.state = {};
        this.alternativeText = void 0;
      }

      /**
       * A uri path to a custom svg sprite, including the name of the resouce,
       * for example: /assets/icons/standard-sprite/svg/test.svg#icon-heart
       * @type {string}
       */
      get src() {
        return this.privateSrc;
      }

      set src(value) {
        this.privateSrc = value; // if value is not present, then we set the state back
        // to the original iconName that was passed
        // this might happen if the user sets a custom icon, then
        // decides to revert back to SLDS by removing the src attribute

        if (!value) {
          this.state.iconName = this.iconName;
          this.classList.remove('slds-icon-standard-default');
        } // if isIE11 and the src is set
        // we'd like to show the 'standard:default' icon instead
        // for performance reasons.


        if (value && isIE11) {
          this.setDefault();
          return;
        }

        this.state.src = value;
      }
      /**
       * The Lightning Design System name of the icon.
       * Names are written in the format 'utility:down' where 'utility' is the category,
       * and 'down' is the specific icon to be displayed.
       * @type {string}
       * @required
       */


      get iconName() {
        return this.privateIconName;
      }

      set iconName(value) {
        this.privateIconName = value; // if src is set, we don't need to validate
        // iconName

        if (this.src) {
          return;
        }

        if (isValidName(value)) {
          const isAction = getCategory(value) === 'action'; // update classlist only if new iconName is different than state.iconName
          // otherwise classListMutation receives class:true and class: false and removes slds class

          if (value !== this.state.iconName) {
            classListMutation(this.classList, {
              'slds-icon_container_circle': isAction,
              [computeSldsClass(value)]: true,
              [computeSldsClass(this.state.iconName)]: false
            });
          }

          this.state.iconName = value;
        } else {
          console.warn(`<lightning-icon> Invalid icon name ${value}`); // eslint-disable-line no-console
          // Invalid icon names should render a blank icon. Remove any
          // classes that might have been previously added.

          classListMutation(this.classList, {
            'slds-icon_container_circle': false,
            [computeSldsClass(this.state.iconName)]: false
          });
          this.state.iconName = undefined;
        }
      }
      /**
       * The size of the icon. Options include xx-small, x-small, small, medium, or large.
       * The default is medium.
       * @type {string}
       * @default medium
       */


      get size() {
        return normalizeString(this.state.size, {
          fallbackValue: 'medium',
          validValues: ['xx-small', 'x-small', 'small', 'medium', 'large']
        });
      }

      set size(value) {
        this.state.size = value;
      }
      /**
       * The variant changes the appearance of a utility icon.
       * Accepted variants include inverse, success, warning, and error.
       * Use the inverse variant to implement a white fill in utility icons on dark backgrounds.
       * @type {string}
       */


      get variant() {
        return normalizeVariant(this.state.variant, this.state.iconName);
      }

      set variant(value) {
        this.state.variant = value;
      }

      connectedCallback() {
        this.classList.add('slds-icon_container');
      }

      setDefault() {
        this.state.src = undefined;
        this.state.iconName = 'standard:default';
        this.classList.add('slds-icon-standard-default');
      }

    }

    lwc.registerDecorators(LightningIcon, {
      publicProps: {
        alternativeText: {
          config: 0
        },
        src: {
          config: 3
        },
        iconName: {
          config: 3
        },
        size: {
          config: 3
        },
        variant: {
          config: 3
        }
      },
      track: {
        state: 1
      }
    });

    var _lightningIcon = lwc.registerComponent(LightningIcon, {
      tmpl: _tmpl$3
    });

    function normalizeVariant(variant, iconName) {
      // Unfortunately, the `bare` variant was implemented to do what the
      // `inverse` variant should have done. Keep this logic for as long as
      // we support the `bare` variant.
      if (variant === 'bare') {
        // TODO: Deprecation warning using strippable assertion
        variant = 'inverse';
      }

      if (getCategory(iconName) === 'utility') {
        return normalizeString(variant, {
          fallbackValue: '',
          validValues: ['error', 'inverse', 'warning', 'success']
        });
      }

      return 'inverse';
    }

    function tmpl$3($api, $cmp, $slotset, $ctx) {
      const {
        d: api_dynamic,
        h: api_element,
        c: api_custom_element,
        b: api_bind
      } = $api;
      const {
        _m0,
        _m1
      } = $ctx;
      return [api_element("li", {
        classMap: {
          "slds-coordinates__item": true
        },
        key: 2,
        on: {
          "click": _m1 || ($ctx._m1 = api_bind($cmp.handleClick))
        }
      }, [api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        attrs: {
          "aria-live": "polite"
        },
        key: 3
      }, [api_dynamic($cmp.computedAssistiveText)]), api_element("button", {
        classMap: {
          "slds-coordinates__item-action": true,
          "slds-button_reset": true,
          "slds-media": true
        },
        attrs: {
          "aria-pressed": $cmp.selected
        },
        key: 4,
        on: {
          "mouseover": _m0 || ($ctx._m0 = api_bind($cmp.handleMouseOver))
        }
      }, [api_element("span", {
        classMap: {
          "slds-media__figure": true
        },
        key: 5
      }, [api_custom_element("lightning-icon", _lightningIcon, {
        props: {
          "iconName": $cmp.iconName,
          "alternativeText": "Coordinate"
        },
        key: 6
      }, [])]), api_element("span", {
        classMap: {
          "slds-media__body": true
        },
        key: 7
      }, [api_element("span", {
        classMap: {
          "slds-text-link": true
        },
        key: 8
      }, [api_dynamic($cmp.itemTitle)]), api_element("span", {
        key: 9
      }, [api_dynamic($cmp.itemAddress)])])])])];
    }

    var _tmpl$4 = lwc.registerTemplate(tmpl$3);
    tmpl$3.stylesheets = [];
    tmpl$3.stylesheetTokens = {
      hostAttribute: "lightning-primitiveCoordinateItem_primitiveCoordinateItem-host",
      shadowAttribute: "lightning-primitiveCoordinateItem_primitiveCoordinateItem"
    };

    var labelSelectedItem = 'is currently selected';

    const i18n = {
      labelSelectedItemString: labelSelectedItem
    };

    class LightningPrimitiveCoordinateItem extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.itemAddress = void 0;
        this.itemTitle = void 0;
        this.iconName = void 0;
        this.guid = void 0;
        this.selected = false;
      }

      /**
       * getter for the i18 constant containing the localized strings
       */
      get i18n() {
        return i18n;
      }

      connectedCallback() {
        this.dispatchEvent(new CustomEvent('privatecoordinateregister', {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: {
            key: this.guid
          }
        }));
      }

      get computedAssistiveText() {
        if (this.selected === true) {
          return `${this.itemTitle} ${i18n.labelSelectedItemString}`;
        }

        return '';
      }

      handleMouseOver() {
        const coordinatehover = new CustomEvent('coordinatesmouseover', {
          detail: {
            key: this.guid
          }
        });
        this.dispatchEvent(coordinatehover);
      }

      handleClick() {
        const coordinateclick = new CustomEvent('coordinateclick', {
          detail: {
            key: this.guid
          }
        });
        this.dispatchEvent(coordinateclick);
      }

    }

    lwc.registerDecorators(LightningPrimitiveCoordinateItem, {
      publicProps: {
        itemAddress: {
          config: 0
        },
        itemTitle: {
          config: 0
        },
        iconName: {
          config: 0
        },
        guid: {
          config: 0
        },
        selected: {
          config: 0
        }
      }
    });

    var _lightningPrimitiveCoordinateItem = lwc.registerComponent(LightningPrimitiveCoordinateItem, {
      tmpl: _tmpl$4
    });

    function tmpl$4($api, $cmp, $slotset, $ctx) {
      const {
        gid: api_scoped_id,
        b: api_bind,
        c: api_custom_element,
        h: api_element,
        d: api_dynamic,
        fid: api_scoped_frag_id,
        t: api_text,
        k: api_key,
        i: api_iterator
      } = $api;
      const {
        _m0,
        _m1,
        _m2,
        _m3
      } = $ctx;
      return [api_element("div", {
        classMap: {
          "slds-map_container": true
        },
        key: 2
      }, [api_element("div", {
        classMap: {
          "slds-map": true
        },
        key: 3
      }, [api_custom_element("lightning-primitive-iframe", _lightningPrimitiveIframe, {
        props: {
          "id": api_scoped_id("mapContainer"),
          "title": $cmp.i18n.primitiveMapIframeTitle,
          "src": $cmp.mapSrc,
          "domain": $cmp.mapDomain
        },
        key: 4,
        on: {
          "iframeload": _m0 || ($ctx._m0 = api_bind($cmp.handleIframeLoad))
        }
      }, [])]), $cmp.showFooter ? api_element("div", {
        classMap: {
          "slds-p-around_medium": true
        },
        key: 6
      }, [api_element("a", {
        classMap: {
          "slds-button": true,
          "slds-button_brand": true
        },
        attrs: {
          "href": api_scoped_frag_id($cmp.mapHref),
          "target": "_blank"
        },
        key: 7
      }, [api_dynamic($cmp.i18n.openInGoogleMapsString)])]) : null]), $cmp.showCoordinatesSidebar ? api_element("div", {
        classMap: {
          "slds-coordinates": true
        },
        key: 9
      }, [api_element("div", {
        classMap: {
          "slds-coordinates__header": true
        },
        key: 10
      }, [api_element("h2", {
        classMap: {
          "slds-coordinates__title": true
        },
        key: 11
      }, [api_dynamic($cmp.markersTitle), api_text(" ("), api_dynamic($cmp._coordinates.length), api_text(")")])]), api_element("ul", {
        classMap: {
          "slds-coordinates__list": true
        },
        key: api_key(12, $cmp.computeGuid),
        on: {
          "privatecoordinateregister": _m3 || ($ctx._m3 = api_bind($cmp.handleCoordinateRegister))
        }
      }, api_iterator($cmp._coordinates, function (coordinate) {
        return api_element("li", {
          classMap: {
            "slds-coordinates__item": true
          },
          key: api_key(14, coordinate.key)
        }, [api_custom_element("lightning-primitive-coordinate-item", _lightningPrimitiveCoordinateItem, {
          props: {
            "itemTitle": coordinate.title,
            "itemAddress": coordinate.formattedAddress,
            "iconName": coordinate.icon,
            "guid": coordinate.key
          },
          key: api_key(15, coordinate.key),
          on: {
            "coordinateclick": _m1 || ($ctx._m1 = api_bind($cmp.handleCoordinateClick)),
            "coordinatesmouseover": _m2 || ($ctx._m2 = api_bind($cmp.handleCoordinateHover))
          }
        }, [])]);
      }))]) : null];
    }

    var _tmpl$5 = lwc.registerTemplate(tmpl$4);
    tmpl$4.stylesheets = [];

    if (_implicitStylesheets) {
      tmpl$4.stylesheets.push.apply(tmpl$4.stylesheets, _implicitStylesheets);
    }
    tmpl$4.stylesheetTokens = {
      hostAttribute: "lightning-map_map-host",
      shadowAttribute: "lightning-map_map"
    };

    var labelOpenInGoogleMaps = 'Open in Google Maps';

    var labelCoordinatesTitle = 'Markers';

    var labelIframeTitle = 'Map Container';

    /**
     * Build a human readable string of address components.
     * e.g. "1 Market St, San Francisco CA"
     * @param {Object} coordinate - either a Latitude, Longitude pair or address components.
     * @returns {String} - formatted address.
     */

    function formatAddress(coordinate) {
      let formattedAddress;

      if (coordinate.Latitude && coordinate.Longitude && !coordinate.Street) {
        formattedAddress = `${coordinate.Latitude}, ${coordinate.Longitude}`;
      } else {
        formattedAddress = [coordinate.Street, coordinate.City, coordinate.State].filter(value => value) // remove falsy values
        .join(', ');
      }

      return formattedAddress;
    }
    /**
     * Convert a passed-in string to Title Case.
     * e.g. hello world => Hello World
     * @param {String} string  - a string
     * @returns {String} titleCasedString - A String In Title Case Format
     */

    function titleCase(string) {
      return normalizeString(string).split(' ').map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');
    }

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    const i18n$1 = {
      openInGoogleMapsString: labelOpenInGoogleMaps,
      coordinatesTitleString: labelCoordinatesTitle,
      primitiveMapIframeTitle: labelIframeTitle
    };
    const EXTERNAL_GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/';
    /**
     * Displays a map with markers for one or more locations.
     */

    class LightningMap extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this._mapHref = EXTERNAL_GOOGLE_MAPS_URL;
        this._coordinates = [];
        this._activeCoordinate = null;
        this._markersTitle = i18n$1.coordinatesTitleString;
        this.privateZoomLevel = null;
        this.privateCenter = null;
        this.privateMarkers = null;
        this.privateCoordinateItems = [];
        this.mapDomain = `https://maps${configProvider.getCoreInfo().untrustedContentDomain}:${configProvider.getCoreInfo().securePort}`;
        this.mapSrc = `${this.mapDomain}/lightningmaps/mapsloader?resource=primitiveMap&version=${configProvider.getCoreInfo().internalAppVersion}`;
        this.showFooter = false;
        this.listView = 'auto';
      }

      /**
       * @param {Integer} value - Corresponds to zoom levels defined in Google Maps API
       * If not specified, automatically chooses an appropriate zoom level
       * to show all markers with comfortable margins.
       */
      set zoomLevel(value) {
        this.privateZoomLevel = value;
        this.postToIframe({
          zoomLevel: this.privateZoomLevel
        });
      }
      /**
       * The zoom levels as defined by Google Maps API.
       * If a zoom level is not specified, a default zoom level is applied to accommodate all markers on the map.
       * @type {number}
       */


      get zoomLevel() {
        return this.privateZoomLevel;
      }
      /**
       * @param {Object} value - A single address value to center the map around
       */


      set center(value) {
        this.privateCenter = value;
        const computedCenter = this.primitivifyMarker(deepCopy(this.center));
        this.postToIframe({
          center: computedCenter
        });
      }
      /**
       * A location to use as the map's center.
       * If center is not specified, the map centers automatically.
       *
       * @type {object}
       */


      get center() {
        return this.privateCenter;
      }
      /**
       * Setter for the markersTitle property.
       * @param {String} title - A title string for the list of locations
       */


      set markersTitle(title) {
        this._markersTitle = titleCase(title);
      }
      /**
       * Provides the heading title for the markers. Required if specifying multiple markers.
       * The title is displayed below the map as a header for the list of clickable addresses.
       *
       * @type {string}
       */


      get markersTitle() {
        return this._markersTitle;
      }
      /**
       * Setter for the selectedMarkerValue property.
       * @param {String} value - The value of the selected marker
       */


      set selectedMarkerValue(value) {
        const selectedMarker = this._coordinatesMapByValue[value];
        const selectedMarkerKey = selectedMarker && selectedMarker.key;
        this.selectMarker(selectedMarkerKey);
      }
      /**
       * Provides the value of the currently selected marker.
       * If the selected marker does not have the value property specified, then returns undefined.
       * @type {String}
       */


      get selectedMarkerValue() {
        const selectedMarker = this._coordinatesMapByKey[this._activeMarkerId];
        return selectedMarker && selectedMarker.value;
      }
      /**
       * Setter function, for mapMarkers.
       * Depending on the number of markers passed, we display a single view map or
       * a map with multiple markers and a list of coordinates
       * @param {Object[]} mapMarkers - the markers array with the following format:
       * map-markers = [
       *  {
       *      location: {
       *           City: 'San Francisco',
       *           Country: 'USA',
       *           PostalCode: '94105',
       *           state: 'CA',
       *           street: '50 Fremont St',
       *       },
       *      value: 'unique identifier 001',
       *      // Extra info for tile in sidebar
       *      icon: 'standard:account',
       *      title: 'Julies Kitchen', // e.g. Account.Name
       *  },
       *  {
       *      location: {
       *          City: 'San Francisco',
       *          Country: 'USA',
       *          PostalCode: '94105',
       *          State: 'CA',
       *          Street: '30 Fremont St.',
       *      },
       *      value: 'unique identifier 002',
       *      icon: 'standard:account',
       *      title: 'Tender Greens', // e.g. Account.Name
       *  }
       */


      set mapMarkers(mapMarkers) {
        this.privateMarkers = mapMarkers;
        this.initMarkers(mapMarkers);
        this._activeCoordinate = mapMarkers[0];
      }
      /**
       * One or more objects with the address or latitude and longitude to be displayed on the map.
       * If latitude and longitude are provided, the address is ignored.
       * @type {array}
       * @required
       */


      get mapMarkers() {
        return this.privateMarkers;
      }
      /**
       * getter for the i18 constant containing the localized strings
       */


      get i18n() {
        return i18n$1;
      }
      /**
       * returns the href link to open the map on an external window.
       * e.g. "https://www.google.com/maps/place/1+Market+St,+San+Francisco,+CA+94105"
       */


      get mapHref() {
        const activeCoordinate = this._activeCoordinate.location;
        let mapHrefURL = '';

        if (activeCoordinate.Latitude && activeCoordinate.Longitude) {
          mapHrefURL = encodeURI(`${EXTERNAL_GOOGLE_MAPS_URL}${activeCoordinate.Latitude},${activeCoordinate.Longitude}`);
        } else {
          mapHrefURL = encodeURI(`${EXTERNAL_GOOGLE_MAPS_URL}${normalizeString(activeCoordinate.Street)}+${normalizeString(activeCoordinate.City)}+${normalizeString(activeCoordinate.State)}+${normalizeString(activeCoordinate.PostalCode)}`);
        }

        return mapHrefURL;
      }
      /**
       * Controls the visibility of the coordinates list-view/sidebar.
       * See listView attribute.
       */


      get showCoordinatesSidebar() {
        const outputs = {
          visible: true,
          hidden: false,
          auto: this._coordinates && this._coordinates.length > 1
        };
        return outputs[this.listView];
      }

      connectedCallback() {
        classListMutation(this.classList, {
          'slds-grid': true,
          'slds-has-coordinates': this.showCoordinatesSidebar
        });
        window.addEventListener('message', this.handleMessage.bind(this));
      }
      /**
       * Function to normalize and store the coordinates being passed.
       * We store an array with all the coordindates as well as a map for easy access.
       * @param {Object} mapMarkers - Array of Coordindates
       */


      initMarkers(mapMarkers) {
        const mapMarkersLength = mapMarkers.length;
        const coordinates = [];
        const coordinatesMapByKey = {};
        const coordinatesMapByValue = {};
        let i = 0,
            coordinate = {},
            key;

        for (i; i < mapMarkersLength; i++) {
          key = guid();
          coordinate = deepCopy(mapMarkers[i]);
          coordinate.key = key;
          coordinate.formattedAddress = formatAddress(coordinate.location);

          if (!coordinate.icon) {
            coordinate.icon = 'standard:location';
          }

          coordinates.push(coordinate);
          coordinatesMapByKey[key] = coordinate;

          if (coordinate.value) {
            coordinatesMapByValue[coordinate.value] = coordinate;
          }
        }

        this._coordinates = coordinates;
        this._coordinatesMapByKey = coordinatesMapByKey;
        this._coordinatesMapByValue = coordinatesMapByValue;

        const markers = this._coordinates.map(marker => this.primitivifyMarker(marker));

        this.postToIframe({
          markers
        });
      }

      handleCoordinateRegister(event) {
        event.stopPropagation(); // suppressing event since its not part of public API

        this.privateCoordinateItems.push(event.srcElement);
      }
      /**
       * Click handler for the coordinate click.
       * On click we post the coordinate key to the primitive map so it can get selected
       * @param {Object} event - The event object containing the key of the coordinate clicked
       */


      handleCoordinateClick(event) {
        const key = event.detail.key;
        this.selectMarker(key);
        this.postToIframe({
          activeMarkerId: this._activeMarkerId
        });
      }
      /**
       * Click handler for the coordinate hover.
       * @param {Object} event - The event object containing the key of the coordinate hovered
       */


      handleCoordinateHover(event) {
        this._hoverMarkerId = event.detail.key;
        this.postToIframe({
          hoverMarkerId: this._hoverMarkerId
        });
      }
      /**
       * Handle messages from the child iframe
       * @param {Object} event - The event object
       */


      handleMessage(event) {
        const messageType = event.data && event.data.event;

        if (messageType === 'markerselect') {
          const key = event.data.key;
          this.selectMarker(key);
        }
      }

      selectMarker(key) {
        const activeCoordinate = this._coordinatesMapByKey[key];
        this._activeCoordinate = activeCoordinate;
        this._activeMarkerId = key; // unselect other child coordinateitems from the coordinates list

        this.privateCoordinateItems.forEach(coordinate => {
          if (coordinate.guid === key) {
            coordinate.selected = true;
          } else {
            coordinate.selected = false;
          }
        }); // fire select event
        // eslint-disable-next-line lightning-global/no-custom-event-bubbling

        const markerSelectEvent = new CustomEvent('markerselect', {
          bubbles: true
        });
        this.dispatchEvent(markerSelectEvent);
      }
      /**
       * Create marker for sending to primitive map.
       * Extract only information that is relevant to primitive map
       * @param {Object} marker  - a marker containing location and related information.
       * @returns {Object} marker - a marker with only keys relevant to primitive map.
       */


      primitivifyMarker(marker) {
        let primitifiedMarker = null;

        if (marker && marker.location) {
          primitifiedMarker = _objectSpread({
            key: marker.key,
            title: marker.title,
            description: marker.description
          }, marker.location);
        }

        return primitifiedMarker;
      }
      /**
       * Method helper to posts messages to the map iframe
       * @param {Object} data - The payload to post to the iframe
       */


      postToIframe(data) {
        if (this.iframeLoaded) {
          this.mapIframe.callbacks.postToWindow(data);
        }
      }
      /**
       * handler function for when the iframe is loaded, at which point we
       * store a reference for the callback postToWindow method for iframe communication.
       * We also post the first payload of coordindates to the primitive map
       * @param {Object} event - The event object containing the postToWindow callback
       */


      handleIframeLoad(event) {
        const center = this.center ? this.primitivifyMarker(deepCopy(this.center)) : null;
        const zoomLevel = this.zoomLevel;
        const markers = deepCopy(this._coordinates).map(marker => this.primitivifyMarker(marker));
        this.iframeLoaded = true;
        this.mapIframe = event.detail;
        this.postToIframe({
          center,
          markers,
          zoomLevel
        });
      }

    }

    lwc.registerDecorators(LightningMap, {
      publicProps: {
        showFooter: {
          config: 0
        },
        listView: {
          config: 0
        },
        zoomLevel: {
          config: 3
        },
        center: {
          config: 3
        },
        markersTitle: {
          config: 3
        },
        selectedMarkerValue: {
          config: 3
        },
        mapMarkers: {
          config: 3
        }
      },
      track: {
        _mapHref: 1,
        _coordinates: 1,
        _activeCoordinate: 1,
        _markersTitle: 1
      }
    });

    var _lightningMap = lwc.registerComponent(LightningMap, {
      tmpl: _tmpl$5
    });

    function tmpl$5($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element
      } = $api;
      return [$cmp.field_loc.data ? api_custom_element("lightning-map", _lightningMap, {
        props: {
          "mapMarkers": $cmp.getMapMarker
        },
        key: 3
      }, []) : null];
    }

    var _tmpl$6 = lwc.registerTemplate(tmpl$5);
    tmpl$5.stylesheets = [];
    tmpl$5.stylesheetTokens = {
      hostAttribute: "lwc-locationMap_locationMap-host",
      shadowAttribute: "lwc-locationMap_locationMap"
    };

    var STREET_FIELD = {"fieldApiName":"Street__c","objectApiName":"FieldLocation__c"};

    var STATE_FIELD = {"fieldApiName":"State__c","objectApiName":"FieldLocation__c"};

    var CITY_FIELD = {"fieldApiName":"City__c","objectApiName":"FieldLocation__c"};

    class LocationMap extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.recordId = void 0;
        this.field_loc = void 0;
      }

      get mapMarker() {
        console.log('Hello');
        mapMarkers = [{
          location: {
            Street: this.field_loc.data.fields.Street__c.value,
            State: this.field_loc.data.fields.State__c.value,
            City: this.field_loc.data.fields.City__c.value
          },
          title: this.field_loc.data.fields.Street__c.value
        }];
        console.log('Help');
        return mapMarkers;
      }

      connectedCallback() {
        console.log('Hello World');
      }

    }

    lwc.registerDecorators(LocationMap, {
      publicProps: {
        recordId: {
          config: 0
        }
      },
      wire: {
        field_loc: {
          adapter: lds.getRecord,
          params: {
            recordId: "recordId"
          },
          static: {
            fields: [STREET_FIELD, STATE_FIELD, CITY_FIELD]
          }
        }
      }
    });

    var locationMap = lwc.registerComponent(LocationMap, {
      tmpl: _tmpl$6
    });

    return locationMap;

});
