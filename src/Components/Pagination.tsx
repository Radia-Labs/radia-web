import { Flex } from '../styles'
import { PaginateNextBtn, PaginateBackBtn, PaginateBackWrapper, PaginateNextWrapper, Spinner } from './styles'
type Props = {
    loadingBack: boolean,
    loadingNext: boolean,
    onBack: () => void;
    onNext: () => void;
    page: number;
    lastEvaluatedKey: object | undefined;
}
const Pagination = ({ loadingBack, loadingNext, onNext, onBack, page, lastEvaluatedKey }: Props) => (
    <Flex>
        <PaginateBackWrapper page={page} >
            {loadingBack ? <Spinner/> : <PaginateBackBtn onClick={page !== -1 ? onBack : null}/> }
        </PaginateBackWrapper>
        <PaginateNextWrapper page={page} lastEvaluatedKey={lastEvaluatedKey}>
            {loadingNext ? <Spinner/> : <PaginateNextBtn onClick={lastEvaluatedKey ? onNext : null}/> }
        </PaginateNextWrapper>
    </Flex>
)


export default Pagination;