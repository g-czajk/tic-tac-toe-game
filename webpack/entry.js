/**
 * Created by: Andrey Polyakov (andrey@polyakov.im)
 */
import {join} from 'path';

import {rootDir} from './utils/env';

export default {
    main: [
        join(rootDir, '/src/index.ts'),
        join(__dirname, './utils/cleanConsoleOnHMR.js'),
    ],
};
