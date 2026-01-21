import ApiService from './ApiService'

export type PrivacyPolicy = {
    id: string
    title: string
    type: string
    content: string
    effectiveDate: string
}

export async function apiGetPrivacyPolicies() {
    return ApiService.fetchDataWithAxios<PrivacyPolicy[]>({
        url: '/privacy-policy/list',
        method: 'get',
    })
}

export async function apiCreatePrivacyPolicy(data: Omit<PrivacyPolicy, 'id' | 'updatedAt'>) {
    return ApiService.fetchDataWithAxios<PrivacyPolicy>({
        url: '/privacy-policy/create',
        method: 'post',
        data,
    })
}

export async function apiUpdatePrivacyPolicy(data: Partial<PrivacyPolicy>) {
    return ApiService.fetchDataWithAxios<PrivacyPolicy>({
        url: '/privacy-policy/update',
        method: 'put',
        data,
    })
}

export async function apiDeletePrivacyPolicy(id: string) {
    return ApiService.fetchDataWithAxios<boolean>({
        url: '/privacy-policy/delete',
        method: 'delete',
        params: { id },
    })
}
