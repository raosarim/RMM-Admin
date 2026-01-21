import ApiService from './ApiService'

export type Template = {
    id: string
    name: string
    landingModeId: string
    thumbnailURL: string
}

export async function apiGetTemplates() {
    return ApiService.fetchDataWithAxios<Template[]>({
        url: '/template/list',
        method: 'get',
    })
}

export async function apiCreateTemplate(data: Omit<Template, 'id'>) {
    return ApiService.fetchDataWithAxios<Template>({
        url: '/template/create',
        method: 'post',
        data,
    })
}

export async function apiUpdateTemplate(data: Partial<Template>) {
    return ApiService.fetchDataWithAxios<Template>({
        url: '/template/update',
        method: 'put',
        data,
    })
}

export async function apiDeleteTemplate(id: string) {
    return ApiService.fetchDataWithAxios<boolean>({
        url: '/template/delete',
        method: 'delete',
        params: { id },
    })
}
