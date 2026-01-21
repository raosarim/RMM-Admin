import { mock } from '../MockAdapter'
import { FaqCategory, Faq } from '@/services/FaqService'

let faqCategoryList: FaqCategory[] = [
    {
        id: 'c693535c-24f0-4174-8e8a-6cd09336de2b',
        title: 'Creating and managing a memorial',
        iconURL: 'https://res.cloudinary.com/dwlj6ssuw/image/upload/v1768482122/vggfdg4lkgh16unjqfbu.png',
    },
]

let faqList: Faq[] = [
    {
        id: '1',
        question: 'How do I update my profile information?',
        answer: 'On general setting you profile will be open and you can update',
        categoryId: 'c693535c-24f0-4174-8e8a-6cd09336de2b',
    },
]

// FAQ Category Mock Endpoints
mock.onGet(`/api/faq-category/list`).reply(() => {
    return [200, faqCategoryList]
})

mock.onPost(`/api/faq-category/create`).reply((config) => {
    const data = JSON.parse(config.data || '{}')
    const newData: FaqCategory = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
    }
    faqCategoryList.unshift(newData)
    return [200, newData]
})

mock.onPut(`/api/faq-category/update`).reply((config) => {
    const data = JSON.parse(config.data || '{}')
    faqCategoryList = faqCategoryList.map((item) =>
        item.id === data.id ? { ...item, ...data } : item,
    )
    return [200, data]
})

mock.onDelete(`/api/faq-category/delete`).reply((config) => {
    const id = config.params.id
    faqCategoryList = faqCategoryList.filter((item) => item.id !== id)
    return [200, true]
})

// FAQ Mock Endpoints
mock.onGet(`/api/faq/list`).reply(() => {
    return [200, faqList]
})

mock.onPost(`/api/faq/create`).reply((config) => {
    const data = JSON.parse(config.data || '{}')
    const newData: Faq = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
    }
    faqList.unshift(newData)
    return [200, newData]
})

mock.onPut(`/api/faq/update`).reply((config) => {
    const data = JSON.parse(config.data || '{}')
    faqList = faqList.map((item) =>
        item.id === data.id ? { ...item, ...data } : item,
    )
    return [200, data]
})

mock.onDelete(`/api/faq/delete`).reply((config) => {
    const id = config.params.id
    faqList = faqList.filter((item) => item.id !== id)
    return [200, true]
})
