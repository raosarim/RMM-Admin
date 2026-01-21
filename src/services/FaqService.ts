import ApiService from './ApiService'

export type FaqCategory = {
    id: string
    title: string
    iconURL: string
}

export type Faq = {
    id: string
    question: string
    answer: string
    categoryId: string
}

// FAQ Category API
export async function apiGetFaqCategories() {
    return ApiService.fetchDataWithAxios<FaqCategory[]>({
        url: '/faq-category/list',
        method: 'get',
    })
}

export async function apiCreateFaqCategory(data: Omit<FaqCategory, 'id'>) {
    return ApiService.fetchDataWithAxios<FaqCategory>({
        url: '/faq-category/create',
        method: 'post',
        data,
    })
}

export async function apiUpdateFaqCategory(data: Partial<FaqCategory>) {
    return ApiService.fetchDataWithAxios<FaqCategory>({
        url: '/faq-category/update',
        method: 'put',
        data,
    })
}

export async function apiDeleteFaqCategory(id: string) {
    return ApiService.fetchDataWithAxios<boolean>({
        url: '/faq-category/delete',
        method: 'delete',
        params: { id },
    })
}

// FAQ API
export async function apiGetFaqs() {
    return ApiService.fetchDataWithAxios<Faq[]>({
        url: '/faq/list',
        method: 'get',
    })
}

export async function apiCreateFaq(data: Omit<Faq, 'id'>) {
    return ApiService.fetchDataWithAxios<Faq>({
        url: '/faq/create',
        method: 'post',
        data,
    })
}

export async function apiUpdateFaq(data: Partial<Faq>) {
    return ApiService.fetchDataWithAxios<Faq>({
        url: '/faq/update',
        method: 'put',
        data,
    })
}

export async function apiDeleteFaq(id: string) {
    return ApiService.fetchDataWithAxios<boolean>({
        url: '/faq/delete',
        method: 'delete',
        params: { id },
    })
}
