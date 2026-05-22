    import { API_ENDPOINTS, STORAGE_KEYS } from '../constants/app-config';
    import { fallbackLicoes } from '../mocks/fallback-data';
    import createCrudService from './create-crud-service';

    const licoesCrudService = createCrudService({
    baseUrl: API_ENDPOINTS.licoes,
    storageKey: STORAGE_KEYS.licoesStore,
    seedData: fallbackLicoes,
    });

    const LicoesService = {
    getLicoes: licoesCrudService.list,
    getLicaoById: licoesCrudService.getById,
    postLicao: licoesCrudService.create,
    putLicao: licoesCrudService.update,
    deleteLicaoById: licoesCrudService.remove,
    };

    export default LicoesService;
