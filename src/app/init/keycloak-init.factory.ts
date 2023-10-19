import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(
  keycloak: KeycloakService
) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8081' + '/',
        realm: 'baloise-code-camp',
        clientId: 'frontend-client',
      },
      initOptions: {
        checkLoginIframe: false
      }
    });
}
