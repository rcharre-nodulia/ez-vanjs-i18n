import van from "vanjs-core";
import I18n from '../src/I18n';

const {div, p, select, option} = van.tags;

const translations = new Map([
    ['en', {
        hello: 'Hello',
        world: 'World',
        greeting: (params) => `Hello ${params.name}`
    }],
    ['fr', {
        hello: 'Bonjour',
        world: 'Monde',
        greeting: (params) => `Bonjour ${params.name}`
    }]
]);

const i18n = new I18n(translations, 'en');
const App = () => div(
    select({
            value: i18n.locale.val,
            oninput: (e) => i18n.setLocale(e.target.value)
        },
        option({
            value: 'en',
        }, 'EN'),
        option({
            value: 'fr'
        }, 'FR')
    ),
    p(i18n.t('greeting', {name: 'John'})),
)

van.add(document.body, App())
