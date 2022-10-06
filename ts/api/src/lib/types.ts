import { ApiController } from './controllers/api.controller';
import { ActionDescriptor } from './descriptors';

export type HttMethod = 'put'|'post'|'get'|'patch'|'delete';

export type ActionDescriptionFunction = (controller: ApiController, action: ActionDescriptor) => string
export type ActionDescription = string|ActionDescriptionFunction

export type RespondDescriptionFunction = (controller: ApiController, action: ActionDescriptor) => string
export type RespondDescription = string|RespondDescriptionFunction
