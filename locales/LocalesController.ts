import { I18n } from 'i18n-js';
import en from './en.json';
import ru from './ru.json';

const i18n = new I18n();

i18n.store(en);
i18n.store(ru);

i18n.defaultLocale = 'en';
i18n.locale = 'en';

export default i18n;
