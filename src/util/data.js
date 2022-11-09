//중복된 함수들의 모음
export const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
}