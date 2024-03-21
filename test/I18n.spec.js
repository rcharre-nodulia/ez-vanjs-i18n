import I18n from '../src/I18n';

const lang = {
    en: {
        top: 'Hello',
        greet: ({name}) => `Hello, ${name}!`,
        invalid: null,
        nested: {
            key: 'World',
            greet: ({name}) => `Hello, ${name}!`,
        },
    },
    fr: {
        top: 'Bonjour',
        greet: ({name}) => `Bonjour, ${name}!`,
        invalid: null,
        nested: {
            key: 'Monde',
            greet: ({name}) => `Bonjour, ${name}!`,
        },
    },
};

describe('I18n', () => {
    describe('constructor', () => {
        it('should create an I18n object', () => {
            const i18n = new I18n(new Map(Object.entries(lang)), 'en');
            expect(i18n).toBeInstanceOf(I18n);
        });
    });

    describe('locale', () => {
        it('should return the current locale', () => {
            const i18n = new I18n(new Map(Object.entries(lang)), 'en');
            expect(i18n.locale.val).toBe('en');
        });
    });

    describe('setLocale', () => {
        it('should set the current locale', () => {
            const i18n = new I18n(new Map(Object.entries(lang)), 'en');
            i18n.setLocale('fr');
            expect(i18n.locale.val).toBe('fr');
        });
    });

    describe('t', () => {
        it('should use string values as translations', () => {
            const i18n = new I18n(new Map(Object.entries(lang)), 'en');
            const result = i18n.t('top');
            expect(result.val).toBe('Hello');
        }),

        it('should use function values as translations', () => {
            const i18n = new I18n(new Map(Object.entries(lang)), 'en');
            const result = i18n.t('greet', {name: 'Alice'});
            expect(result.val).toBe('Hello, Alice!');
        }),

        it('should use nested object values as translations', () => {
            const i18n = new I18n(new Map(Object.entries(lang)), 'en');
            const result = i18n.t('nested.key');
            expect(result.val).toBe('World');
        }),

        it('should use nested object function values as translations', () => {
            const i18n = new I18n(new Map(Object.entries(lang)), 'en');
            const result = i18n.t('nested.greet', {name: 'Bob'});
            expect(result.val).toBe('Hello, Bob!');
        }),

        it('should update the translation when the locale changes', () => {
            const i18n = new I18n(new Map(Object.entries(lang)), 'en');
            const result = i18n.t('top');
            expect(result.val).toBe('Hello');

            i18n.setLocale('fr');
            expect(result.val).toBe('Bonjour');
        }),

        it('should return the key if the translation key is not found', () => {
            const key = 'missing';
            const i18n = new I18n(new Map(Object.entries(lang)), 'en');
            const result = i18n.t(key);
            expect(result.val).toBe(key);
        }),

        it('should return the key if the translation key is not found in a nested object', () => {
            const key = 'nested.missing';
            const i18n = new I18n(new Map(Object.entries(lang)), 'en');
            const result = i18n.t(key);
            expect(result.val).toBe(key);
        }),

        it('should return the key if the translation key is not a string or function', () => {
            const key = 'invalid';
            const i18n = new I18n(new Map(Object.entries(lang)), 'en');
            const result = i18n.t(key);
            expect(result.val).toBe(key);
        })
    })
});
