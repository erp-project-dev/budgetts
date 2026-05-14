/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

export interface InjectableMetadata {
  _REGISTRATION_ID: string;
}

export function hasInjectableRegistrationId(
  obj: any,
): obj is InjectableMetadata {
  return obj && "_REGISTRATION_ID" in obj;
}

export function Injectable(registrationId: string) {
  return function (constructor: Function) {
    constructor.prototype._REGISTRATION_ID = registrationId;
  };
}
