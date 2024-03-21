# Ez Vanjs i18n
Ez Vanjs i18n is a simple and easy to use internationalization library for VanJs.

## Installation
```npm install ez-vanjs-i18n```

## Usage
```javascript
import { I18n } from 'ez-vanjs-i18n';

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
const greeting = i18n.t('greeting', { name: 'John' });
```
## Example
An example of how to use Ez Vanjs i18n can be found in the example directory.
