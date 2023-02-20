import requestUtil from '@/utils/request-util'
export let getDictById = id => {
    return requestUtil({
        // url: `/dict/admin/cmn/dict/findChildData/${id}`,
        url: `/admin/cmn/dict/findChildData/${id}`,
        method: 'get'
    })
}
