import requestUtil from '@/utils/request-util'

export const findAll = () => {
  return requestUtil({
    url: '/admin/hosp/hospitalSet/findAll',
    method: 'get'
  })
}

export const getList = (now, size, data) => {
  return requestUtil({
    url: `/admin/hosp/hospitalSet/findPageHospSet/${now}/${size}`,
    method: 'post',
    data
  })
}

export const deleteHospital = id => {
  return requestUtil({
    url: `/admin/hosp/hospitalSet/${id}`,
    method: 'delete'
  })
}

export const deleteBatch = data => {
  return requestUtil({
    url: '/admin/hosp/hospitalSet/batchRemove',
    method: 'delete',
    data: data
  })
}

export const lockOrUnlock = (id, status) => {
  return requestUtil({
    url: `/admin/hosp/hospitalSet/lockHospital/${id}/${status}`,
    method: 'put'
  })
}

export const addHospital = data => {
  return requestUtil({
    url: '/admin/hosp/hospitalSet/saveHospitalSet',
    method: 'post',
    data
  })
}

export const updateHospital = data => {
  return requestUtil({
    url: '/admin/hosp/hospitalSet/updateHospitalSet',
    method: 'post',
    data
  })
}

export const getHospital = id => {
  return requestUtil({
    url: `/admin/hosp/hospitalSet/getHospSet/${id}`,
    method: 'get'
  })
}
