import van, {State} from "vanjs-core";

/**
 * A simple i18n class that uses vanjs to create a derived state that translates a key to a string using the current locale
 * @example
 * const translations = new Map([
 *    ['en', {
 *    hello: 'Hello',
 *    world: 'World',
 *    greeting: (params) => `Hello ${params.name}`
 *    }],
 *    ['fr', {
 *    hello: 'Bonjour',
 *    world: 'Monde',
 *    greeting: (params) => `Bonjour ${params.name}`
 *    }]
 *    ]);
 *
 *    const i18n = new I18n(translations, 'en');
 *    const greeting = i18n.t('greeting', {name: 'John'});
 *    const p = p(greeting);
 *    van.mount(p, document.body);
 *
 */
export default class I18n {
    _locale;
    _currentTranslation;

    /**
     * @param {Map<string, Object>} translations - Map of translations
     * @param {string} defaultLocale - The default locale
     */
    constructor(translations,
                defaultLocale) {
        this._locale = van.state(defaultLocale);
        this._currentTranslation = van.derive(() => translations.get(this._locale.val));
    };

    /**
     * The current locale state
     * @returns {State<string>} - The current locale state
     */
    get locale() {
        return this._locale;
    }

    /**
     * Set the current locale
     * @param {string} locale
     */
    setLocale(locale) {
        this._locale.val = locale;
    }

    /**
     * Translate a key to a string using the current locale
     *
     * @private
     * @param {Object} lang - The language object
     * @param {string} key - The key to translate
     * @param {Object} params - The parameters to pass to the translation function
     * @returns {string} - The translated string
     */
    _translate(lang, key, params = null ) {
        const splitKey = key.split('.');
        let ns = lang;

        for (const part of splitKey) {
            ns = ns[part];
            if (!ns) {
                break;
            }
        }

        if (!ns) {
            console.warn(`Translation for key ${key} not found`);
            return key;
        }

        let result = key;
        switch (typeof ns) {
            case 'function':
                result = ns(params);
                break;
            case 'string':
                result = ns;
                break;
            default:
                console.warn(`Unsupported translation type for key ${key}, type: ${typeof ns}`);
                break;
        }
        return result;
    }

    /**
     * Create a derived state that translates a key to a string using the current locale
     * @param {string} key - The key to translate
     * @param {Object} params - The parameters to pass to the translation function
     * @returns {State<string>} - The state that contains the translated string
     */
    t(key, params= null){
        return van.derive(() => {
            const lang = this._currentTranslation.val;
            return lang !== undefined ? this._translate(lang, key, params) : key;
        })
    }
}
