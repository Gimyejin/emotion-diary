const MyButton = ({ text, type, onClick }) => {
    //type유형이 기재된 것 외가 들어오면 default로 강제한다
    const btnType = ['positive', 'negative'].includes(type) ? type : 'default';
    return (
        <button className={["MyButton", `MyButton_${btnType}`].join(" ")}
            onClick={onClick}>{text}</button>
    )
}

MyButton.defaultProps = {
    type: "dafault",
}
export default MyButton;