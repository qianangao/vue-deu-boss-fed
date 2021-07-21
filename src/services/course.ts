import request from "@/utils/request"

// 分页查询课程信息
export const getCourseList = (data: any) => {
    return request({
        method: 'post',
        url: '/boss/course/getQueryCourses',
        data
    })
}
// 课程上下架
export const changeState = (params: any) => {
    return request({
        method: 'get',
        url: '/boss/course/changeState',
        params
    })
}
// 保存或更新课程信息
export const saveOrUpdateCourse = (data: any) => {
    return request({
        method: 'post',
        url: '/boss/course/saveOrUpdateCourse',
        data
    })
}
// 上传图片
export const uploadImg = (data: any, onUploadProgress: (progressEvent: any) => void) => {
    return request({
        method: 'post',
        url: '/boss/course/upload',
        data,
        onUploadProgress
    })
}
