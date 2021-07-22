import request from "@/utils/request";

// 获取课时
export const getSectionAndLesson = (courseId: string | number) => {
    return request({
        method: 'get',
        url: '/boss/course/section/getSectionAndLesson',
        params: {
            courseId
        }
    })
}

// 保存更新章节内容
export const saveOrUpdateSection = (data: any) => {
    return request({
        method: 'post',
        url: '/boss/course/section/saveOrUpdateSection',
        data
    })
}
// 保存更新课时
export const saveOrUpdateLession = (data: any) => {
    return request({
        method: 'post',
        url: '/boss/course/lesson/saveOrUpdate',
        data
    })
}
