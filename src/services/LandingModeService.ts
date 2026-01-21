import ApiService from './ApiService'

export type LandingMode = {
    id: string
    title: string
    description: string
    landingModeType: 'full-mode' | 'event-mode' | 'video-only-mode'
    iconURL: string
    isActive: boolean
}

export async function apiGetLandingModes() {
    return ApiService.fetchDataWithAxios<LandingMode[]>({
        url: '/landing-mode/list',
        method: 'get',
    })
}

export async function apiCreateLandingMode(data: Omit<LandingMode, 'id'>) {
    return ApiService.fetchDataWithAxios<LandingMode>({
        url: '/landing-mode/create',
        method: 'post',
        data,
    })
}

export async function apiUpdateLandingMode(data: Partial<LandingMode>) {
    return ApiService.fetchDataWithAxios<LandingMode>({
        url: '/landing-mode/update',
        method: 'put',
        data,
    })
}

export async function apiDeleteLandingMode(id: string) {
    return ApiService.fetchDataWithAxios<boolean>({
        url: '/landing-mode/delete',
        method: 'delete',
        params: { id },
    })
}
