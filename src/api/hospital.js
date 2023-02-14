import requestUtil from '@/utils/request-util'

export let getAllHospital = (page, size) => {
    return requestUtil({
        url: `/hospital/admin/hosp/hospital/list/${page}/${size}`,
        method: 'get'
    })
}
export let changeHospitalStatus = (id, status) => {
    return requestUtil({
        url: `/hospital/admin/hosp/hospital/status/${id}/${status}`,
        method: 'get'
    })
}
export let getHospital = (id) => {
    return requestUtil({
        url: `/hospital/admin/hosp/hospital/${id}`,
        method: 'get'
    })
}
