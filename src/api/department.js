import requestUtil from '@/utils/request-util'

export let getAllDepartment = (hoscode) => {
    return requestUtil({
        url: `/hospital/admin/host/department/getdeptList/${hoscode}`,
        method: 'get'
    })
}
