import requestUtil from '@/utils/request-util'

export let getAllHospital = (page, size) => {
    return requestUtil({
        url: `/hospital/admin/hosp/hospital/list/${page}/${size}`,
        method: 'get'
    })
}
