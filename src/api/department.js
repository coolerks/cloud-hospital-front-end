import requestUtil from '@/utils/request-util'

export let getAllDepartment = (hoscode) => {
    return requestUtil({
        // url: `/hospital/admin/host/department/getdeptList/${hoscode}`,
        url: `/admin/host/department/getdeptList/${hoscode}`,
        method: 'get'
    })
}

export let getSchedule = (hoscode, depcode, page, limit) => {
    return requestUtil({
        // url: `/hospital/admin/host/department/getschedule/${hoscode}/${depcode}/${page}/${limit}`,
        url: `/admin/host/department/getschedule/${hoscode}/${depcode}/${page}/${limit}`,
        method: 'get'
    })
}

export let getScheduleByDate = (hoscode, depcode, date) => {
    return requestUtil({
        // url: `/hospital/admin/host/department/getschedule/${hoscode}/${depcode}/${date}`,
        url: `/admin/host/department/getschedule/${hoscode}/${depcode}/${date}`,
        method: 'get'
    })
}
