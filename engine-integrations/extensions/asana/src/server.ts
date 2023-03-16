/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import AsanaExtensionClass from './index';

runGateway(AsanaExtensionClass, 8000, {
  graphiql: true,
});
