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
