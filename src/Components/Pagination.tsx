
type Props = {
    onBack: () => void;
    onNext: () => void;
    page: number;
}
const Pagination = ({ onNext, onBack, page }: Props) => (
    <div>
        <button disabled={page===0} onClick={onBack}>
            BACK
        </button>
        <button onClick={onNext}>
            NEXT
        </button>
    </div>
)


export default Pagination;