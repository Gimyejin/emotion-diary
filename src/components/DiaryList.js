import { useState } from "react"


const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된순" },
]
const ControlMenu = ({ value, onChange, optionList }) => {//onChagne는 setSortType임
    console.log(value)
    return <select value={value} onChange={(e) => onChange(e.target.value)}>
        {optionList.map((it, idx) =>
            <option key={idx} value={it.value}>{it.name}</option>
        )}
    </select>
}

const DiaryList = ({ diaryList }) => {
    //정렬기준
    const [sortType, setSortType] = useState('latest');

    const getProcessDiaryList = () => {
        const compare = (a, b) => {
            if (sortType === 'latest') {
                return parseInt(b.date) - parseInt(a.date);
            }
            else {
                return parseInt(a.date) - parseInt(b.date);
            }
        }
        //JSON.stringify() : 배열을 JSON화 시켜서 문자열로 바꿈
        //JSON.parse() : 문자열에서 다시 배열로 복구
        const copyList = JSON.parse(JSON.stringify(diaryList));

        const sortedList = copyList.sort(compare);
        return sortedList;
    }

    return <div>
        <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
        {getProcessDiaryList().map((it) => (
            <div key={it.id}>{it.content}</div>
        ))}
    </div>
}


DiaryList.defaultProps = {
    diaryList: []
}
export default DiaryList;