# Ez Vanjs i18n
Ez Vanjs i18n is a simple and easy to use internationalization library for VanJs.

## Installation
```npm install ez-vanjs-i18n```

## Usage
Import the **I18n** class
```javascript
import { I18n } from 'ez-vanjs-i18n';
```

Define a translation map
```javascript
const translations = new Map([
    ['en', {
        hello: 'Hello',
        nested: {
            world: 'World'
        },
        greeting: (params) => `Hello ${params.name}`
    }],
    ['fr', {
        hello: 'Bonjour',
        nested: {
            world: 'Monde'
        },
        greeting: (params) => `Bonjour ${params.name}`
    }]
]);
```

Create an instance of the **I18n** class
```javascript
const i18n = new I18n(translations, 'en');
```

Create a **stateful** translation variable
```javascript
const greeting = i18n.t('greeting', { name: 'John' });
```

## Example
A full example of how to use Ez Vanjs i18n can be found in the [example](https://github.com/rcharre-nodulia/ez-vanjs-i18n/tree/main/example) directory.
