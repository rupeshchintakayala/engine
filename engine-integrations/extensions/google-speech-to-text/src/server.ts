/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import GoogleSpeechToTextExtensionClass from './index';

runGateway(GoogleSpeechToTextExtensionClass, 8000, {
  graphiql: true,
});
