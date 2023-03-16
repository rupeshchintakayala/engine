/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import BitbucketExtensionClass from './index';

runGateway(BitbucketExtensionClass, 8000, {
  graphiql: true,
});
