export const baseUrl = defineUrl();

function defineUrl() {
    if(window.location.hostname == 'minhaurl.com') { // PRODUÇÃO
        return 'http://url-prod/api';
    }
    return 'http://url-hml/api'; // HOMOLOGAÇÃO OU LOCALHOST
}
