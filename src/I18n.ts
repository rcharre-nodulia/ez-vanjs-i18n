import van, {State} from "vanjs-core";

export default class I18n {
    private locale: State<string>;
    private currentTranslation: State<Object | undefined>;

    constructor(private translations: Map<string, Object>,
                private defaultLocale: string) {
        this.locale = van.state(defaultLocale);
        this.currentTranslation = van.derive(() => translations.get(this.locale.val));
    };

    private translate(lang: Object, key: string, params: Object = {} ): string {
        const splitKey = key.split('.');
        let value: any = lang;
        for(let i = 0; i < splitKey.length; i++) {
            value = value[splitKey[i]];
            if (value === undefined) {
                value = key;
                console.warn(`Translation for key ${key} not found`);
                break;
            }
        }

        switch (typeof value) {
            case 'string':
                break;
            case 'function':
                value = value(params);
                break;
            default:
                value = key;
                console.warn(`Translation for key ${key} not found`);
                break;
        }
        return value;
    }

    public $t(key: string): State<string> {
        return van.derive(() => {
            const lang = this.currentTranslation.val;
            return lang != undefined ? this.translate(lang, key) : key;
        })
    }
}
