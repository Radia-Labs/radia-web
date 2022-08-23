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
        <PaginateBackWrapper page={page} onClick={page !== -1 ? onBack : null}>
            {loadingBack ? <Spinner/> : <PaginateBackBtn /> }
        </PaginateBackWrapper>
        <PaginateNextWrapper page={page} lastEvaluatedKey={lastEvaluatedKey} onClick={lastEvaluatedKey ? onNext : null}>
            {loadingNext ? <Spinner/> : <PaginateNextBtn /> }
        </PaginateNextWrapper>
    </Flex>
)


export default Pagination;