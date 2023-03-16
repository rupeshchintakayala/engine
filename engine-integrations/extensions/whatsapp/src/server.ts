/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import WhatsappExtensionClass from './index';

runGateway(WhatsappExtensionClass, 8000, {
  graphiql: true,
});
