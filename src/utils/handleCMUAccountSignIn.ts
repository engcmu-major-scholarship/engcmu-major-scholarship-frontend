import { Path } from '../constants/Path';

export function createCMUAccountSignInUrl() {
  const paramsBuilder = new URLSearchParams();
  paramsBuilder.append('client_id', import.meta.env.VITE_CMU_ENTRA_CLIENT_ID);
  paramsBuilder.append('scope', 'api://cmu/.default');
  paramsBuilder.append('response_type', 'code');
  paramsBuilder.append('redirect_uri', window.location.origin + Path.CALLBACK);
  paramsBuilder.append('response_mode', 'query');

  return (
    `https://login.microsoftonline.com/${import.meta.env.VITE_CMU_MS_TENANT_ID}/oauth2/v2.0/authorize?` +
    paramsBuilder.toString()
  );
}

export function handleCMUAccountSignIn() {
  window.location.replace(createCMUAccountSignInUrl());
}
